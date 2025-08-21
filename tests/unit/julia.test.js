const { julia } = require('../../utils/julia');

describe('utils/julia', () => {
  test('z con |z|>2 sale en 0 iteraciones', () => {
    const z = { real: 3, imag: 0 };
    const c = { real: 0, imag: 0 };
    expect(julia(z, c, 50)).toBe(0);
  });

  test('z con |z|=2 entra al bucle al menos 1 vez', () => {
    const z = { real: 2, imag: 0 }; // |z| = 2
    const c = { real: 0, imag: 0 };
    const it = julia(z, c, 10);
    expect(it).toBeGreaterThanOrEqual(1);
    expect(it).toBeLessThanOrEqual(10);
  });

  test('c típico de Julia itera pero no excede maxIter', () => {
    const z = { real: 0, imag: 0 };
    const c = { real: -0.7, imag: 0.27015 };
    const it = julia(z, c, 30);
    expect(it).toBeGreaterThanOrEqual(0);
    expect(it).toBeLessThanOrEqual(30);
  });
});
