// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

//public route
/* router.get('/', verifyToken, userController.getAllUsers);

router.get('/:id',verifyToken, userController.getUserById); //if token is corect it returns output else "token is invalid"
router.post('/',verifyToken, userController.createUser);
router.put('/:id',verifyToken, userController.updateUser);
router.delete('/:id',verifyToken, userController.deleteUser); */


router.post('/signup', userController.signup);
router.post('/login', userController.login);


module.exports = router;
