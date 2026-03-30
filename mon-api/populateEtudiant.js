const prisma = require('./utils/prismaClient');

async function main() {
  const email = 'etudiant@exemple.com';
  
  // Récupérer l'étudiant
  const etudiant = await prisma.user.findUnique({ where: { email } });
  if (!etudiant) {
      console.log('Étudiant non trouvé');
      return;
  }

  // Récupérer toutes les SAE existantes
  const saes = await prisma.sae.findMany();
  
  if (saes.length === 0) {
      console.log('Aucune SAE dans la base de données. Création de quelques SAEs de test...');
      
      const now = new Date();
      await prisma.sae.createMany({
          data: [
              { titre: 'SAE 3.01 - Développement Web', description: 'Site', semestre: 3, anneeUniversitaire: '2025-2026', dateEcheance: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000) },
              { titre: 'SAE 2.04 - UX/UI', description: 'Design', semestre: 2, anneeUniversitaire: '2025-2026', dateEcheance: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
              { titre: 'SAE 3.02 - Algorithmique', description: 'Algo', semestre: 3, anneeUniversitaire: '2025-2026', dateEcheance: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000) },
          ]
      });
  }

  // Assigner l'étudiant à toutes les SAEs existantes
  const allSaes = await prisma.sae.findMany();
  for (const sae of allSaes) {
      await prisma.sae.update({
          where: { id: sae.id },
          data: {
              users: {
                  connect: { id: etudiant.id }
              }
          }
      });
  }

  // Simuler un rendu pour la première SAE
  if (allSaes.length > 0) {
      // Vérifier s'il n'y a pas déjà de rendu
      const rendus = await prisma.document.findMany({ where: { userId: etudiant.id, type: 'rendu' } });
      if (rendus.length === 0) {
          await prisma.document.create({
              data: {
                  nom: 'Livrable_Maquette_Etudiant.pdf',
                  cheminFichier: 'http://localhost:8000/uploads/dummy.pdf',
                  type: 'rendu',
                  saeId: allSaes[0].id,
                  userId: etudiant.id
              }
          });
      }
  }

  console.log('Données peuplées avec succès pour l étudiant !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
