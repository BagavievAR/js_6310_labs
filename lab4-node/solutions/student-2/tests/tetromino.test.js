import { randomTetromino, TETROMINOES } from "../src/utils";

describe("randomTetromino", () => {
  test("returns only classic names", () => {
    const names = new Set(TETROMINOES.map((t) => t.name));
    for (let i = 0; i < 50; i++) {
      expect(names).toContain(randomTetromino(i / 50).name);
    }
  });

  const cases = [
    { rng: 0,           expected: "I" },
    { rng: (1.5)/7,     expected: "O" },
    { rng: (2.5)/7,     expected: "T" },
    { rng: (3.5)/7,     expected: "S" },
    { rng: (4.5)/7,     expected: "Z" },
    { rng: (5.5)/7,     expected: "J" },
    { rng: 0.999,     expected: "L" }
  ];

  test.each(cases)("rng=%p -> %s", ({ rng, expected }) => {
    expect(randomTetromino(rng).name).toBe(expected);
  });

  test("works with default rng (Math.random())", () => {
    const t = randomTetromino();
    expect(typeof t.name).toBe("string");
    expect(t.name).toMatch(/^[IOTZJSL]$/);
  });

  test("throws on invalid rng values", () => {
    expect(() => randomTetromino(-0.1)).toThrow("rng must be >= 0");
    expect(() => randomTetromino(1)).toThrow("rng must be < 1");
    expect(() => randomTetromino("")).toThrow("rng must be a number");
    expect(() => randomTetromino(null)).toThrow("rng must be a number");
    expect(() => randomTetromino(NaN)).toThrow("rng must be a number");
    expect(() => randomTetromino(Infinity)).toThrow("rng must be finite");
    expect(() => randomTetromino(-Infinity)).toThrow("rng must be finite");
  });
});

  