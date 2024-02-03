const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function registerUser(userData) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password, 
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  registerUser,
};