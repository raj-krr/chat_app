import express from "express";
import { forgetPassword, login, logout, register, resendVerificationCode, updatePassword, verifyEmail, checkAuth, refreshAccessToken } from "../controllers/user/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register",register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login);
router.post("/resendverificationcode", resendVerificationCode);
router.post("/forgotPassword", forgetPassword);
router.post("/updatepassword", updatePassword);
router.post("/logout", authMiddleware, logout);
router.get("/check", authMiddleware, checkAuth);
router.post("/refresh", refreshAccessToken);

export default router;
