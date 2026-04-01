const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const saes = await prisma.sae.count();
  const notes = await prisma.note.count();
  const users = await prisma.user.count();
  console.log(`SAEs: ${saes}`);
  console.log(`Notes: ${notes}`);
  console.log(`Users: ${users}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
