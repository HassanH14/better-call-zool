const { pool } = require('../models/db'); 

// @desc    Submit a new review for a product
// @route   POST /api/reviews
// @access  Private (Requires any logged-in user)
exports.createReview = async (req, res) => {
    const userId = req.user.id;
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating) {
        return res.status(400).json({ message: 'Product ID and Rating are required.' });
    }

    const numericRating = parseInt(rating, 10);
    if (numericRating < 1 || numericRating > 5 || isNaN(numericRating)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    try {
        // 1. Check if the user has actually ordered this product
        const orderCheckSql = `
            SELECT 1 
            FROM orders o
            JOIN order_details od ON o.id = od.order_id
            WHERE o.user_id = ? 
            AND od.product_id = ?
            AND o.status != 'cancelled'
            LIMIT 1
        `;
        
        const [orders] = await pool.execute(orderCheckSql, [userId, product_id]);

        if (orders.length === 0) {
            return res.status(403).json({ message: 'You can only review products you have purchased.' });
        }

        // 2. Check if the user has already reviewed this product
        const [existingReview] = await pool.execute(
            'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
            [userId, product_id]
        );

        if (existingReview.length > 0) {
            return res.status(400).json({ message: 'You have already reviewed this product.' });
        }

        const sql = `
            INSERT INTO reviews (user_id, product_id, rating, comment) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.execute(sql, [
            userId, 
            product_id, 
            numericRating, 
            comment || null
        ]);

        res.status(201).json({ 
            message: 'Review submitted successfully!',
            reviewId: result.insertId
        });

    } catch (error) {
        console.error('Review Submission Error:', error);
        res.status(500).json({ message: 'Server error during review submission.' });
    }
};

// @desc    Get all reviews for a specific product
// @route   GET /api/reviews/:product_id
// @access  Public
exports.getProductReviews = async (req, res) => {
    const { product_id } = req.params;

    try {
        const [reviews] = await pool.execute(
            `SELECT r.*, u.user_name 
             FROM reviews r 
             JOIN users u ON r.user_id = u.id 
             WHERE r.product_id = ?
             ORDER BY r.created_at DESC`, 
            [product_id]
        );
        
        res.status(200).json(reviews);

    } catch (error) {
        console.error('Get Reviews Error:', error);
        res.status(500).json({ message: 'Server error while fetching reviews.' });
    }
};