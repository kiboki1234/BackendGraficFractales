const { mandelbrot } = require('../utils/mandelbrot');

exports.generateMandelbrot = (req, res) => {
    const { width, height, maxIter } = req.query;
    
    if (!width || !height || !maxIter) {
        return res.status(400).json({ error: "Parámetros inválidos" });
    }

    try {
        const fractal = [];
        const minX = -2.5, maxX = 1;
        const minY = -1, maxY = 1;
        
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                let real = minX + (x / width) * (maxX - minX);
                let imag = minY + (y / height) * (maxY - minY);
                row.push(mandelbrot({ real, imag }, parseInt(maxIter)));
            }
            fractal.push(row);
        }
        res.json({ fractal: "mandelbrot", data: fractal });
    } catch (error) {
        console.error("Error generando Mandelbrot:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
