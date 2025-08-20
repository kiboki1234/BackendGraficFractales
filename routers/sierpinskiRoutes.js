const express = require('express');
const router = express.Router();
const { sierpinski } = require('../utils/sierpinski');

// POST ligero: devuelve cantidad de triángulos
// body: { depth, points:[{x,y},{x,y},{x,y}] }
router.post('/sierpinski', (req, res) => {
  try {
    const defPoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 86.6 }];
    const { depth = 3, points = defPoints } = req.body || {};
    const tris = sierpinski(points, parseInt(depth));
    return res.json({ ok: true, triangles_count: tris.length });
  } catch (e) {
    console.error('Error /api/sierpinski POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
