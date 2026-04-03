const express = require('express');
const router = express.Router();
const saeController = require('../controllers/saeController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Route publique (pas d'auth requise) pour la page d'accueil
router.get('/public', saeController.getPublic);

router.use(authMiddleware);

router.get('/', saeController.getAll);
router.get('/:id', saeController.getOne);

router.post('/', isAdmin, saeController.create);
router.put('/:id', isAdmin, saeController.update);
router.delete('/:id', isAdmin, saeController.delete);

router.post('/:id/assign', isAdmin, saeController.assignUsers);
router.delete('/:id/remove-user/:userId', isAdmin, saeController.removeUser);

// Rendre la SAE publique/privée (dispo par authMiddleware -> rôle user/prof/admin)
router.patch('/:id/publish', saeController.togglePublish);

module.exports = router;
