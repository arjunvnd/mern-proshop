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
    shippingAddress,
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
      shippingAddress,
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
  try {
    const orders = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
});

/**
 * @description Update order to paid
 * @access Private
 * @route PUT /api/orders/:id/pay
 */

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: "paid",
      update_time: Date.now(),
      email_address: "test@gmail.com",
    };
    const orderResult = await order.save();
    res.status(200).json(orderResult);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
