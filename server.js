const express = require('express');
const cors = require('cors');
const mandelbrotRoutes = require('./routers/mandelbrotRoutes');
const sierpinskiRoutes = require('./routers/sierpinskiRoutes');
const kochRoutes = require('./routers/kochRoutes');
const juliaRoutes = require('./routers/juliaRoutes');
const treeRoutes = require('./routers/treeRoutes');

const app = express();
app.use(cors()); // Habilitar CORS
app.use(express.json());

app.use('/api', mandelbrotRoutes);
app.use('/api', sierpinskiRoutes);
app.use('/api', kochRoutes);
app.use('/api', juliaRoutes);
app.use('/api', treeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;