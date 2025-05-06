import { EncryptJWT, JWTPayload, base64url } from "jose";

export async function createEncryptedSessionJWT(payload: JWTPayload, secret: string): Promise<string> {
    const key = base64url.decode(secret); 
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 5; // 5 days
  
    return await new EncryptJWT(payload)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }) // what NextAuth expects
      .setIssuedAt(iat)
      .setExpirationTime(exp)
      .encrypt(key);
  }