import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const mockUsers: Prisma.UserCreateInput[] = [
  {
    firstName: "David",
    lastName: "Barrett",
    email: "dbarrett@expensify.com ",
  },
  {
    firstName: "Hayata",
    lastName: "Suenaga",
    email: "hsuenaga.expensify.com",
  },
];

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
  const newUser = await createUsers(mockUsers);
  const users = await getAllUsers();
  console.log(users);
}

async function createUsers(users: Prisma.UserCreateInput[]) {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function getFeed(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
}
