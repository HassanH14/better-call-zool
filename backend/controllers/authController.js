const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { pool } = require('../models/db'); 
require('dotenv').config();

exports.register = async (req, res) => {
    // Only accept name, email, and password - role is NOT accepted
    const { name, email, password } = req.body; 

    try {
        // 1. Check if user already exists
        const [existingUser] = await pool.execute(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insert user into MySQL - ALWAYS set role to 'customer'
        // Admin accounts must be created directly in the database
        const [result] = await pool.execute(
            'INSERT INTO users (user_name, email, user_password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'customer'] 
        );

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Registration API Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find User by Email
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials (User not found)' });
        }

        const user = users[0];

        // 2. Verify Password
        let isMatch = false;
        
        // First: Try to compare assuming it's a hashed password
        try {
            isMatch = await bcrypt.compare(password, user.user_password);
        } catch (err) {
            // If bcrypt fails (e.g. invalid hash format), we'll check plaintext next
            isMatch = false;
        }

        // Second: Fallback for plain text passwords (e.g. manually inserted into DB)
        if (!isMatch && password === user.user_password) {
            console.log(`Plain text password detected for ${email}. Auto-encrypting...`);
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Update DB with the secure hash so this fallback isn't needed next time
            await pool.execute(
                'UPDATE users SET user_password = ? WHERE id = ?', 
                [hashedPassword, user.id]
            );
            
            isMatch = true;
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials (Password mismatch)' });
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Send Token to Client
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.user_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login API Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};