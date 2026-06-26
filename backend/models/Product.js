const mongoose = require("mongoose");

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
    type: Number,
    default: 0
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

  description: {
    type: String,
    default: ""
  },

  brand: {
    type: String,
    default: ""
  },

  highlights: {
    type: [String],
    default: []
  },

  ingredients: {
    type: String,
    default: ""
  },

  nutritionalInfo: {
    type: String,
    default: ""
  },

  seller: {
    type: String,
    default: ""
  },

  countryOfOrigin: {
    type: String,
    default: ""
  },

  shelfLife: {
    type: String,
    default: ""
  },

  deliveryTime: {
    type: String,
    default: "8 mins"
  },

  rating: {
    type: Number,
    default: 4.5
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

module.exports = mongoose.model("Product", productSchema);