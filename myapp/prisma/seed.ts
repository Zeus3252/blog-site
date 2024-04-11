const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Seed Posts
  const post1 = await prisma.post.create({
    data: {
      title: "First Post",
      content: "This is the content of the first post.",
      comments: {
        create: [
          {
            username: "user1",
            content: "Great post!",
          },
          {
            username: "user2",
            content: "Thanks for sharing.",
          },
        ],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Second Post",
      content: "This is the content of the second post.",
      comments: {
        create: [
          {
            username: "user3",
            content: "Interesting read.",
          },
        ],
      },
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
