// schema/categorySchema.js
const client = require('../db/db');

const createCategoryTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS categories (
            category_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `;
    await client.query(query);
};

createCategoryTable();
