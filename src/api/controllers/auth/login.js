import { getDatabase } from "../../../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const db = getDatabase();
    const usersCollection = db.collection("users");
    const dealershipCollection = db.collection("dealerships");

    if (role === client) {
      const user = await usersCollection.findOne({ user_email: email });

      if (!user) {
        return res.status(403).json({ message: "Invalid email or role" });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        const token = jwt.sign(
          { email: email, role: role },
          process.env.JWT_SECRET,
        );
        res.json({ message: "Login successful", token: token });
      } else {
        res.status(403).json({ message: "Invalid password" });
      }
    } else if (role === dealer) {
      const dealer = await dealershipCollection.findOne({
        dealership_email: email,
      });

      if (!dealer) {
        return res.status(403).json({ message: "Invalid email or role" });
      }

      const passwordMatched = await bcrypt.compare(password, dealer.password);

      if (passwordMatched) {
        const token = jwt.sign(
          { email: email, role: role },
          process.env.JWT_SECRET,
        );
        res.json({ message: "Login successful", token: token });
      } else {
        res.status(403).json({ message: "Invalid password" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
