// schema/userSchema.js
const client = require('../db/db');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            address TEXT,
            phone VARCHAR(15)
        );
    `;
    await client.query(query);
};

createUserTable();
