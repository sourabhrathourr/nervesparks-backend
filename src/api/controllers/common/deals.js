import { getDatabase } from "../../../config/database";
import { ObjectId } from "mongodb";

const db = getDatabase();

export const addVehicleAfterDeal = async (req, res) => {
  try {
    const { dealId } = req.params;

    // 1. Find the deal
    const dealsCollection = db.collection("deals");
    const deal = await dealsCollection.findOne({ _id: new ObjectId(dealId) });

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    const { carId, buyerId, sellerId } = deal;

    // 2. Add the car to the user's owned vehicles
    const usersCollection = db.collection("users");
    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(buyerId) },
      { $push: { vehicle_info: carId } },
      { returnDocument: "after" },
    );

    if (!updatedUser.value) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Add the car to the dealership's sold vehicles
    const dealershipsCollection = db.collection("dealerships");
    const updatedDealership = await dealershipsCollection.findOneAndUpdate(
      { _id: new ObjectId(sellerId) },
      { $push: { sold_vehicles: carId } },
      { returnDocument: "after" },
    );

    if (!updatedDealership.value) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    res.status(200).json({ message: "Vehicle added to user and dealership" });
  } catch (err) {
    console.error("Error adding vehicle after deal:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
