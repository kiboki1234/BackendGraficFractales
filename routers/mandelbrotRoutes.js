const express = require('express');
const { generateMandelbrot } = require('../controllers/mandelbrotController'); // ✅ Importa correctamente

const router = express.Router();

router.get('/mandelbrot', generateMandelbrot); // ✅ Usa la función correctamente

module.exports = router;
