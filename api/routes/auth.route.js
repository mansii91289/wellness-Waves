
import express from "express";
import { signup, verifyOTP, setPassword, signin, bookSession, bookLive, sendOtpForReset, resetPassword, verifyOtp, fetchEmployeeProfile,updateCredits   } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyemployee.js";

const router = express.Router();

// Public routes
router.post("/sign-up", signup);
router.post("/verify-otp", verifyOTP);
router.post("/set-password", setPassword);
router.post("/sign-in", signin);
router.post("/send-otp-reset", sendOtpForReset);
router.post("/verify-otp-reset", verifyOtp);
router.post("/reset-password", resetPassword);

// Protected routes - require authentication
router.use(verifyToken);
router.post("/book-session", bookSession);
router.post("/book-live", bookLive);
router.get("/profile", fetchEmployeeProfile);
router.post("/update-credits", updateCredits);

export default router;
