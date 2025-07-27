import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  searchDonors // ✅ Add this
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.get("/search", searchDonors); // ✅ Add this route

export default router;
