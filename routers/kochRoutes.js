const express = require('express');
const router = express.Router();
const { kochSegment, generateKochQuadrants } = require('../utils/koch');

// GET para el frontend:
// /api/koch?center=JSON&size=number&depth=number
router.get('/koch', (req, res) => {
  try {
    let { center, size, depth } = req.query;
    if (!center) return res.status(400).json({ ok: false, error: "Falta 'center' en query" });

    const parsedCenter = JSON.parse(center);
    const parsedSize = parseFloat(size);
    const parsedDepth = parseInt(depth);

    if (!Number.isFinite(parsedSize) || !Number.isFinite(parsedDepth) || parsedDepth < 0) {
      return res.status(400).json({ ok: false, error: "Valores inválidos para 'size' o 'depth'." });
    }

    const segments = generateKochQuadrants(parsedCenter, parsedSize, parsedDepth);
    return res.json({ ok: true, fractal: 'koch', result: segments }); // el front usa "result"
  } catch (e) {
    console.error('Error /api/koch GET:', e);
    return res.status(500).json({ ok: false, error: e.message || 'internal_error' });
  }
});

// POST para k6 (compat):
// body: { p1:{x,y}, p2:{x,y}, depth }
router.post('/koch', (req, res) => {
  try {
    const { p1 = { x: 0, y: 0 }, p2 = { x: 100, y: 0 }, depth = 3 } = req.body || {};
    const parsedDepth = parseInt(depth);
    const segments = kochSegment(p1, p2, parsedDepth);
    // Para no romper nada, mantenemos segments_count, y además enviamos segments completos
    return res.json({ ok: true, fractal: 'koch', segments_count: segments.length, segments });
  } catch (e) {
    console.error('Error /api/koch POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
