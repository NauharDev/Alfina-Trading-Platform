import { NextResponse } from "next/server";
import { jwtDecrypt, base64url } from "jose";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const rawToken = req.cookies.get("next-auth.session-token")?.value;
  const secret = process.env.NEXTAUTH_SECRET!;
  let session = null;

  // For Oauth token, use NextAuth's built-in decoder via getToken()
  try {
    session = await getToken({ req, secret });
    if (session) {
      console.log("Token decoded successfully via getToken():", session);
    }
  } catch (e) {
    console.log("getToken() call failed.");
  }

  // 2. Fallback to manual decrypt (for Firebase-encrypted JWE)
  if (!session && rawToken) {
    try {
      const key = base64url.decode(secret);
      const { payload } = await jwtDecrypt(rawToken, key);
      session = payload;
      console.log("Custom token decrypted manually", session); // debugging statement to view the encrypted JWE token's payload
    } catch (e) {
      console.error("jwtDecrypt() call failed:", e);
    }
  }

  if (!session) {
    console.log("No valid session found. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Session validated for authenticated user.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/rule-builder/:path*"],
};