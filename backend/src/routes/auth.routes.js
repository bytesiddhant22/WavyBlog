const express = require('express');
const { signup , login } = require('../controllers/auth.controller');
const router = express.Router();
const protect = require('../middleware/auth.middleware')

router.post('/signup' , signup);
router.post('/login', login);

module.exports = router;