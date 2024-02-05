const express = require('express');
const { registerUserController, loginUserController } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

module.exports = router;