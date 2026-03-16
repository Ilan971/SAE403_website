module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({ message: 'Accès interdit. Droits administrateur requis.' });
    }

    next();
};
