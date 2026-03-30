const prisma = require('../utils/prismaClient');

exports.getAll = async (req, res) => {
    try {
        const documents = await prisma.document.findMany({ 
            include: { 
                sae: { select: { titre: true } },
                user: { select: { nom: true, prenom: true } }
            } 
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const document = await prisma.document.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!document) return res.status(404).json({ message: 'Document non trouvé' });
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nom, type, saeId } = req.body;
        if (!['consigne', 'ressource', 'rendu'].includes(type)) {
            return res.status(400).json({ message: 'Type de document invalide' });
        }
        
        let cheminFichier = req.body.cheminFichier;
        if (req.file) {
            cheminFichier = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }
        
        if (!cheminFichier) {
            return res.status(400).json({ message: 'Un fichier ou un lien est requis' });
        }
        
        const document = await prisma.document.create({
            data: { nom, cheminFichier, type, saeId: parseInt(saeId), userId: req.user.id }
        });
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de création', error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { nom, cheminFichier, type, saeId } = req.body;
        if (type && !['consigne', 'ressource', 'rendu'].includes(type)) {
            return res.status(400).json({ message: 'Type de document invalide' });
        }

        const data = { type };
        if (nom) data.nom = nom;
        
        if (req.file) {
            data.cheminFichier = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        } else if (cheminFichier) {
            data.cheminFichier = cheminFichier;
        }

        if (saeId) data.saeId = parseInt(saeId);

        const document = await prisma.document.update({
            where: { id: parseInt(req.params.id) },
            data
        });
        res.json(document);
    } catch (error) {
        res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await prisma.document.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Document supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de suppression', error: error.message });
    }
};
