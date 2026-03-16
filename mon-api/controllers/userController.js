const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { exclude } = require('../utils/exclude');

exports.getAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users.map(u => exclude(u, 'password')));
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getOne = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(exclude(user, 'password'));
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.create = async (req, res) => {
    try {
        const { email, password, nom, prenom, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, nom, prenom, role }
        });
        
        res.status(201).json(exclude(user, 'password'));
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { email, password, nom, prenom, role } = req.body;
        const data = { email, nom, prenom, role };
        
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data
        });
        
        res.json(exclude(user, 'password'));
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour' });
    }
};

exports.delete = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
};
