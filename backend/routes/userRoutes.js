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

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);
router.post("/logout", logOutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUsers).get(getUserById).put(updateUserById);

export default router;
