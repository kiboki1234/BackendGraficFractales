// routers/mandelbrotRoutes.js
const express = require('express');
const router = express.Router();
const { mandelbrot } = require('../utils/mandelbrot');

// GET: compat con k6 vía querystring
router.get('/mandelbrot', (req, res) => {
  const { real = -0.5, imag = 0, maxIter = 100 } = req.query;
  const c = { real: parseFloat(real), imag: parseFloat(imag) };
  const it = mandelbrot(c, parseInt(maxIter));
  return res.json({ ok: true, iterations: it });
});

// POST: opcional si quieres probar con body JSON
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

module.exports = router;
