const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod, tip, donation, totalAmount, subtotal } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderId = 'BLK' + Date.now() + Math.floor(Math.random() * 1000);
    
    const items = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity
    }));

    const smallCartCharge = subtotal < 100 ? 20 : 0;

    const order = await Order.create({
      user: req.user._id,
      orderId,
      items,
      address,
      paymentMethod,
      subtotal,
      deliveryCharge: 25,
      handlingCharge: 2,
      smallCartCharge,
      tip: tip || 0,
      donation: donation ? 1 : 0,
      totalAmount,
      status: 'Confirmed'
    });

    // Clear cart after order
    cart.items = [];
    cart.tip = 0;
    cart.donation = false;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById };