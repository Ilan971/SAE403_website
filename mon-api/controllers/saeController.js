const prisma = require('../utils/prismaClient');

exports.getAll = async (req, res) => {
    try {
        const saes = await prisma.sae.findMany({
            include: { 
                users: { select: { id: true, role: true } },
                documents: true 
            }
        });
        res.json(saes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getPublic = async (req, res) => {
    try {
        const saes = await prisma.sae.findMany({
            where: { isPublic: true },
            include: { 
                users: { select: { id: true, role: true } },
                documents: true 
            }
        });
        res.json(saes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.togglePublish = async (req, res) => {
    try {
        const saeId = parseInt(req.params.id);
        const userId = req.user.id;
        const userRole = req.user.role;

        const sae = await prisma.sae.findUnique({
            where: { id: saeId },
            include: { users: true }
        });

        if (!sae) {
            return res.status(404).json({ message: 'SAE non trouvée' });
        }

        const updatedSae = await prisma.sae.update({
            where: { id: saeId },
            data: { isPublic: !sae.isPublic }
        });

        res.json(updatedSae);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const sae = await prisma.sae.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { documents: true, annonces: true, users: { select: { id: true, nom: true, prenom: true, role: true } } }
        });
        if (!sae) return res.status(404).json({ message: 'SAE non trouvée' });
        res.json(sae);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { titre, description, semestre, anneeUniversitaire, dateEcheance } = req.body;
        const sae = await prisma.sae.create({
            data: { titre, description, semestre: parseInt(semestre), anneeUniversitaire, dateEcheance: new Date(dateEcheance) }
        });
        res.status(201).json(sae);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de création', error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { titre, description, semestre, anneeUniversitaire, dateEcheance } = req.body;
        const data = { titre, description, anneeUniversitaire };
        if (semestre) data.semestre = parseInt(semestre);
        if (dateEcheance) data.dateEcheance = new Date(dateEcheance);

        const sae = await prisma.sae.update({
            where: { id: parseInt(req.params.id) },
            data
        });
        res.json(sae);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await prisma.sae.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'SAE supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de suppression', error: error.message });
    }
};

exports.assignUsers = async (req, res) => {
    try {
        const saeId = parseInt(req.params.id);
        const { userIds } = req.body;

        if (!Array.isArray(userIds)) {
            return res.status(400).json({ message: 'userIds doit être un tableau.' });
        }

        const connectData = userIds.map(id => ({ id: parseInt(id) }));

        const sae = await prisma.sae.update({
            where: { id: saeId },
            data: {
                users: {
                    connect: connectData
                }
            },
            include: { users: { select: { id: true, nom: true, prenom: true, role: true } } }
        });

        res.json({ message: 'Utilisateurs assignés avec succès.', sae });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'assignation.', error: error.message });
    }
};

exports.removeUser = async (req, res) => {
    try {
        const saeId = parseInt(req.params.id);
        const userId = parseInt(req.params.userId);

        const sae = await prisma.sae.update({
            where: { id: saeId },
            data: {
                users: {
                    disconnect: { id: userId }
                }
            },
            include: { users: { select: { id: true, nom: true, prenom: true, role: true } } }
        });

        res.json({ message: 'Utilisateur retiré de la SAE avec succès.', sae });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la désassignation.', error: error.message });
    }
};
