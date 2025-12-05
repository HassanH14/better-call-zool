const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth'); // Uncommented for protected routes
const admin = require('../middleware/admin'); // Required for admin-only routes

// ===================================
// PUBLIC ROUTES
// ===================================

// 1. Registration (Working)
router.post('/register', authController.register);

// 2. Login (Fixes the 404 error)
router.post('/login', authController.login); 

module.exports = router;