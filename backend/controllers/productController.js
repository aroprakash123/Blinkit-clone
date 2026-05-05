const mongoose = require("mongoose");
const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID (FIXED SAFE VERSION)
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
};