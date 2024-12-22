const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

// Product Routes
router.get('/', productController.getProducts);               // Get all products
router.get('/:id', productController.getProductById);         // Get product by ID
router.post('/', productController.createProduct);            // Create a new product
router.delete('/:id', productController.deleteProduct);       // Delete product by ID

// Review Routes (nested under specific product)
router.get('/:id/reviews', reviewController.getProductReviews);  // Get reviews for a product
router.post('/:id/reviews', reviewController.addReview);         // Add review to a product
router.delete('/reviews/:reviewId', reviewController.deleteReview);  // Delete a review by ID

module.exports = router;
