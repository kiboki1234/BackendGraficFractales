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

// Rutas API
app.use('/api', mandelbrotRoutes);
app.use('/api', sierpinskiRoutes);
app.use('/api', kochRoutes);
app.use('/api', juliaRoutes);
app.use('/api', treeRoutes);

// Healthcheck (k6/Render)
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// 404 JSON para rutas no encontradas (útil para debug en front y k6)
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada', path: req.originalUrl });
});

const PORT = process.env.PORT || 5000;

// No levantar server durante tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
