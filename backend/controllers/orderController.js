import { asyncHandler } from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @description Create new order
 * @access Private
 * @route POST /api/orders
 */

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order item");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => {
        return {
          ...item,
          product: item._id,
          _id: undefined,
        };
      }),
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @description Get logge
 * @access Private
 * @route POST /api/orders/myorders
 */

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @description Get logge
 * @access Private
 * @route POST /api/orders/:id
 */

export const getOrderById = asyncHandler(async (req, res) => {
  const orders = await Order.findById({ user: req.params.id }).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
