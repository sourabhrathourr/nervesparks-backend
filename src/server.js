import express from "express";
import { connectToDatabase } from "./config/database.js";
import userRouter from "./api/routes/user.route.js";
const app = express();
const port = process.env.PORT || 4000;

connectToDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Healthy Server!" });
});

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
