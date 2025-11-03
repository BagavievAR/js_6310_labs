export function renderEmptyField(rows = 20, cols = 10, cell = "·") {
  const MAX_ROWS = 50;
  const MAX_COLS = 50;
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0 || rows > MAX_ROWS || cols > MAX_COLS) {
    throw new Error(`Invalid field size: rows/cols must be integers in range 1..${MAX_COLS}`);
  }
  if (typeof cell !== "string" || cell.length !== 1) {
    throw new Error("Invalid cell value: must be a single character string");
  }
  const line = cell.repeat(cols);
  return Array.from({ length: rows }, () => line).join("\n");
}
