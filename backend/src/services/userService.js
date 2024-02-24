// userService.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function createUser({ username, fullName, password, role, email, 
  phoneNumber, birthday, gender, schoolProgram, yearOfStudy }) {
  try {
    // One-way Hashes Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Convert birthday to ISO-8601 DateTime format
    const isoBirthday = convertToISODateTime(birthday);

    // Assuming userModel.createUser function now accepts an object with all the user properties
    const user = await userModel.createUser({
      username,
      fullName,
      password: hashedPassword,
      role,
      email,
      phoneNumber,
      birthday: isoBirthday, // Use the converted value
      gender,
      schoolProgram,
      yearOfStudy,
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

function convertToISODateTime(birthdayString) {
  const dateObject = new Date(birthdayString);
  const isoDateTime = dateObject.toISOString();
  return isoDateTime;
}

async function isEmailUnique(email) {
  const existingUser = await userModel.getUserByEmail(email);
  return !existingUser; 
}

async function isUsernameUnique(username) {
  const existingUser = await userModel.getUserByUsername(username);
  return !existingUser; 
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
  isEmailUnique,
  isUsernameUnique,
};
