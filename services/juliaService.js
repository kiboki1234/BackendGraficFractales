const { julia } = require('../utils/julia');

exports.getJulia = (z, c, maxIter) => {
    return julia(parseFloat(z), parseFloat(c), parseInt(maxIter));
};