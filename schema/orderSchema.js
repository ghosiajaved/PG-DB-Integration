// schema/orderSchema.js
const client = require('../db/db');

const createOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            status VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            u_id INT REFERENCES users(user_id)
        );
    `;
    await client.query(query);
};

createOrderTable();
