// controllers/userController.js
const client = require('../db/db');
const { hashPassword } = require('../utils/hashingUtils');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT email, name, address, phone FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        /* const error = new Error('General Error Handler Test');        Testing Error Handler
        next(error);  */

        const result = await client.query('SELECT email, name, address, phone FROM users WHERE user_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { user_id, email, name, address, phone,password } = req.body;
        
        const hashedPassword = await hashPassword(password);

        const result = await client.query(
            'INSERT INTO users (email, name, address, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, name, address, phone, hashedPassword]
        );
       
        const user = result.rows[0];
        delete user.password;

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, address, phone } = req.body;

        const result = await client.query(
            'UPDATE users SET email = $1, name = $2, address = $3, phone = $4 WHERE user_id = $5 RETURNING *',
            [email, name, address, phone, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
