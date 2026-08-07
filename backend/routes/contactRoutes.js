const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', contactController.envoyerMessage); // piblik
router.get('/', authMiddleware, adminMiddleware, contactController.getAllMessages); // admin sèlman

module.exports = router;