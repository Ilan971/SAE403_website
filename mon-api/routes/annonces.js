const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonceController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.use(authMiddleware);

router.get('/', annonceController.getAll);
router.get('/:id', annonceController.getOne);

router.post('/', isAdmin, annonceController.create);
router.put('/:id', isAdmin, annonceController.update);
router.delete('/:id', isAdmin, annonceController.delete);

module.exports = router;
