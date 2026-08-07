const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');

router.post('/register', autoController.register);
router.post('/login', autoController.login);

module.exports = router;