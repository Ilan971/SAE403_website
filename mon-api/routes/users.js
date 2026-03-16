const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// All user routes are protected
router.use(authMiddleware);

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

// Only admins can modify users
router.post('/', isAdmin, userController.create);
router.put('/:id', isAdmin, userController.update);
router.delete('/:id', isAdmin, userController.delete);

module.exports = router;
