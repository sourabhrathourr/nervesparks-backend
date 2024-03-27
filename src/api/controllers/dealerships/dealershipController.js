import { getDatabase } from "../../../config/database.js";
import { ObjectId } from "mongodb";

const db = getDatabase();

export const addCarToDealership = async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const { make, model, year, price } = req.body;

    const carsCollection = db.collection("cars");
    const dealershipsCollection = db.collection("dealerships");

    const dealership = await dealershipsCollection.findOne({
      _id: new ObjectId(dealershipId),
    });
    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    const newCar = {
      make,
      model,
      year,
      price,
      dealershipId: new ObjectId(dealershipId),
    };

    const result = await carsCollection.insertOne(newCar);
    const carId = result.insertedId;

    await dealershipsCollection.updateOne(
      { _id: new ObjectId(dealershipId) },
      { $push: { cars: carId } },
    );

    res.status(201).json({ message: "Car added to dealership" });
  } catch (err) {
    console.error("Error adding car to dealership:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const addDealToDealership = async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const { carId, buyerId, price, date } = req.body;

    const dealsCollection = db.collection("deals");
    const dealershipsCollection = db.collection("dealerships");

    const dealership = await dealershipsCollection.findOne({
      _id: new ObjectId(dealershipId),
    });
    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    const newDeal = {
      carId: new ObjectId(carId),
      buyerId: new ObjectId(buyerId),
      sellerId: new ObjectId(dealershipId),
      price,
      date,
    };

    const result = await dealsCollection.insertOne(newDeal);
    const dealId = result.insertedId;

    await dealershipsCollection.updateOne(
      { _id: new ObjectId(dealershipId) },
      { $push: { deals: dealId } },
    );

    res.status(201).json({ message: "Deal added to dealership" });
  } catch (err) {
    console.error("Error adding deal to dealership:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const viewSoldVehicles = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    const dealershipsCollection = db.collection("dealerships");
    const usersCollection = db.collection("users");

    const dealership = await dealershipsCollection.findOne({
      _id: new ObjectId(dealershipId),
    });
    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    const soldVehicles = await Promise.all(
      dealership.sold_vehicles.map(async (vehicleId) => {
        const vehicle = await carsCollection.findOne({
          _id: new ObjectId(vehicleId),
        });
        const deal = await dealsCollection.findOne({
          carId: new ObjectId(vehicleId),
        });
        const user = await usersCollection.findOne({
          _id: new ObjectId(deal.buyerId),
        });

        return {
          ...vehicle,
          owner: {
            _id: user._id,
            name: user.name,
            email: user.user_email,
          },
        };
      }),
    );

    res.status(200).json(soldVehicles);
  } catch (err) {
    console.error("Error viewing sold vehicles:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
