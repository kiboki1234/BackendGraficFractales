const { sierpinski } = require('../../utils/sierpinski');

const isPoint = (p) => p && typeof p.x === 'number' && typeof p.y === 'number';
const isTriangle = (t) => Array.isArray(t) && t.length === 3 && t.every(isPoint);

describe('utils/sierpinski', () => {
  const base = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }];

  test('depth 0 → 1 triángulo', () => {
    const res = sierpinski(base, 0);
    expect(res.length).toBe(1);
    expect(isTriangle(res[0])).toBe(true);
  });

  test('depth 1 → 3 triángulos', () => {
    const res = sierpinski(base, 1);
    expect(res.length).toBe(3);
    res.forEach((t) => expect(isTriangle(t)).toBe(true));
  });

  test('depth 2 → 9 triángulos; depth 3 → 27 triángulos', () => {
    expect(sierpinski(base, 2).length).toBe(9);
    expect(sierpinski(base, 3).length).toBe(27);
  });

  test('determinista para mismas entradas', () => {
    const a = sierpinski(base, 2);
    const b = sierpinski(base, 2);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});
