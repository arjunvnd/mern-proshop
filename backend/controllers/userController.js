import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

/**
 * @description Auth user and get token
 * @access Public
 * @route GET /api/user/login
 */
export const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

/**
 * @description Register user
 * @access Public
 * @route POST /api/users
 */
export const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

/**
 * @description Logout the user and clear cookie
 * @access Private
 * @route POST /api/users/logout
 */
export const logOutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

/**
 * @description Get user profile
 * @access Private
 * @route GET /api/users/profile
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

/**
 * @description Update user profile
 * @access Private
 * @route PUT /api/users/profile
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("UPdate user profile");
});

/**
 * @description Get users profile
 * @access Private/Admin
 * @route GET /api/users
 */
export const getUsers = asyncHandler(async (req, res) => {
  res.send("Gets user profile");
});

/**
 * @description Get users profile by id
 * @access Private/Admin
 * @route GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  res.send("Gets user by id");
});

/**
 * @description Delete users profile
 * @access Private/Admin
 * @route DELETE /api/users/:id
 */
export const deleteUsers = asyncHandler(async (req, res) => {
  res.send("delete user profile");
});

/**
 * @description Update users profile
 * @access Private/Admin
 * @route PUT /api/users/:id
 */
export const updateUserById = asyncHandler(async (req, res) => {
  res.send("Update user profile by id");
});
