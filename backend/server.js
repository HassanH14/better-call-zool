const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

// Import the database pool (Assumes you have models/db.js)
const { pool } = require('./models/db'); 

// Import all routes
const authRoutes = require('./routes/authRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// 1. MIDDLEWARE SETUP

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json()); 
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true })); 


// 2. API ROUTES

// Attach the authentication routes (register and login)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);


// 3. SERVER STARTUP & DB CHECK

app.listen(PORT, async () => {
    console.log(`Server running: http://localhost:${PORT}`);

    try {
        // Test database connection at startup
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database Connected Successfully!');
        connection.release(); 
    } catch (err) {
        console.error('❌ Database Connection Failed at Startup:', err.message);
    }
});