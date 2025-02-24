const { kochSegment } = require('../utils/koch');

exports.getKoch = (p1, p2, depth) => {
    return kochSegment(JSON.parse(p1), JSON.parse(p2), parseInt(depth));
};