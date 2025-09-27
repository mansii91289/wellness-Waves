
import express from "express";
import { createNotification, getNotifications, markAsRead } from "../controllers/notification.controller.js";
import { verifyToken } from "../utils/verifyemployee.js";

const router = express.Router();

// Remove employeeId from route since we get it from token
router.post("/", verifyToken, createNotification);
router.get("/", verifyToken, getNotifications);
router.put("/read/:id", verifyToken, markAsRead);

export default router;
