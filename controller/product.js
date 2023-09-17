const fs = require("fs");
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;

// Create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    console.log("Product saved:", savedProduct);

    // Send a success response with the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error) {
      res.status(400).json(error);
    }
    // Handle errors here
    console.error("Error creating product:", error);

    // Send an error response with a status code of 500
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
exports.getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log({ id });
  const product = await Product.findById(id);
  res.json(product);
};

// Update
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
