const { treeFractal } = require('../utils/tree');

exports.generateTree = (req, res) => {
    try {
        let { start, length, angle, depth } = req.query;
        depth = parseInt(depth);
        length = parseFloat(length);
        angle = parseFloat(angle);
        start = JSON.parse(start);

        if (isNaN(depth) || depth < 0 || depth > 100) {
            return res.status(400).json({ error: "Profundidad debe estar entre 0 y 12." });
        }

        const result = treeFractal(start, length, angle, depth);
        res.json({ fractal: "tree", result });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
