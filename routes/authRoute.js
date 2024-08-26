// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY; 

//http://localhost:3000/api/auth/login using post method and correct credentials returns token

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Authenticate user (basic example)
    if (email === 'test@example.com' && password === 'password') {
        const token = jwt.sign({ email: email }, secret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;
