const express = require('express');
const router = express.Router();
const { julia } = require('../utils/julia');
const { generateJulia } = require('../controllers/juliaController');

// Ruta con tu controller existente (ojo: mayúscula en /Julia)
router.get('/Julia', generateJulia);

// GET ligero (rápido para front o k6 con query):
// /api/julia?zr=&zi=&x=&y=&cr=&ci=&realC=&imagC=&maxIter=
router.get('/julia', (req, res) => {
  const { zr, zi, x, y, cr, ci, realC, imagC, maxIter = 100 } = req.query;
  const z = { real: parseFloat(zr ?? x ?? 0.1), imag: parseFloat(zi ?? y ?? 0.1) };
  const c = { real: parseFloat(cr ?? realC ?? -0.7), imag: parseFloat(ci ?? imagC ?? 0.27015) };

  try {
    const it = julia(z, c, parseInt(maxIter));
    return res.json({ ok: true, fractal: 'julia', iterations: it });
  } catch (e) {
    console.error('Error /api/julia GET:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

// POST (compat con k6):
// body: { maxIter, z:{real,imag}, c:{real,imag} }
router.post('/julia', (req, res) => {
  try {
    const { maxIter = 100, z = { real: 0.1, imag: 0.1 }, c = { real: -0.7, imag: 0.27015 } } = req.body || {};
    const it = julia(z, c, parseInt(maxIter));
    return res.json({ ok: true, fractal: 'julia', iterations: it });
  } catch (e) {
    console.error('Error /api/julia POST:', e);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
