const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables

// Configuration object for the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Maximum number of connections in the pool
    queueLimit: 0         // 0 means no limit on queueing requests
});

// Function to test the connection on startup
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database Connected Successfully!');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        // Important: Exit the application if the DB connection fails critical startup
        process.exit(1); 
    }
}

// Export the pool and the test function
module.exports = {
    pool,
    testConnection
};