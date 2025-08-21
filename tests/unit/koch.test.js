const { kochSegment, generateKochQuadrants } = require('../../utils/koch');

describe('utils/koch', () => {
  test('kochSegment con depth 0 devuelve 1 segmento', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 90, y: 0 };
    const segs = kochSegment(p1, p2, 0);
    expect(Array.isArray(segs)).toBe(true);
    expect(segs.length).toBe(1);
    expect(Array.isArray(segs[0])).toBe(true);
    expect(segs[0].length).toBe(24);
  });

  test('kochSegment con depth 2 genera múltiples segmentos (sin desbordar)', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 90, y: 0 };
    const segs = kochSegment(p1, p2, 2);
    expect(segs.length).toBeGreaterThan(4);
  });

  test('generateKochQuadrants depth 1 crea segmentos en los 4 lados', () => {
    const center = { x: 0, y: 0 };
    const segs = generateKochQuadrants(center, 90, 1);
    expect(Array.isArray(segs)).toBe(true);
    expect(segs.length).toBeGreaterThan(0);
  });
});
