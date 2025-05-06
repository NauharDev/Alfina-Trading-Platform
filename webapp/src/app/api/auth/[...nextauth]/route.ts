import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { jwtDecrypt, EncryptJWT, base64url, JWTPayload} from 'jose';


const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
    throw new Error ('NEXTAUTH_SECRET is not defined');
}
const key = base64url.decode(secret); // converts secret key into ray bytes for use in encrypt/decrypt by jose

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
            scope: 'openid profile email', // Request ID token, email, and profile info
            prompt: 'consent',
            response_type: 'code',
        },
        }
            
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        authorization: {
            params: {
            prompt: 'consent',
            response_type: 'code',
        },
        }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt"
},
  jwt: {
    maxAge: 60 * 60 * 24 * 5,
    // Override encode/decode to handle JWEs
    encode : async ({token}) => {
      if (!token) return "";

      const now = Math.floor(Date.now() / 1000);
      const typedToken = token as JWTPayload;

      return await new EncryptJWT(token as any)
      .setProtectedHeader({alg: "dir", enc: "A256GCM"})
      // Only update issue time if null
      .setIssuedAt(typedToken.iat ?? now)
      // Only update exp time  if null/unset
      .setExpirationTime(typedToken.exp ?? now + 60 * 60 * 24 * 5)
      .encrypt(key);
    },
    decode: async ({token}) => {
      if (!token) return null;
      try {
        const {payload} = await jwtDecrypt(token, key);
        return payload;
      } catch (err) {
        console.error("NextAuth JWT decode failed:", err);
        return null;
      }
    },
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard"; // Redirect users to dashboard after login
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        sameSite: "lax",
        path: "/",
      },
    },
  },

  debug: true, // Enable logs to debug authentication
});


export { handler as GET, handler as POST }