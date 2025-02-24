const { julia } = require('../utils/julia');

exports.generateJulia = (req, res) => {
    const { width, height, realC, imagC, maxIter } = req.query;
    
    if (!width || !height || !realC || !imagC || !maxIter) {
        return res.status(400).json({ error: "Parámetros inválidos" });
    }

    try {
        const fractal = [];
        const minX = -2, maxX = 2;
        const minY = -2, maxY = 2;
        const c = { real: parseFloat(realC), imag: parseFloat(imagC) };
        
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                let real = minX + (x / width) * (maxX - minX);
                let imag = minY + (y / height) * (maxY - minY);
                row.push(julia({ real, imag }, c, parseInt(maxIter)));
            }
            fractal.push(row);
        }
        res.json({ fractal: "julia", data: fractal });
    } catch (error) {
        console.error("Error generando Julia Set:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
