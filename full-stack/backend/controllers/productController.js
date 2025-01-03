
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { name, category, price } = req.query;
  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };  
  }
  if (category) {
    filter.category = category;
  }
  if (price) {
    filter.price = { $lte: price };
  }

  let sortOrder = 0;
  if(price === "highest"){
    sortOrder = -1;
  } else if (price === "lowest"){
    sortOrder = 1
  }

  try {
    const products = await Product.find(filter); 
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//get by ID
exports.getProductById = async (req, res) => {
  const { product } = req.params;
  
  try {
    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
//get reviews 
exports.getProductReviews = async (req, res) => {
  const { product } = req.params;
  const { page = 1 } = req.query;
  const limit = 4;
  
  try {
    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const reviews = foundProduct.reviews.slice((page - 1) * limit, page * limit);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
//create products
exports.createProduct = async (req, res) => {
  const { name, category, price, reviews } = req.body;
  
  try {
    const newProduct = new Product({ name, category, price, reviews });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.addReview = async (req, res) => {
  const { product } = req.params;
  const { userName, text } = req.body;
  
  try {
    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    foundProduct.reviews.push({ userName, text });
    await foundProduct.save();
    res.status(201).json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { product } = req.params;
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(product);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

exports.deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.reviews.id(reviewId).remove();
    await product.save();
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review' });
  }
};