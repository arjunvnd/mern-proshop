import { asyncHandler } from "../middleware/asyncHandler";
import Product from "../models/productModel";

export const getProducts = asyncHandler(async (res, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (res, res) => {
  const products = await Product.findById(req.params.id);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
