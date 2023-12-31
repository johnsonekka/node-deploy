const fs = require("fs");
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;
const ejs = require('ejs');
const path = require('path');


//view 
exports.getAllProductSSR = async (req, res) => {
  const products = await Product.find({});
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'), {products:products}, function(err, str){
    res.send(str);
});
};

exports.getAddForm = async (req, res) => {
  ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'), function(err, str){
    res.send(str);
});
};




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
  let query = Product.find();
  console.log(req.query.sort);
  if(req.query.sort) {
    const products = await query.sort({[req.query.sort]:req.query.order}).limit(req.query.limit).exec();
    res.json(products);
  }else {
    const products = await query.exec();
    res.json(products);
  }
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
