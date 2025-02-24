function mandelbrot(c, maxIter) {
    let z = { real: 0, imag: 0 };
    let n = 0;

    while (Math.sqrt(z.real * z.real + z.imag * z.imag) <= 2 && n < maxIter) {
        let real = z.real * z.real - z.imag * z.imag + c.real;
        let imag = 2 * z.real * z.imag + c.imag;
        z = { real, imag };
        n++;
    }
    return n;
}

module.exports = { mandelbrot };
