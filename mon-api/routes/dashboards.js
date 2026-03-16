const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/etudiant', dashboardController.getEtudiantDashboard);
router.get('/enseignant', dashboardController.getEnseignantDashboard);

module.exports = router;
