class ListingService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createListing(data) {
    return this.prisma.rentalListing.create({ data })
      .catch(e => {
        console.error(e);
        return false;
      });
  }

  async getListing(id) {
    return this.prisma.rentalListing.findUnique({ where: { id } })
      .catch(e => {
        console.error(e);
        return false;
      });
  }

  async getAllListings() {
      return this.prisma.rentalListing.findMany()
  }
}

module.exports = {
  ListingService,
};