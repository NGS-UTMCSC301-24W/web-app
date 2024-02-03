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
}

module.exports = {
  ListingService,
};