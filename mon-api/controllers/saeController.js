const prisma = require('../utils/prismaClient');

exports.getAll = async (req, res) => {
    try {
        const saes = await prisma.sae.findMany();
        res.json(saes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const sae = await prisma.sae.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { documents: true, annonces: true, users: { select: { id: true, nom: true, prenom: true } } }
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
