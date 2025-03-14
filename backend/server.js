import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/products", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
