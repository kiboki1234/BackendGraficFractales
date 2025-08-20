const express = require('express');
const router = express.Router();
const { treeFractal } = require('../utils/tree');

// POST ligero: devuelve cantidad de ramas
// body: { start:{x,y}, length, angle, depth }
router.post('/tree', (req, res) => {
  try {
    const { start = { x: 0, y: 0 }, length = 100, angle = Math.PI / 2, depth = 4 } = req.body || {};
    const branches = treeFractal(start, Number(length), Number(angle), parseInt(depth));
    return res.json({ ok: true, branches_count: branches.length });
  } catch (e) {
    console.error('Error /api/tree POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
