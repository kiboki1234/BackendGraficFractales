function kochPoints(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    const a = { x: p1.x + dx / 3, y: p1.y + dy / 3 };
    const d = { x: p1.x + (2 * dx) / 3, y: p1.y + (2 * dy) / 3 };

    const angle = Math.PI / 3;
    const b = {
        x: (a.x + d.x) / 2 - (Math.sqrt(3) / 2) * (d.y - a.y),
        y: (a.y + d.y) / 2 + (Math.sqrt(3) / 2) * (d.x - a.x),
    };

    return [a, b, d];
}

function kochSegment(p1, p2, depth) {
    if (depth > 10) {  
        console.warn(`Profundidad demasiado alta (${depth}), reduciendo a 10.`);
        depth = 10;
    }

    const queue = [[p1, p2]]; // Usamos una cola en lugar de recursión profunda
    let result = [];

    for (let i = 0; i < depth; i++) {
        let newSegments = [];
        queue.forEach(([p1, p2]) => {
            const [a, b, d] = kochPoints(p1, p2);
            newSegments.push([p1, a], [a, b], [b, d], [d, p2]);
        });
        queue.splice(0, queue.length, ...newSegments);
    }

    return queue;
}

function generateKochQuadrants(center, size, depth) {
    const half = size / 2;

    // Coordenadas de inicio y fin para cada cuadrante
    const topLeft = { x: center.x - half, y: center.y - half };
    const topRight = { x: center.x + half, y: center.y - half };
    const bottomLeft = { x: center.x - half, y: center.y + half };
    const bottomRight = { x: center.x + half, y: center.y + half };

    let segments = [];
    // Generar la curva en cada cuadrante
    segments.push(...kochSegment(topLeft, topRight, depth));  // Superior
    segments.push(...kochSegment(topRight, bottomRight, depth)); // Derecha
    segments.push(...kochSegment(bottomRight, bottomLeft, depth)); // Inferior
    segments.push(...kochSegment(bottomLeft, topLeft, depth)); // Izquierda

    return segments;
}

module.exports = { kochSegment, generateKochQuadrants };
