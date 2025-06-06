import * as jwt from "jsonwebtoken";

type JWtExpiryType = "1h" | "15m" | "30m" | "1d" | "7d";
const JWT_SECRET = (process.env.JWT_SECRET as string) || "your-secret-key";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN as JWtExpiryType) || "7d"; // or '1h', '30m', etc.
const REFRESH_EXPIRES_IN = (process.env.REFRESH_EXPIRES_IN as JWtExpiryType) || "7d";
const REFRESH_TOKEN_SECRET = (process.env.REFRESH_TOKEN_SECRET as string) || "your-refresh-token-secret";
export interface JWTPayload {
  user: string;
  email: string;
  role: number;
  organization?: string;
}

export class JWTService {
  generateToken(user: JWTPayload): string {
    const payload = {
      user: user.user,
      email: user.email,
      role: user.role,
      organization: user.organization
    };
    const JWTOptions: jwt.SignOptions = {
      expiresIn: JWT_EXPIRES_IN
    };
    return jwt.sign(payload, JWT_SECRET, JWTOptions);
  }

  generateRefreshToken(payload: JWTPayload): string {
    const options: jwt.SignOptions = { expiresIn: REFRESH_EXPIRES_IN };
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
  }

  decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (err: any) {
      console.error("Invalid token:", err.message);
      return null;
    }
  }

  decodeRefreshToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
    } catch (err) {
      return null;
    }
  }
}
