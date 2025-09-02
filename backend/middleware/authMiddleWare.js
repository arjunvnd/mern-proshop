import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
      const userData = await User.findById(decodedValue.userId).select(
        "-password"
      );
      req.user = userData;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

export const isAdmin = (req, res, next) => {
  const userData = req.user;
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised");
  }
};
