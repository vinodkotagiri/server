import { Router } from "express";
import { AuthController } from "./auth.controller";
import UserService from "../user/user.service";
import { User } from "../user/user.schema";

const router = Router();

const userService = new UserService(User);
const authController = new AuthController(userService);

router.post("/signup", authController.signup.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
export default router;
