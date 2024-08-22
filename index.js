// index.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const categoryRoutes = require('./routes/categoryRoute');

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Ecommerce API');
});

// Routes
app.use('/api/products', productRoutes);              //Checked all of these using POSTMAN 
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
