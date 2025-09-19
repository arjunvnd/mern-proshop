import { asyncHandler } from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @description Create new order
 * @access Private
 * @route POST /api/orders
 */

export const addOrderItems = asyncHandler(async (req, res) => {
  res.send("Add order items");
});

/**
 * @description Get logge
 * @access Private
 * @route POST /api/orders/myorders
 */

export const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get my order");
});

/**
 * @description Get logge
 * @access Private
 * @route POST /api/orders/:id
 */

export const getOrderById = asyncHandler(async (req, res) => {
  res.send("Get order by id");
});

/**
 * @description Update order to paid
 * @access Private
 * @route GET /api/orders/:id/pay
 */

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to paid");
});

/**
 * @description Update order to delivered
 * @access Private/admin
 * @route PUT /api/orders/:id/deliver
 */

export const updateOrderToDeliver = asyncHandler(async (req, res) => {
  res.send("Update order to deliver");
});

/**
 * @description Get all orders
 * @access Private/admin
 * @route PUT /api/orders/:id/deliver
 */

export const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});
