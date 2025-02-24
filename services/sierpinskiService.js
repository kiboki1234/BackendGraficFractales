const { sierpinski } = require('../utils/sierpinski');

exports.getSierpinski = (points, depth) => {
    return sierpinski(JSON.parse(points), parseInt(depth));
};