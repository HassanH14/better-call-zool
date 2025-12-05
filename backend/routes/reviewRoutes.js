const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth'); 

// ===================================
// PUBLIC VIEW ROUTES
// ===================================

// @route   GET /api/reviews/:product_id - Get all reviews for a product
router.get('/:product_id', reviewController.getProductReviews);

// ===================================
// PRIVATE SUBMISSION ROUTE
// ===================================

// @route   POST /api/reviews - Submit a new review
router.post('/', auth, reviewController.createReview);

module.exports = router;