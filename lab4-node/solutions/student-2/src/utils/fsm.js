export function isIntInRange(text, min, max) {
  if (typeof text !== "string") return false;
  const n = Number(text.trim());
  return Number.isInteger(n) && n >= min && n <= max;
}

export function validateRows(text, maxRows) {
  if (!isIntInRange(text, 1, maxRows)) {
    return { ok: false, error: "Некорректное значение строк" };
  }
  return { ok: true, value: Number(text.trim()) };
}

export function validateCols(text, maxCols) {
  if (!isIntInRange(text, 1, maxCols)) {
    return { ok: false, error: "Некорректное значение столбцов" };
  }
  return { ok: true, value: Number(text.trim()) };
}

export function explainLimits(maxRows, maxCols) {
  return `Введите целое число:
• Строк: 1..${maxRows}
• Столбцов: 1..${maxCols}`;
}

export function buildFieldOrError(rows, cols, renderEmptyField) {
  try {
    const field = renderEmptyField(rows, cols);
    return { ok: true, field };
  } catch (e) {
    return { ok: false, error: e?.message ?? "не удалось построить поле" };
  }
}
