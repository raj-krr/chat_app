import express from "express";
import { forgetPassword, login, logout, register, resendVerificationCode, updatePassword, verifyEmail, checkAuth } from "../controllers/user/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register",register);
router.post("/verifyEmail", verifyEmail);
router.post("/login", login);
router.post("/resendverificationcode", resendVerificationCode);
router.post("/forgetPassword", forgetPassword);
router.post("/updatepassword", updatePassword);
router.post("/logout", authMiddleware, logout);
router.get("/check", authMiddleware, checkAuth);
export default router;
