const express = require('express');
const { generateTree } = require('../controllers/treeController');
const router = express.Router();

router.get('/tree', generateTree);

module.exports = router;
