// server.js
const express = require('express');
const cors = require('cors');

const mandelbrotRoutes = require('./routers/mandelbrotRoutes');
const sierpinskiRoutes = require('./routers/sierpinskiRoutes');
const kochRoutes = require('./routers/kochRoutes');
const juliaRoutes = require('./routers/juliaRoutes');
const treeRoutes = require('./routers/treeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas reales
app.use('/api', mandelbrotRoutes);
app.use('/api', sierpinskiRoutes);
app.use('/api', kochRoutes);
app.use('/api', juliaRoutes);
app.use('/api', treeRoutes);

// Healthcheck para CI/k6
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Ruta mínima para GET con x/y (compat con tu k6 actual)
app.get('/api/mandelbrot', (req, res) => {
  const { x, y, real, imag, maxIter = 100 } = req.query;
  const c = {
    real: parseFloat((real ?? x) ?? 0),
    imag: parseFloat((imag ?? y) ?? 0),
  };
  // si tienes utils/mandelbrot:
  const { mandelbrot } = require('./utils/mandelbrot');
  const it = mandelbrot(c, parseInt(maxIter));
  res.json({ ok: true, iterations: it });
});


const PORT = process.env.PORT || 5000;

// 👉 No levantes el server durante los tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Exporta app para supertest
module.exports = app;
