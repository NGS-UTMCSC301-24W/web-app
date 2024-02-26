const express = require('express');
const { registerUserController, loginUserController, logoutUserController } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/logout', logoutUserController);

module.exports = router;