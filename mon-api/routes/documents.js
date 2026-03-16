const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.use(authMiddleware);

router.get('/', documentController.getAll);
router.get('/:id', documentController.getOne);

router.post('/', isAdmin, documentController.create);
router.put('/:id', isAdmin, documentController.update);
router.delete('/:id', isAdmin, documentController.delete);

module.exports = router;
