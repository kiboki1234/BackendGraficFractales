const express = require('express');
const router = express.Router();
const { treeFractal } = require('../utils/tree');

// GET para el frontend:
// /api/tree?start=JSON&length=number&angle=number&depth=number
router.get('/tree', (req, res) => {
  try {
    let { start, length = 100, angle = Math.PI / 2, depth = 4 } = req.query;

    const parsedStart = start ? JSON.parse(start) : { x: 0, y: 0 };
    const parsedLength = Number(length);
    const parsedAngle = Number(angle);
    const parsedDepth = parseInt(depth);

    if (!Number.isFinite(parsedLength) || !Number.isFinite(parsedAngle) ||
        !Number.isFinite(parsedDepth) || parsedDepth < 0) {
      return res.status(400).json({ ok: false, error: "Parámetros inválidos." });
    }

    const branches = treeFractal(parsedStart, parsedLength, parsedAngle, parsedDepth);
    return res.json({ ok: true, fractal: 'tree', result: branches });
  } catch (e) {
    console.error('Error /api/tree GET:', e);
    return res.status(500).json({ ok: false, error: e.message || 'internal_error' });
  }
});

// POST para k6 (compat):
// body: { start:{x,y}, length, angle, depth }
router.post('/tree', (req, res) => {
  try {
    const { start = { x: 0, y: 0 }, length = 100, angle = Math.PI / 2, depth = 4 } = req.body || {};
    const branches = treeFractal(start, Number(length), Number(angle), parseInt(depth));
    return res.json({ ok: true, fractal: 'tree', branches_count: branches.length, branches });
  } catch (e) {
    console.error('Error /api/tree POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
