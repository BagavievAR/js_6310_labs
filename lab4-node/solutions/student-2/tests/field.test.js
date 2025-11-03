import { renderEmptyField } from "../src/utils";

describe("renderEmptyField", () => {
  test("renders 20x10 by default", () => {
    const f = renderEmptyField();
    const rows = f.split("\n");
    expect(rows).toHaveLength(20);
    rows.forEach((r) => expect(r).toHaveLength(10));
  });

  test("renders custom size", () => {
    const f = renderEmptyField(2, 3, "*");
    expect(f).toBe("***\n***");
  });

  test("renders minimum size", () => {
    const f = renderEmptyField(1, 1, "*");
    expect(f).toBe("*");
  });

  test("renders maximum size", () => {
    const f = renderEmptyField(50, 50, "*");
    const rows = f.split("\n");
    expect(rows).toHaveLength(50);
    rows.forEach((r) => expect(r).toHaveLength(50));
  });

  test("throws on invalid size", () => {
    expect(() => renderEmptyField(0, 10)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(10, 0)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(0, 0)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(-1, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, -1)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(-1, -1)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(null, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, null)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(null, null)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField('', 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, '')).toThrow(/Invalid field size/);
    expect(() => renderEmptyField('', '')).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(51, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, 51)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(51, 51)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(NaN, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, NaN)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(NaN, NaN)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(Infinity, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, Infinity)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(Infinity, Infinity)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(-Infinity, 5)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(5, -Infinity)).toThrow(/Invalid field size/);
    expect(() => renderEmptyField(-Infinity, -Infinity)).toThrow(/Invalid field size/);
  });

  test("throws on invalid cell", () => {
    expect(() => renderEmptyField(3, 3, "")).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, "AB")).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, 123)).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, null)).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, NaN)).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, Infinity)).toThrow(/Invalid cell value/);
    expect(() => renderEmptyField(3, 3, -Infinity)).toThrow(/Invalid cell value/);
  });
});
