const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to check for a valid JWT token
const auth = (req, res, next) => {
    // 1. Get token from the header
    // The client sends the token in the format: 'Bearer TOKEN_STRING'
    const authHeader = req.header('Authorization');

    // Check if the Authorization header exists or if it's not a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Stop execution and send 401 Unauthorized
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    // Extract the token string (remove "Bearer ")
    const token = authHeader.replace('Bearer ', '');

    try {
        // 2. Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach the decoded user payload (id, role) to the request object
        // This is how we know who the user is in the controller!
        req.user = decoded;
        
        // 4. Proceed to the next middleware or the final route handler
        next();

    } catch (e) {
        // If verification fails (e.g., token expired or invalid signature)
        res.status(401).json({ message: 'Token is not valid or has expired.' });
    }
};

module.exports = auth;