const prisma = require('./utils/prismaClient');
const bcrypt = require('bcrypt');

async function main() {
  const email = 'prof@exemple.com';
  const password = 'prof'; // Le mot de passe en clair

  console.log(`Création du professeur ${email}...`);

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log('Ce professeur existe déjà avec l\'ID:', existingUser.id);
    return;
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insérer l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      nom: 'Martin',
      prenom: 'Pierre',
      role: 'ROLE_PROF',
    },
  });

  console.log('Professeur créé avec succès !');
  console.log('ID:', user.id);
  console.log('Email:', user.email);
  console.log('Rôle:', user.role);
  console.log('Mot de passe (en clair, pour se connecter):', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
