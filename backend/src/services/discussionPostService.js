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

  async getPost(data) {
    return this.prisma.discussionPost.findUnique({
      where: data,
      include: {
        author: {
          select: {
            username: true,
          }
        },
      }
    })
      .catch(e => {
        console.error(e);
        return false;
      });
  }

  async getPosts({ parentId = null, page = 0, type }) {
    const posts = await this.prisma.discussionPost.findMany({
      where: {
        ...(parentId ? { parentId } : { parent: null }),
        authorType: type,
      },
      skip: page * 10,
      take: 10,
      include: {
        author: {
          select: {
            username: true,
          }
        },
      }
    });

    return posts;
  }

  async deletePost(data) {
    return this.prisma.discussionPost.delete({
      where: data
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