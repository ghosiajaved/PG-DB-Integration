const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const axios = require('axios');
const { getAllUsers, getUserById } = require('./api/userApi');

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

// Import middlewares
const logger = require('./middlewares/logger');
const requestTime = require('./middlewares/requestTime');

// Apply middleware
app.use(logger);
app.use(requestTime);

// Display User Data on Screen using Axios with Token
app.get('/displayusers', async (req, res) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZXphQGdtYWlsLmNvbSIsImlkIjo4LCJpYXQiOjE3MjQ3NjYwNjUsImV4cCI6MTcyNDc2OTY2NX0.miS3RAnIRWHjHjMeI1PDXKvV1ajxwBnoll8h-x_kBl0'; 

    try {
        const users = await getAllUsers(token);

        let html = '<br/><center><h1>User Data Extracted With Axios</h1><ul></center><br/>';
        users.forEach(user => {
            html += `<center><li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
            <li>Address: ${user.address}</li>
            <li>Phone: ${user.phone}</li></center>
            <br/><br/>`;
        });
        html += '</ul>';

        res.send(html);  // Send the HTML response
    } catch (error) {
        console.error('Error fetching user data:', error.message);  // Log the error
        res.status(500).send('Error fetching user data');
    }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZXphQGdtYWlsLmNvbSIsImlkIjo4LCJpYXQiOjE3MjQ3NjYwNjUsImV4cCI6MTcyNDc2OTY2NX0.miS3RAnIRWHjHjMeI1PDXKvV1ajxwBnoll8h-x_kBl0'; // Replace with your actual token

    try {
        const user = await getUserById(id, token);

        let html = `<br/><center><h1>Individual User Extracted With Axios</h1><ul></center><br/>
            <center><li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
            <li>Address: ${user.address}</li>
            <li>Phone: ${user.phone}</li></center>
            <br/><br/>`;

        res.send(html);  // Send the HTML response
    } catch (error) {
        console.error('Error fetching user data:', error.message);  // Log the error
        res.status(500).send('Error fetching user data');
    }
});

// Root route
app.get('/', (req, res) => {

    res.cookie("name", "Ghosia");              // Checked using: Edit this cookie extension
    console.log(req.cookies);

    let responseText = 'Welcome to the Ecommerce API With Axios!<br>';
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
