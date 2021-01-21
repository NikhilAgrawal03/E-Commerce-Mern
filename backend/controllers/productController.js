import asynchandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@access Public
const getProdcuts = asynchandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc fetch single products
//@route GET /api/products/:id
//@access Public
const getProdcutById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProdcuts, getProdcutById };
