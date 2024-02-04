const express = require('express');
const { registerUserController } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/register', registerUserController);

module.exports = router;