import express from "express";
import {
  addCarToDealership,
  addDealToDealership,
  viewSoldVehicles,
} from "../controllers/dealerships/dealershipController.js";

const router = express.Router();

router.post("/dealerships/:dealershipId/cars", addCarToDealership);
router.post("/dealerships/:dealershipId/deals", addDealToDealership);
router.get("/dealerships/:dealershipId/sold-vehicles", viewSoldVehicles);

export default router;
