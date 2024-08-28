// controllers/orderController.js
const client = require('../db/db');

exports.getAllOrders = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM orders');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM orders WHERE order_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { status, u_id } = req.body;
        const result = await client.query(
            'INSERT INTO orders (status, u_id) VALUES ($1, $2) RETURNING *',
            [status, u_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, u_id } = req.body;
        const result = await client.query(
            'UPDATE orders SET status = $1, u_id = $2 WHERE order_id = $3 RETURNING *',
            [status, u_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
