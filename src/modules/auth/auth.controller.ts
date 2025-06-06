import { Request, Response } from "express";
import { IUser } from "../user/user.schema";
import UserService from "../user/user.service";
import { JWTService, JWTPayload } from "@/utils/JWT";
import { LoggerService } from "@/utils/Logger";

/**
 * AuthController handles user authentication endpoints such as signup, login, and token refresh.
 */
export class AuthController {
  private readonly jwtService = new JWTService();
  private readonly logger = new LoggerService("AuthController");

  constructor(private readonly userService: UserService) {}

  /**
   * @route POST /auth/signup
   * @desc Registers a new user
   * @access Public
   */
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as IUser;
      this.logger.info(`Signup attempt for: ${user.email}`);

      const createdUser = await this.userService.createUser(user);

      this.logger.info(`User registered: ${createdUser.email}`);
      res.status(201).json(createdUser);
    } catch (err) {
      const message = (err as Error).message;
      this.logger.error(`Signup failed: ${message}`);
      res.status(500).json({ message: "Signup failed", error: message });
    }
  }

  /**
   * @route POST /auth/login
   * @desc Authenticates user and returns JWT tokens
   * @access Public
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      this.logger.info(`Login attempt for: ${email}`);

      const isValid = await this.userService.validateUser(email, password);
      if (!isValid) {
        this.logger.warn(`Invalid credentials for: ${email}`);
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const user = await this.userService.findByEmail(email);
      if (!user) {
        this.logger.warn(`User not found: ${email}`);
        res.status(404).json({ message: "User not found" });
        return; 
      }

      const payload: JWTPayload = {
        user: user.id,
        email: user.email,
        role: user.role,
        ...(user.organization && { organization: user.organization }),
      };

      const accessToken = this.jwtService.generateToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);

      // Set refresh token in HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      this.logger.info(`Login successful: ${email}`);
      res.status(200).json({ accessToken });
    } catch (err) {
      const message = (err as Error).message;
      this.logger.error(`Login failed: ${message}`);
      res.status(500).json({ message: "Login failed", error: message });
    }
  }

  /**
   * @route POST /auth/refresh-token
   * @desc Issues new access token using a valid refresh token
   * @access Public (requires valid refreshToken cookie)
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken;
      if (!token) {
        this.logger.warn("No refresh token provided");
        res.status(401).json({ message: "No refresh token provided" });
        return; 
      }

      const payload = this.jwtService.decodeRefreshToken(token);
      if (!payload) {
        this.logger.warn("Invalid or expired refresh token");
        res.status(403).json({ message: "Invalid or expired refresh token" });
        return; 
      }

      const newAccessToken = this.jwtService.generateToken(payload);
      this.logger.info(`Access token refreshed for: ${payload.email}`);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      const message = (err as Error).message;
      this.logger.error(`Token refresh failed: ${message}`);
      res.status(500).json({ message: "Token refresh failed", error: message });
    }
  }
}
