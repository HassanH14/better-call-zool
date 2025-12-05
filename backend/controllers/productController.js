const { pool } = require('../models/db'); 

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    // ... (Your existing createProduct code is here)
    const { product_name, product_description, category, price, image_url } = req.body;
    
    if (!product_name || !price) {
        return res.status(400).json({ message: 'Product name and price are required.' });
    }

    try {
        const sql = `
            INSERT INTO products 
            (product_name, product_description, category, price, image_url) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(sql, [
            product_name, 
            product_description || null,
            category || 'Uncategorized',
            parseFloat(price), 
            image_url || null
        ]);

        res.status(201).json({ 
            message: 'Product added successfully!',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Add Product Error:', error);
        res.status(500).json({ message: 'Server error while adding product.' });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.execute('SELECT * FROM products ORDER BY id DESC');
        res.status(200).json(products);
    } catch (error) {
        console.error('Get Products Error:', error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
};

// ----------------------------------------------------
// NEW CRUD FUNCTIONS START HERE
// ----------------------------------------------------

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product[0]);
    } catch (error) {
        console.error('Get Product Error:', error);
        res.status(500).json({ message: 'Server error while fetching product.' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, product_description, category, price, image_url } = req.body;

    // Build the query dynamically to allow partial updates
    const fields = [];
    const values = [];

    if (product_name) { fields.push('product_name = ?'); values.push(product_name); }
    if (product_description !== undefined) { fields.push('product_description = ?'); values.push(product_description); }
    if (category) { fields.push('category = ?'); values.push(category); }
    if (price) { fields.push('price = ?'); values.push(parseFloat(price)); }
    if (image_url !== undefined) { fields.push('image_url = ?'); values.push(image_url); }
    
    if (fields.length === 0) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    try {
        const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const [result] = await pool.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found or no changes made.' });
        }

        res.status(200).json({ message: 'Product updated successfully.' });

    } catch (error) {
        console.error('Update Product Error:', error);
        res.status(500).json({ message: 'Server error while updating product.' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });

    } catch (error) {
        console.error('Delete Product Error:', error);
        res.status(500).json({ message: 'Server error while deleting product.' });
    }
};