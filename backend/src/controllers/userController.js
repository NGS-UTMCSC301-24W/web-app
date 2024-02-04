const userService = require('../services/userService');

const registerUserController = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await userService.createUser(username, password, email);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUserController,
};