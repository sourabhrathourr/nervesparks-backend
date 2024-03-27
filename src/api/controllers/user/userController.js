import { getDatabase } from "../../../config/database.js";
import { ObjectId } from "mongodb";

const db = getDatabase();

export const viewDealershipsWithCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const carsCollection = db.collection("cars");
    const dealershipsCollection = db.collection("dealerships");

    const car = await carsCollection.findOne({ _id: new ObjectId(carId) });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    const dealerships = await dealershipsCollection
      .find({ "cars._id": new ObjectId(carId) })
      .toArray();

    res.status(200).json(dealerships);
  } catch (err) {
    console.error("Error viewing dealerships with car:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const viewOwnedVehicles = async (req, res) => {
  try {
    const userId = req.user.userId;

    const usersCollection = db.collection("users");
    const dealershipsCollection = db.collection("dealerships");

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const ownedVehicles = await Promise.all(
      user.vehicle_info.map(async (vehicleId) => {
        const vehicle = await carsCollection.findOne({
          _id: new ObjectId(vehicleId),
        });
        const dealership = await dealershipsCollection.findOne({
          "cars._id": new ObjectId(vehicleId),
        });

        return {
          ...vehicle,
          dealership: {
            _id: dealership._id,
            name: dealership.dealership_name,
            location: dealership.dealership_location,
          },
        };
      }),
    );

    res.status(200).json(ownedVehicles);
  } catch (err) {
    console.error("Error viewing owned vehicles:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const viewDealsOnCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const dealsCollection = db.collection("deals");

    const deals = await dealsCollection
      .find({ carId: new ObjectId(carId) })
      .toArray();

    res.status(200).json(deals);
  } catch (err) {
    console.error("Error viewing deals on car:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
