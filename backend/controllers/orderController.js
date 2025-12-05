const { pool } = require('../models/db');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private/Customer (Requires JWT)
exports.createOrder = async (req, res) => {
    const userId = req.user.id; 
    const { items } = req.body; 

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one item.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        let total_price = 0;
        const orderDetails = [];

        // 1. Validate products and calculate total price
        for (const item of items) {
            const [products] = await connection.execute(
                'SELECT price FROM products WHERE id = ?', 
                [item.product_id]
            );

            if (products.length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: `Product ID ${item.product_id} not found.` });
            }

            const productPrice = parseFloat(products[0].price);
            const quantity = parseInt(item.quantity, 10);
            
            if (quantity <= 0 || isNaN(quantity)) {
                await connection.rollback();
                return res.status(400).json({ message: `Invalid quantity for product ID ${item.product_id}.` });
            }

            const itemTotal = productPrice * quantity;
            total_price += itemTotal;

            orderDetails.push({
                product_id: item.product_id,
                quantity,
                price_at_time_of_order: productPrice
            });
        }
        
        // 2. Insert into the main 'orders' table
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
            [userId, total_price.toFixed(2)]
        );
        const orderId = orderResult.insertId;

        // 3. Insert into 'order_details' table
        for (const detail of orderDetails) {
            await connection.execute(
                'INSERT INTO order_details (order_id, product_id, quantity, price_at_time_of_order) VALUES (?, ?, ?, ?)',
                [orderId, detail.product_id, detail.quantity, detail.price_at_time_of_order]
            );
        }

        // 4. Commit the transaction
        await connection.commit();
        res.status(201).json({ 
            message: 'Order placed successfully!', 
            orderId: orderId,
            totalPrice: total_price.toFixed(2)
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Order Creation Error:', error); 
        res.status(500).json({ message: 'Server error during order placement.' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// ----------------------------------------------------
// NEW ORDER MANAGEMENT FUNCTIONS START HERE
// ----------------------------------------------------

// Helper function to fetch order details (used by both customer and admin)
const fetchOrderDetails = async (orderId) => {
    const [order] = await pool.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (order.length === 0) return null;

    const [details] = await pool.execute(
        `SELECT od.*, p.product_name 
         FROM order_details od
         JOIN products p ON od.product_id = p.id
         WHERE od.order_id = ?`, 
        [orderId]
    );

    return { ...order[0], items: details };
};


// @desc    Get all orders (Admin) OR Get user's orders (Customer)
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let sql = `SELECT o.id, u.user_name, o.total_price, o.status, o.created_at 
               FROM orders o JOIN users u ON o.user_id = u.id`;
    const params = [];

    if (userRole === 'customer') {
        sql += ' WHERE o.user_id = ?';
        params.push(userId);
    }
    
    sql += ' ORDER BY o.created_at DESC';

    try {
        const [orders] = await pool.execute(sql, params);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Get Orders Error:', error);
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private (Admin can view any; Customer can view only their own)
exports.getOrderById = async (req, res) => {
    const { id: orderId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const order = await fetchOrderDetails(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Security check: Customer can only view their own orders
        if (userRole === 'customer' && order.user_id !== userId) {
            return res.status(403).json({ message: 'Access denied. You can only view your own orders.' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Get Order By ID Error:', error);
        res.status(500).json({ message: 'Server error while fetching order details.' });
    }
};


// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    const { id: orderId } = req.params;
    const { status } = req.body;
    
    // Ensure the new status is valid according to your database ENUM
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status provided. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, orderId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: `Order ${orderId} status updated to ${status}.` });

    } catch (error) {
        console.error('Update Status Error:', error);
        res.status(500).json({ message: 'Server error while updating order status.' });
    }
};