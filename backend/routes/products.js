const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const reviewController = require('../controllers/reviewController')

router.get('/', productController.getProducts)

router.get('/:product', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:product', productController.deleteProduct);


router.get('/:product/reviews', reviewController.getProductReviews);
router.post('/:product/reviews', reviewController.addReview);
router.delete('/reviews/:review', reviewController.deleteReview);

module.exports = router;
