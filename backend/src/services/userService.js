// userService.js
const userModel = require('../models/userModel');

async function createUser(username, password, email ) {
  try {
    const user = await userModel.createUser( username, password, email );
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
};
