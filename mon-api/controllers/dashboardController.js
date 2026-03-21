const prisma = require('../utils/prismaClient');

exports.getEtudiantDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Les SAE en cours et les échéances proches (triées par date)
        const saes = await prisma.sae.findMany({
            where: { users: { some: { id: userId } } }, 
            orderBy: { dateEcheance: 'asc' },
            include: { documents: { where: { type: 'consigne' } } }
        });

        const rendus = await prisma.document.findMany({
            where: { userId: userId, type: 'rendu' },
            include: { sae: { select: { titre: true } } }
        });

        res.json({ saes, rendus });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getEnseignantDashboard = async (req, res) => {
    try {
        const { semestre, annee } = req.query;
        // Filtrage optionnel par semestre / année (état en_cours etc.)
        const filters = {};
        if (semestre) filters.semestre = parseInt(semestre);
        if (annee) filters.anneeUniversitaire = annee;

        const saes = await prisma.sae.findMany({
            where: filters,
            include: { 
                users: { select: { id: true, nom: true, prenom: true } },
                documents: { where: { type: 'rendu' } } 
            }
        });

        res.json({ saes });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
