function treeFractal(start, length, angle, depth) {
    if (depth === 0) return []; // Si la profundidad es 0, no se generan más ramas

    const end = {
        x: start.x + length * Math.cos(angle),
        y: start.y - length * Math.sin(angle),
    };

    // Crear la estructura de una rama
    const branch = [start, end];

    // Calcular las nuevas ramas
    const leftBranch = treeFractal(end, length * 0.7, angle - Math.PI / 6, depth - 1);
    const rightBranch = treeFractal(end, length * 0.7, angle + Math.PI / 6, depth - 1);

    return [branch, ...leftBranch, ...rightBranch];
}

module.exports = { treeFractal };
