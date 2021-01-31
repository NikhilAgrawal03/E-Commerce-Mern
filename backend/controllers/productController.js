import asynchandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@access Public
const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc Delete a  product
//@route GET /api/products/:id
//@access Private/admin
const deleteProduct = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json(`User (${product.name}) removed`);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc create a  product
//@route GET /api/products
//@access Private/admin
const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a  product
//@route PUT /api/products/:id
//@access Private/admin
const updateProduct = asynchandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    image,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
};
