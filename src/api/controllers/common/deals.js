import { getDatabase } from "../../../config/database.js";
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

export const viewDealsFromDealership = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    // 1. Find the dealership
    const dealershipsCollection = db.collection("dealerships");
    const dealership = await dealershipsCollection.findOne({
      _id: new ObjectId(dealershipId),
    });

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    // 2. Get all deals from the dealership
    const dealsCollection = db.collection("deals");
    const deals = await dealsCollection
      .find({ sellerId: new ObjectId(dealershipId) })
      .toArray();

    // 3. Populate deal information with user and car details
    const populatedDeals = await Promise.all(
      deals.map(async (deal) => {
        const user = await db.collection("users").findOne({
          _id: new ObjectId(deal.buyerId),
        });

        const car = await db.collection("cars").findOne({
          _id: new ObjectId(deal.carId),
        });

        return {
          ...deal,
          user: {
            _id: user._id,
            name: user.name,
            email: user.user_email,
          },
          car: {
            _id: car._id,
            make: car.make,
            model: car.model,
            year: car.year,
          },
        };
      }),
    );

    res.status(200).json(populatedDeals);
  } catch (err) {
    console.error("Error viewing deals from dealership:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
