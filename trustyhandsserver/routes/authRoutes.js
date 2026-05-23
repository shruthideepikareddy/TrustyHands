import express from "express";
const router = express.Router();

import { registerUser, loginUser, getUserProfile, updateUserProfile, resetPassword } from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);

export default router;