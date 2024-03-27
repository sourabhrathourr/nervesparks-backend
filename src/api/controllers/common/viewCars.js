import { getDatabase } from "../../../config/database";
const db = getDatabase();

export const viewAllCars = async (req, res) => {
  const carsCollection = db.collection("cars");
  const cars = await carsCollection.find().toArray();
  res.json(cars);
};

export const viewCarsInDealership = async (req, res) => {
  const carsCollection = db.collection("cars");
  const cars = await carsCollection
    .find({ dealershipId: req.params.dealershipId })
    .toArray();
  res.json(cars);
};
