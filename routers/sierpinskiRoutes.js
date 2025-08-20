const express = require('express');
const router = express.Router();
const { sierpinski } = require('../utils/sierpinski');

// GET para el frontend:
// /api/sierpinski?points=JSON&depth=number
// points = [{x,y},{x,y},{x,y}]
router.get('/sierpinski', (req, res) => {
  try {
    const defPoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 86.6 }];
    let { points, depth = 3 } = req.query;

    const parsedPoints = points ? JSON.parse(points) : defPoints;
    const parsedDepth = parseInt(depth);

    if (!Array.isArray(parsedPoints) || parsedPoints.length !== 3) {
      return res.status(400).json({ ok: false, error: "Se esperan 3 puntos en 'points'." });
    }
    if (!Number.isFinite(parsedDepth) || parsedDepth < 0) {
      return res.status(400).json({ ok: false, error: "Depth inválido." });
    }

    const triangles = sierpinski(parsedPoints, parsedDepth);
    return res.json({ ok: true, fractal: 'sierpinski', result: triangles });
  } catch (e) {
    console.error('Error /api/sierpinski GET:', e);
    return res.status(500).json({ ok: false, error: e.message || 'internal_error' });
  }
});

// POST para k6 (compat):
// body: { depth, points:[{x,y},{x,y},{x,y}] }
router.post('/sierpinski', (req, res) => {
  try {
    const defPoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 86.6 }];
    const { depth = 3, points = defPoints } = req.body || {};
    const triangles = sierpinski(points, parseInt(depth));
    return res.json({ ok: true, fractal: 'sierpinski', triangles_count: triangles.length, triangles });
  } catch (e) {
    console.error('Error /api/sierpinski POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
