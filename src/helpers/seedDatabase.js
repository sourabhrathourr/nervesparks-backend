import generateFakeData from "./dataGenerator.js";
import { connectToDatabase } from "../config/database.js";

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    await generateFakeData();
    console.log("Fake data generated and inserted successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
