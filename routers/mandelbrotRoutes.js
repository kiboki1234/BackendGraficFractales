// routers/mandelbrotRoutes.js
const express = require('express');
const router = express.Router();
const { mandelbrot } = require('../utils/mandelbrot');

// GET (para ramp GET o pruebas manuales en el navegador)
router.get('/mandelbrot', (req, res) => {
  const { real = -0.5, imag = 0, maxIter = 100 } = req.query;
  const it = mandelbrot({ real: parseFloat(real), imag: parseFloat(imag) }, parseInt(maxIter));
  return res.json({ ok: true, iterations: it });
});

// POST (para ramp/soak/spike por POST)
router.post('/mandelbrot', (req, res) => {
  try {
    const { maxIter = 100, c = { real: -0.5, imag: 0 } } = req.body || {};
    const it = mandelbrot(
      { real: parseFloat(c.real), imag: parseFloat(c.imag) },
      parseInt(maxIter)
    );
    return res.json({ ok: true, iterations: it });
  } catch (e) {
    console.error('Error /api/mandelbrot POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
