import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
