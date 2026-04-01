const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const counts = {
      users: await prisma.user.count(),
      saes: await prisma.sae.count(),
      notes: await prisma.note.count(),
      documents: await prisma.document.count(),
      annonces: await prisma.annonce.count()
    };
    console.log('Database Counts:', JSON.stringify(counts, null, 2));

    const allSaes = await prisma.sae.findMany({
      include: { users: true, documents: true }
    });
    console.log('SAEs with Users/Docs:', JSON.stringify(allSaes, null, 2));
  } catch (err) {
    console.error('Database Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
