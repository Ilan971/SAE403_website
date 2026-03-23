const prisma = require('./utils/prismaClient');
const bcrypt = require('bcrypt');

async function main() {
  const email = 'admin@exemple.com';
  const password = 'admin'; // Le mot de passe en clair

  console.log(`Création de l'utilisateur ${email}...`);

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insérer l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      nom: 'Admin',
      prenom: 'Test',
      role: 'ADMIN', // ou ce qui correspond à votre schéma Prisma
    },
  });

  console.log('Utilisateur créé avec succès !');
  console.log('ID:', user.id);
  console.log('Email:', user.email);
  console.log('Mot de passe (en clair, pour Postman):', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
