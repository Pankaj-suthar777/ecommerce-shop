import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../Models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.json(createOrder);
  }
});

// @desc   Get logged in user orders
// @route  Get /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});

// @desc   Get order by ID
// @route  Get /api/orders/:id
// @access Private

const getOrderbyId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(200).json(order);
    throw new Error("Order not found");
  }
});

// @desc   Update order to paid
// @route  Get /api/orders/:id/pay
// @access Private/Admin

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// @desc   Update order to be delivered
// @route  Get /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to deliver");
});

// @desc   Get all orders
// @route  Get /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send("add all order item");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderbyId,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
