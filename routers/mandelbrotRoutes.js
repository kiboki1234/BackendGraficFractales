const express = require('express');
const router = express.Router();
const { mandelbrot } = require('../utils/mandelbrot');

// GET punto (sigue igual)
router.get('/mandelbrot', (req, res) => {
  const { real = -0.5, imag = 0, maxIter = 100 } = req.query;
  const c = { real: parseFloat(real), imag: parseFloat(imag) };
  const it = mandelbrot(c, parseInt(maxIter));
  return res.json({ ok: true, iterations: it });
});

// ✅ POST ligero (lo que esperan tus scripts k6)
router.post('/mandelbrot', (req, res) => {
  try {
    const { maxIter = 100, c = { real: -0.5, imag: 0 } } = req.body || {};
    const it = mandelbrot(c, parseInt(maxIter));
    return res.json({ ok: true, iterations: it });
  } catch (e) {
    console.error('Error /api/mandelbrot POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

// ✅ Grid 2D para el frontend
router.get('/mandelbrot-grid', (req, res) => {
  try {
    let { width = 300, height = 300, maxIter = 100,
          xmin = -2.5, xmax = 1, ymin = -1, ymax = 1 } = req.query;

    const W = parseInt(width), H = parseInt(height), MI = parseInt(maxIter);
    xmin = parseFloat(xmin); xmax = parseFloat(xmax);
    ymin = parseFloat(ymin); ymax = parseFloat(ymax);

    const data = Array.from({ length: H }, (_, j) => {
      const y = ymin + (j / (H - 1)) * (ymax - ymin);
      return Array.from({ length: W }, (_, i) => {
        const x = xmin + (i / (W - 1)) * (xmax - xmin);
        return mandelbrot({ real: x, imag: y }, MI);
      });
    });

    return res.json({ ok: true, data, maxIter: MI });
  } catch (e) {
    console.error('Error /api/mandelbrot-grid:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
