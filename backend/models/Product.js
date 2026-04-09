const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  originalPrice: {
    type: Number
  },

  quantity: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  deliveryTime: {
    type: String,
    default: "8 mins"
  },

  rating: {
    type: Number,
    default: 4.2
  },

  stock: {
    type: Number,
    default: 100
  },

  inStock: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);