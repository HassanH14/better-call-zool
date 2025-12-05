const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin'); 

// ===================================
// PRIVATE ROUTES (All logged-in users)
// ===================================

// @route   POST /api/orders - Place a new order
router.post('/', auth, orderController.createOrder);

// @route   GET /api/orders - Get all orders (Admin) OR User's orders (Customer)
router.get('/', auth, orderController.getOrders);

// @route   GET /api/orders/:id - Get a single order detail
router.get('/:id', auth, orderController.getOrderById);

// ===================================
// ADMIN ROUTES
// ===================================

// @route   PUT /api/orders/:id/status - Update order status (Requires Admin role)
router.put('/:id/status', auth, admin, orderController.updateOrderStatus);

module.exports = router;