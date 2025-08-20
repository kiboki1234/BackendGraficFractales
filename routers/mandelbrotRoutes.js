const express = require('express');
const router = express.Router();
const { mandelbrot } = require('../utils/mandelbrot');

// GET con query (front/k6):
// /api/mandelbrot?real=&imag=&maxIter=
router.get('/mandelbrot', (req, res) => {
  try {
    const { real = -0.5, imag = 0, maxIter = 100 } = req.query;
    const c = { real: parseFloat(real), imag: parseFloat(imag) };
    const it = mandelbrot(c, parseInt(maxIter));
    return res.json({ ok: true, fractal: 'mandelbrot', iterations: it });
  } catch (e) {
    console.error('Error /api/mandelbrot GET:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

// POST opcional (body JSON):
// { maxIter, c:{real,imag} }
router.post('/mandelbrot', (req, res) => {
  try {
    const { maxIter = 100, c = { real: -0.5, imag: 0 } } = req.body || {};
    const it = mandelbrot(c, parseInt(maxIter));
    return res.json({ ok: true, fractal: 'mandelbrot', iterations: it });
  } catch (e) {
    console.error('Error /api/mandelbrot POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
