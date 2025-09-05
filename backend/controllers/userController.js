import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

/**
 * @description Auth user and get token
 * @access Public
 * @route GET /api/user/login
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @description Register user
 * @access Public
 * @route POST /api/users
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User already exist");
  }
  const savedUser = await User.create({
    name,
    email,
    password,
  });
  if (savedUser) {
    generateToken(res, savedUser._id);

    res.status(201).json({
      name: savedUser.name,
      email: savedUser.email,
      _id: savedUser._id,
      isAdmin: savedUser.isAdmin,
    });
  }
});

/**
 * @description Logout the user and clear cookie
 * @access Private
 * @route POST /api/users/logout
 */
export const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: new Date(0) });
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
