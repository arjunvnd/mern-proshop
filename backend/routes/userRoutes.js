import express from "express";

import {
  authUser,
  deleteUsers,
  getUserById,
  getUserProfile,
  getUsers,
  logOutUser,
  registerUser,
  updateUserById,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getUsers).post(registerUser);
router.post("/logout", logOutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUsers)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserById);

export default router;
