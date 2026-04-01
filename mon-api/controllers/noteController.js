const prisma = require('../utils/prismaClient');

// GET /notes/sae/:saeId — Récupérer toutes les notes d'une SAE
exports.getBySae = async (req, res) => {
    try {
        const saeId = parseInt(req.params.saeId);
        const notes = await prisma.note.findMany({
            where: { saeId },
            include: {
                etudiant: { select: { id: true, nom: true, prenom: true, email: true } },
                prof: { select: { id: true, nom: true, prenom: true } }
            },
            orderBy: { etudiant: { nom: 'asc' } }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// POST /notes — Créer ou mettre à jour une note (upsert)
exports.upsert = async (req, res) => {
    try {
        const { saeId, etudiantId, valeur, commentaire, dateNotation } = req.body;
        
        if (valeur < 0 || valeur > 20) {
            return res.status(400).json({ message: 'La note doit être entre 0 et 20.' });
        }

        const note = await prisma.note.upsert({
            where: {
                saeId_etudiantId: { saeId: parseInt(saeId), etudiantId: parseInt(etudiantId) }
            },
            update: {
                valeur: parseFloat(valeur),
                commentaire: commentaire || null,
                profId: req.user.id,
                dateNotation: dateNotation ? new Date(dateNotation) : new Date()
            },
            create: {
                saeId: parseInt(saeId),
                etudiantId: parseInt(etudiantId),
                profId: req.user.id,
                valeur: parseFloat(valeur),
                commentaire: commentaire || null,
                dateNotation: dateNotation ? new Date(dateNotation) : new Date()
            },
            include: {
                etudiant: { select: { id: true, nom: true, prenom: true, email: true } },
                prof: { select: { id: true, nom: true, prenom: true } }
            }
        });

        res.json(note);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la notation', error: error.message });
    }
};

// DELETE /notes/:id — Supprimer une note
exports.delete = async (req, res) => {
    try {
        await prisma.note.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Note supprimée.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
};
