const { sierpinski } = require('../utils/sierpinski');

exports.generateSierpinski = (req, res) => {
    try {
        const { points, depth } = req.query;
        const parsedDepth = parseInt(depth);
        
        if (isNaN(parsedDepth) || parsedDepth < 0 || parsedDepth > 8) {
            return res.status(400).json({ error: "Profundidad debe estar entre 0 y 8." });
        }

        const result = sierpinski(JSON.parse(points), parsedDepth);
        res.json({
            fractal: "sierpinski",
            result
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
