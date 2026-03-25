const express = require('express');
const router = express.Router();
const saeController = require('../controllers/saeController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.use(authMiddleware);

router.get('/', saeController.getAll);
router.get('/:id', saeController.getOne);

router.post('/', isAdmin, saeController.create);
router.put('/:id', isAdmin, saeController.update);
router.delete('/:id', isAdmin, saeController.delete);

router.post('/:id/assign', isAdmin, saeController.assignUsers);
router.delete('/:id/remove-user/:userId', isAdmin, saeController.removeUser);

module.exports = router;
