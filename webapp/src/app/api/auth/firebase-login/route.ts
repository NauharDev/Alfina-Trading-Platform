import { NextResponse } from 'next/server';
import { admin } from '@/app/api/firebaseAdmin/adminSDK'; // Firebase Admin SDK
import {JWTPayload} from 'jose';
import { createEncryptedSessionJWT } from '@/app/api/auth/firebase-login/jwt_encrypt';

export async function POST(req: Request){
    const {idToken} = await req.json(); // Get firebase ID from frontend

    if (!idToken){
        return NextResponse.json({error: "Missing token"}, {status: 400});
    }

    try {

        // Verify the Firebase ID token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            throw new Error ('NEXTAUTH_SECRET is not defined');
        }

        // If firebase token is valid, create JWT for nextauth handling
        const userPayload: JWTPayload = {
            sub: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || '',
            // Custom field to identify firebase-sourced jwt cokie
            authType: 'firebase',
        };


        // Manually create JWT token for session 
        const sessionJWT = await createEncryptedSessionJWT(userPayload, secret);

        const response = NextResponse.json({message: "Session cookie is set."});

        // Set JWT as a secure, HTTP-only cookie
        response.cookies.set({
            name: 'next-auth.session-token',
            value: sessionJWT,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 60 * 60 * 24 * 5,
            sameSite: 'lax',
            path: '/'
        });
        

        return response
    } catch (error) {
        console.error("Error setting session cookie", error);
        return NextResponse.json({error: "Failed to verify ID token"}, {status: 401});
    }
}