const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/register', registerUser);

module.exports = router;