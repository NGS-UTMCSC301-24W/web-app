// userModel.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser({
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
}) {
  try {
    const user = await prisma.User.create({
      data: {
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
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


async function getUserByUsername(username) {
    return prisma.User.findUnique({ where: { username }, })
}

module.exports = {
  createUser,
  getUserByUsername,
};
