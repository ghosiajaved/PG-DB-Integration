const { Client } = require('pg');
require('dotenv').config();

// Database connection
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

client.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error('Connection error', err.stack));

// Function to fetch all rows from a table
const getAllFromTable = (tableName) => {
    return client.query(`SELECT * FROM ${tableName}`);
};

// Function to insert a user
const insertUser = (values) => {
    const insertQuery = `INSERT INTO users (user_id, email, name, address, phone) VALUES ($1, $2, $3, $4, $5)`;
    return client.query(insertQuery, values);
};

// Function to update a user
const updateUser = (values) => {
    const updateQuery = `UPDATE users SET name = $1 WHERE user_id = $2`;
    return client.query(updateQuery, values);
};

// Function to delete a user
const deleteUser = (value) => {
    const deleteQuery = `DELETE FROM users WHERE user_id = $1`;
    return client.query(deleteQuery, value);
};

// Export the functions
module.exports = {
    getAllFromTable,
    insertUser,
    updateUser,
    deleteUser,
    client
}