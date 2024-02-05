// userService.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function createUser(username, password, email ) {
  try {
    //One-way Hashes Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser( username, hashedPassword, email );
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await userModel.getUserByUsername( username);
    return user;
  } catch (error) {
    console.error('No user found with unsername:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
};
