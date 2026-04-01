const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

// Récupérer les notes d'une SAE
router.get('/sae/:saeId', noteController.getBySae);

// Créer ou mettre à jour une note (upsert)
router.post('/', noteController.upsert);

// Supprimer une note
router.delete('/:id', noteController.delete);

module.exports = router;
