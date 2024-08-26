const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Import middlewares
const logger = require('./middlewares/logger');
const requestTime = require('./middlewares/requestTime');
const verifyToken = require('./middlewares/authMiddleware'); 

// Apply middleware
app.use(logger);
app.use(requestTime);

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());  

// Import Routes
const productRoutes = require('./routes/productRoute');    // Checked all of these using POSTMAN 
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const categoryRoutes = require('./routes/categoryRoute');
const authRoutes = require('./routes/authRoute');

// Apply Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {

    res.cookie("name", "Ghosia");              // Checked using: Edit this cookie extension
    console.log(req.cookies); 

    let responseText = 'Welcome to the Ecommerce API With Cookie!<br>';
    responseText += `<small>Requested at: ${req.requestTime}</small>`;
    res.send(responseText);
});


// Import error handlers
const notFound = require('./errors/notFound');
const validationError = require('./errors/validationError');
const errorHandler = require('./errors/errorHandler');

// Apply Error handling middlewares
app.use(notFound);
app.use(validationError);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
