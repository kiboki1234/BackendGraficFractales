const express = require('express');
const router = express.Router();
const { kochSegment } = require('../utils/koch');

// POST ligero: solo cuenta segmentos generados
// body: { p1:{x,y}, p2:{x,y}, depth }
router.post('/koch', (req, res) => {
  try {
    const { p1 = { x: 0, y: 0 }, p2 = { x: 100, y: 0 }, depth = 3 } = req.body || {};
    const segments = kochSegment(p1, p2, parseInt(depth));
    return res.json({ ok: true, segments_count: segments.length });
  } catch (e) {
    console.error('Error /api/koch POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
