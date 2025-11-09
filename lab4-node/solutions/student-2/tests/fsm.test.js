import { jest } from "@jest/globals";
import {
  isIntInRange,
  validateRows,
  validateCols,
  explainLimits,
  buildFieldOrError,
} from "../src/utils/fsm.js";

describe("FSM utils: isIntInRange", () => {
  test("returns true for integers within range", () => {
    expect(isIntInRange("1", 1, 50)).toBe(true);
    expect(isIntInRange("  10  ", 1, 50)).toBe(true);
    expect(isIntInRange("50", 1, 50)).toBe(true);
  });

  test("returns false for non-strings or not integers", () => {
    expect(isIntInRange(10, 1, 50)).toBe(false);
    expect(isIntInRange("10.5", 1, 50)).toBe(false);
    expect(isIntInRange("abc", 1, 50)).toBe(false);
    expect(isIntInRange("", 1, 50)).toBe(false);
  });

  test("returns false for out-of-range integers", () => {
    expect(isIntInRange("0", 1, 50)).toBe(false);
    expect(isIntInRange("51", 1, 50)).toBe(false);
    expect(isIntInRange("-1", 1, 50)).toBe(false);
  });
});

describe("FSM utils: validateRows / validateCols", () => {
  const MAX_ROWS = 50;
  const MAX_COLS = 50;

  test("validateRows: ok on boundaries and middle", () => {
    expect(validateRows("1", MAX_ROWS)).toEqual({ ok: true, value: 1 });
    expect(validateRows("25", MAX_ROWS)).toEqual({ ok: true, value: 25 });
    expect(validateRows("50", MAX_ROWS)).toEqual({ ok: true, value: 50 });
  });

  test("validateRows: error on invalid input", () => {
    expect(validateRows("0", MAX_ROWS)).toEqual({ ok: false, error: "Некорректное значение строк" });
    expect(validateRows("51", MAX_ROWS)).toEqual({ ok: false, error: "Некорректное значение строк" });
    expect(validateRows("1.5", MAX_ROWS)).toEqual({ ok: false, error: "Некорректное значение строк" });
    expect(validateRows("abc", MAX_ROWS)).toEqual({ ok: false, error: "Некорректное значение строк" });
  });

  test("validateCols: ok on boundaries and middle", () => {
    expect(validateCols("1", MAX_COLS)).toEqual({ ok: true, value: 1 });
    expect(validateCols("10", MAX_COLS)).toEqual({ ok: true, value: 10 });
    expect(validateCols("50", MAX_COLS)).toEqual({ ok: true, value: 50 });
  });

  test("validateCols: error on invalid input", () => {
    expect(validateCols("0", MAX_COLS)).toEqual({ ok: false, error: "Некорректное значение столбцов" });
    expect(validateCols("51", MAX_COLS)).toEqual({ ok: false, error: "Некорректное значение столбцов" });
    expect(validateCols("3.14", MAX_COLS)).toEqual({ ok: false, error: "Некорректное значение столбцов" });
    expect(validateCols("xyz", MAX_COLS)).toEqual({ ok: false, error: "Некорректное значение столбцов" });
  });
});

describe("FSM utils: explainLimits", () => {
  test("returns hint text with provided limits", () => {
    const txt = explainLimits(40, 30);
    expect(txt).toContain("Строк: 1..40");
    expect(txt).toContain("Столбцов: 1..30");
  });
});

describe("FSM utils: buildFieldOrError", () => {
  test("returns ok=true and field when render succeeds", () => {
    const mockRender = jest.fn().mockReturnValue("**FIELD**");
    const res = buildFieldOrError(20, 10, mockRender);
    expect(mockRender).toHaveBeenCalledWith(20, 10);
    expect(res).toEqual({ ok: true, field: "**FIELD**" });
  });

  test("returns ok=false with message when render throws Error(message)", () => {
    const mockRender = jest.fn(() => { throw new Error("Invalid field size"); });
    const res = buildFieldOrError(999, 999, mockRender);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Invalid field size");
  });

  test("returns ok=false with fallback message when render throws non-Error", () => {
    const mockRender = jest.fn(() => { throw "boom"; });  
    const res = buildFieldOrError(5, 5, mockRender);
    expect(res.ok).toBe(false);
    expect(res.error).toBe("не удалось построить поле");
  });
});
