const prisma = require('./utils/prismaClient');
const bcrypt = require('bcrypt');

async function main() {
  const email = 'etudiant@exemple.com';
  const password = 'eleve'; 

  console.log(`Création de l'utilisateur ${email}...`);

  const hashedPassword = await bcrypt.hash(password, 10);

  // Vérifier s'il existe déjà
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
     console.log('Cet étudiant existe déjà. Mise à jour du mot de passe...');
     await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
     });
     console.log('Mot de passe mis à jour avec succès !');
     return;
  }

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
