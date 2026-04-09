const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number
  }],
  address: {
    flatNo: String,
    floor: String,
    area: String,
    landmark: String,
    name: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Card', 'UPI'],
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  deliveryCharge: {
    type: Number,
    default: 25
  },
  handlingCharge: {
    type: Number,
    default: 2
  },
  smallCartCharge: {
    type: Number,
    default: 0
  },
  tip: {
    type: Number,
    default: 0
  },
  donation: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);