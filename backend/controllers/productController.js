// controllers/productController.js
const client = require('../db/db');

exports.getAllProducts = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, cat_id } = req.body;
        const result = await client.query(
            'INSERT INTO products (name, description, price, quantity, cat_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, quantity, cat_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// checking if validation error handler works fine or not
/* exports.createProduct = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        const err = new Error('Validation Error: Name and price are required');
        err.name = 'ValidationError'; // This triggers the validation error handler
        return next(err);
    }
       
}; */

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, cat_id } = req.body;
        const result = await client.query(
            'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4, cat_id = $5 WHERE product_id = $6 RETURNING *',
            [name, description, price, quantity, cat_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
