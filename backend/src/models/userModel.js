const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser({ username, email, password }) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


module.exports = {
  createUser,
  getUserById,
};
