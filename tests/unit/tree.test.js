const { treeFractal } = require('../../utils/tree');

describe('utils/treeFractal', () => {
  test('depth 0 → []', () => {
    const res = treeFractal({ x: 0, y: 0 }, 100, Math.PI/2, 0);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });

  test('depth 1 → 1 rama', () => {
    const res = treeFractal({ x: 0, y: 0 }, 100, 0, 1);
    expect(res.length).toBe(1);
  });

  test('depth 3 → 2^3 − 1 = 7 ramas', () => {
    const res = treeFractal({ x: 0, y: 0 }, 50, Math.PI/4, 3);
    expect(res.length).toBe(7);
  });

  test('las ramas tienen puntos válidos', () => {
    const res = treeFractal({ x: 0, y: 0 }, 60, 0, 2);
    for (const [start, end] of res) {
      expect(start).toHaveProperty('x');
      expect(start).toHaveProperty('y');
      expect(end).toHaveProperty('x');
      expect(end).toHaveProperty('y');
    }
  });
});
