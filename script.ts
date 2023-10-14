import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  console.dir(await getAllUsers(), { depth: null });
}

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}
