const Product = require('../models/Product');

//get reviews for the product
exports.getProductReviews = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 3;

  try {
    const product = await Product.findById(req.params.product);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    const reviews = product.reviews.slice((page - 1) * limit, page * limit);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add review for product
exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    product.reviews.push(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// delete review
exports.deleteReview = async (req, res) => {
  const { review } = req.params;

  try {
    const product = await Product.findOne({ 'reviews._id': review });
    if (!product) {
      return res.status(404).send('Review not found');
    }
    product.reviews.id(review).remove();
    await product.save();
    res.status(200).send('Review deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
