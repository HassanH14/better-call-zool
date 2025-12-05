const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');   
const admin = require('../middleware/admin'); 

// ===================================
// PUBLIC READ ROUTES
// ===================================

// @route   GET /api/products
router.get('/', productController.getAllProducts);

// @route   GET /api/products/:id
router.get('/:id', productController.getProductById); // <-- NEW

// ===================================
// ADMIN MANAGEMENT ROUTES (Private/Admin)
// ===================================

// @route   POST /api/products
router.post('/', auth, admin, productController.createProduct);

// @route   PUT /api/products/:id
router.put('/:id', auth, admin, productController.updateProduct); // <-- NEW

// @route   DELETE /api/products/:id
router.delete('/:id', auth, admin, productController.deleteProduct); // <-- NEW

module.exports = router;