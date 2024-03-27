import { getDatabase } from "../../../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const db = getDatabase();
    const usersCollection = db.collection("users");
    const dealershipCollection = db.collection("dealerships");

    let dealerExists, userExists;

    if (role === "dealer") {
      dealerExists = await dealershipCollection.findOne({
        dealership_email: email,
      });
    } else {
      userExists = await usersCollection.findOne({ user_email: email });
    }

    // Check if user or dealer already exists
    if (userExists) {
      return res.status(403).json({ message: "User already exists" });
    }

    if (dealerExists) {
      return res.status(403).json({ message: "Dealer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user or dealer based on role
    if (role === user) {
      const userDoc = {
        name: name,
        user_email: email,
        password: hashedPassword,
      };

      await usersCollection.insertOne(userDoc);

      const token = jwt.sign(
        { email: email, role: role },
        process.env.JWT_SECRET,
      );
      res.json({ message: "User registered successfully", token: token });
    }

    if (role === dealer) {
      const dealerDoc = {
        dealership_name: name,
        dealership_email: email,
        password: hashedPassword,
      };
      await dealershipCollection.insertOne(dealerDoc);
      const token = jwt.sign(
        { email: email, role: role },
        process.env.JWT_SECRET,
      );
      res.json({ message: "Dealer registered successfully", token: token });
    }
  } catch (err) {
    console.log(err);
  }
};
