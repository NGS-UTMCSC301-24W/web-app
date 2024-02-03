const { userService } = require('../services/userService');

async function registerUser(req, res) {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  registerUser,
};