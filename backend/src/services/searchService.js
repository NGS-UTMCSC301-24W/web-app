const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchRentalListings = async (query) => {
  try {
    const results = await prisma.rentalListing.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { address: { contains: query } },
          // Add more fields as needed
        ],
      },
    });

    return results;
  } catch (error) {
    console.error(error);
    throw new Error('Error in search service');
  }
};

module.exports = {
  searchRentalListings,
};
