// schema/productSchema.js
const { Client } = require('pg');
const client = require('../db/db');

const createProductTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            quantity INT NOT NULL,
            cat_id INT REFERENCES categories(category_id)
        );
    `;
    await client.query(query);
};

createProductTable();
