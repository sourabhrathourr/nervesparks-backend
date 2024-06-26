import express from "express";
import {
  viewAllCars,
  viewCarsInDealership,
} from "../controllers/common/viewCars.js";
import {
  addVehicleAfterDeal,
  viewDealsFromDealership,
} from "../controllers/common/deals.js";
const router = express.Router();

router.get("/cars", viewAllCars);
router.get("/dealerships/:dealershipId/cars", viewCarsInDealership);
router.post("/deals/:dealId/add-vehicle", addVehicleAfterDeal);
router.get("/dealerships/:dealershipId/deals", viewDealsFromDealership);

export default router;
