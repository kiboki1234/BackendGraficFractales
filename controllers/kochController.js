const { generateKochQuadrants } = require('../utils/koch');

exports.generateKoch = (req, res) => {
    try {
        let { center, size, depth } = req.query;
        center = JSON.parse(center);
        size = parseFloat(size);
        depth = parseInt(depth);

        if (isNaN(size) || isNaN(depth) || depth < 0) {
            return res.status(400).json({ error: "Valores inválidos para el fractal." });
        }

        const result = generateKochQuadrants(center, size, depth);
        res.json({ fractal: "koch", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
