const prisma = require('./utils/prismaClient');
const bcrypt = require('bcrypt');

async function main() {
  const email = 'etudiant@exemple.com';
  const password = 'student'; // Le mot de passe en clair

  console.log(`Création de l'étudiant ${email}...`);

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log('Cet étudiant existe déjà. Mise à jour du mot de passe...');
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { 
        password: hashedPassword,
        role: 'ROLE_USER' 
      }
    });
    console.log('Données mises à jour avec succès !');
    return;
  }

  // Insérer l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'ROLE_USER',
    },
  });

  console.log('Étudiant créé avec succès !');
  console.log('ID:', user.id);
  console.log('Email:', user.email);
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
