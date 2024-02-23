class DiscussionPostService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async upsertPost(data) {
    const { id, ...rest } = data;

    return this.prisma.discussionPost.upsert({
      where: {
        id: id ?? "000000000000000000000000",
        authorId: data.authorId,
      },
      update: rest,
      create: rest,
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