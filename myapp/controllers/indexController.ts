const prisma = new PrismaClient();

export const userRouteHandler = async (req: any, res: any, next: any) => {
  console.log("User ID:", req.query.userid);
  res.json({ userId: req.query.userid });
};

export const indexRouteHandler = async (req: any, res: any, next: any) => {
  const posts = await prisma.post.findMany();

  res.json({ posts });
};
