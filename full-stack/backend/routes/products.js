
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');  // Fetch unique categories
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

router.get('/', productController.getProducts); 
router.get('/:product', productController.getProductById);
router.get('/:product/reviews', productController.getProductReviews);
router.post('/', productController.createProduct);
router.post('/:product/reviews', productController.addReview);
router.delete('/:product', productController.deleteProduct);
router.delete('/:product/reviews/:reviewId', productController.deleteReview);


module.exports = router;
