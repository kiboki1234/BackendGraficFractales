const { mandelbrot } = require('../utils/mandelbrot');

exports.getMandelbrot = (c, maxIter) => {
    return mandelbrot(parseFloat(c), parseInt(maxIter));
};