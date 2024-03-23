const express = require('express');
const userService = require('../services/userService');
const { registerUserController, loginUserController, logoutUserController, getUser } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/logout', logoutUserController);
router.get('/:username', getUser);


module.exports = router;