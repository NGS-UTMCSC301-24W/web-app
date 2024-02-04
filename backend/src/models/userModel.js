// userModel.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function createUser(username, email, password) {
  try {
    const user = await prisma.User.create({
      data: {
        username,
        password,
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
};
