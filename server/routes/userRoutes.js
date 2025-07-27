import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserProfile, // ✅ Correct function name
} from "../controllers/userController.js";

import { searchDonors } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 Protected Routes
router.get("/profile", protect, getUserProfile); // Get own user profile

// 🔐 Admin-Only Route
router.get("/", protect, adminOnly, getAllUsers); // Admin can fetch all users

router.get('/search', protect, searchDonors);

export default router;
