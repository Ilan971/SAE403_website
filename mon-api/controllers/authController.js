const prisma = require('../utils/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'super-secret-jwt-key-development',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user.id, email: user.email, nom: user.nom, prenom: user.prenom, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, nom, prenom } = req.body;
        if (!email || !password || !nom || !prenom) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: { 
                email, 
                password: hashedPassword, 
                nom, 
                prenom, 
                role: 'ROLE_USER' // Toujours un étudiant lors d'une inscription publique
            }
        });
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
};
