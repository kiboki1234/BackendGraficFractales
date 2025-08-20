const { mandelbrot } = require('../../utils/mandelbrot');

describe('utils/mandelbrot', () => {
  test('punto fuera (3+3i) escapa rápido', () => {
    const c = { real: 3, imag: 3 };
    expect(mandelbrot(c, 100)).toBeLessThan(5);
  });

  test('c=0 nunca escapa → devuelve maxIter', () => {
    const c = { real: 0, imag: 0 };
    expect(mandelbrot(c, 40)).toBe(40);
  });

  test('punto cercano al borde no excede maxIter', () => {
    const c = { real: -0.75, imag: 0.1 };
    const it = mandelbrot(c, 50);
    expect(it).toBeGreaterThanOrEqual(0);
    expect(it).toBeLessThanOrEqual(50);
  });
});
