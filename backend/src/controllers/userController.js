const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const registerUserController = async (req, res) => {
  const { username, fullName, password, role, email, 
    phoneNumber, birthday, gender, schoolProgram, yearOfStudy } = req.body;

  try {
    const newUser = await userService.createUser({
      username,
      fullName,
      password,
      role,
      email,
      phoneNumber,
      birthday,
      gender,
      schoolProgram,
      yearOfStudy,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


async function loginUserController(req, res) {
  
  const { username, password } = req.body;
  try {
    const user = await userService.getUserByUsername(username);

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Set user data in the session
    req.session.user = { id: user.id, username: user.username };

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  
module.exports = {
  registerUserController,
  loginUserController,
};