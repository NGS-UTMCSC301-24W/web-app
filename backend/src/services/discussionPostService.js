class DiscussionPostService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async upsertPost(data) {
    return this.prisma.discussionPost.upsert({
      where: { id: data.id ?? "000000000000000000000000" },
      update: Object.entries(data)
        .filter(([key]) => key !== "id")
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      create: data,
    })
      .catch(e => {
        console.error(e);
        return false;
      });
  }
}

module.exports = {
  DiscussionPostService,
};