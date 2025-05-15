import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      role: 'admin',
    },
  });

  // Create an application
  const app = await prisma.application.create({
    data: {
      name: 'Test Application',
      description: 'Initial application',
    },
  });

  console.log({ user, app });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;