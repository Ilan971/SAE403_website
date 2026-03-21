const prisma = require('../utils/prismaClient');

exports.getAll = async (req, res) => {
    try {
        const annonces = await prisma.annonce.findMany({ include: { sae: { select: { titre: true } }, user: { select: { nom: true, prenom: true } } } });
        res.json(annonces);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const annonce = await prisma.annonce.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!annonce) return res.status(404).json({ message: 'Annonce non trouvée' });
        res.json(annonce);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { titre, contenu, saeId } = req.body;
        const annonce = await prisma.annonce.create({
            data: { titre, contenu, saeId: parseInt(saeId), userId: req.user.id }
        });
        res.status(201).json(annonce);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de création', error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { titre, contenu, saeId } = req.body;
        const data = { titre, contenu };
        if (saeId) data.saeId = parseInt(saeId);

        const annonce = await prisma.annonce.update({
            where: { id: parseInt(req.params.id) },
            data
        });
        res.json(annonce);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await prisma.annonce.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Annonce supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de suppression', error: error.message });
    }
};
