const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

router.use(authMiddleware);

router.get('/', documentController.getAll);
router.get('/:id', documentController.getOne);

router.post('/', isAdmin, upload.single('fichier'), documentController.create);
router.put('/:id', isAdmin, upload.single('fichier'), documentController.update);
router.delete('/:id', isAdmin, documentController.delete);

module.exports = router;
