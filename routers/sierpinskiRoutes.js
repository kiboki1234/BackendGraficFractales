const express = require('express');
const { generateSierpinski } = require('../controllers/sierpinskiController');
const router = express.Router();

router.get('/sierpinski', generateSierpinski);

module.exports = router;
