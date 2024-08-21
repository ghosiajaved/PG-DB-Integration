const db = require('./db/db');

// Fetch all products
db.getAllFromTable('products')
    .then(res => console.log(res.rows))
    .catch(err => console.log(err.message));

// Fetch all categories
db.getAllFromTable('categories')
    .then(res => console.log(res.rows))
    .catch(err => console.log(err.message));

db.getAllFromTable('users')
    .then(res => console.log(res.rows))
    .catch(err => console.log(err.message));

// Insert a user
const insertValues = [3, 'walijaa@gmail.com', 'Walija', 'Bahria Town', '1000'];
db.insertUser(insertValues)
    .then(() => console.log('User inserted successfully'))
    .catch(err => console.log(err.message));

// Update a user
const updateValues = ['Ayla', 3];
db.updateUser(updateValues)
    .then(() => console.log('User updated successfully'))
    .catch(err => console.log(err.message));

// Delete a user
const deleteValues = [3];
db.deleteUser(deleteValues)
    .then(() => console.log('User deleted successfully'))
    .catch(err => console.log(err.message));