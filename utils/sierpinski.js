function midpoint(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}

function sierpinski(points, depth) {
    if (depth === 0) return [points]; // Retornar el triángulo base
    
    const [a, b, c] = points;

    const mid1 = midpoint(a, b);
    const mid2 = midpoint(b, c);
    const mid3 = midpoint(a, c);

    return [
        ...sierpinski([a, mid1, mid3], depth - 1),  // Triángulo superior
        ...sierpinski([mid1, b, mid2], depth - 1),  // Triángulo inferior izquierdo
        ...sierpinski([mid3, mid2, c], depth - 1)   // Triángulo inferior derecho
    ];
}

module.exports = { sierpinski };
