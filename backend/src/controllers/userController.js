const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const registerUserController = async (req, res) => {
  console.log("SessonR:")
  console.log(req.session);
  const { username, fullName, password, role, email, 
    phoneNumber, birthday, gender, schoolProgram, yearOfStudy } = req.body;

  // Check uniqueness before creating the user
  const isEmailUnique = await userService.isEmailUnique(email);
  const isUsernameUnique = await userService.isUsernameUnique(username);

  if (!isEmailUnique) {
    return res.status(400).json({ error: 'Email is already taken.' });
  }

  if (!isUsernameUnique) {
    return res.status(400).json({ error: 'Username is already taken.' });
  }


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
  console.log("SessonL:")
  console.log(req.session);
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


async function logoutUserController(req, res) {
  const { username } = req.body;

  try {
    await req.session.destroy();
    console.log(`User: ${username} has logged out successfully`);
    res.status(200).send();
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).json({ error: 'Error logging out' });
  }
}


async function getUser(req, res) {
  try {
    const { username } = req.params; 

    // Call the getUserByUsername function from the userService
    const user = await userService.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
      console.log('-----------')
    }

    // If the user is found, send it in the response
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserByUsername controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getSessionUser(req, res) {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'User is not logged in' });
    }

    const user = await userService.getUserByUsername(req.session.user.username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getSessionUser controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUser,
  getSessionUser,
};