import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import {
  viewDealershipsWithCar,
  viewDealsOnCar,
  viewOwnedVehicles,
} from "../controllers/user/userController.js";

router.post("/register", registerUser);
router.post("/login", login);
router.get("/cars/:carId/dealerships", viewDealershipsWithCar);
router.get("/users/me/vehicles", viewOwnedVehicles);
router.get("/cars/:carId/deals", viewDealsOnCar);

export default router;
