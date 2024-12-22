const Product = require('../models/Product');

// Get reviews for a specific product
exports.getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Match route param
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product.reviews);  // Return product's reviews
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a review for a product
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Match route param
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.reviews.push(req.body);  // Add review
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findOne({ 'reviews._id': req.params.reviewId });
    if (!product) {
      return res.status(404).json({ message: 'Review not found' });
    }
    product.reviews.id(req.params.reviewId).remove();  // Remove review
    await product.save();
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
