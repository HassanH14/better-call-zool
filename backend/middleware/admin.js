// backend/middleware/admin.js

const admin = (req, res, next) => {
    // 1. Check if the user object exists (set by the 'auth' middleware)
    if (!req.user) {
        // This case should not be hit if 'auth' runs first
        return res.status(401).json({ message: 'Authorization required.' });
    }

    // 2. Check the user's role against the required role ('admin')
    // This relies on the role being embedded in the JWT during login
    if (req.user.role === 'admin') {
        // User is an admin, proceed to the controller function
        next();
    } else {
        // User is logged in, but their role is not 'admin' (e.g., 'customer')
        res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
};

module.exports = admin;