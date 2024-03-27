import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
router.post("/register", registerUser);
router.post("/login", login);

export default router;
