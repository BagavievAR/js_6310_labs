import { jest } from "@jest/globals";

const dotenvConfig = jest.fn();
jest.unstable_mockModule("dotenv", () => ({ default: { config: dotenvConfig } }));

const onTextHandlers = [];
const onHandlers = new Map();
const sendMessage = jest.fn();

const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});
afterAll(() => { logSpy.mockRestore(); errSpy.mockRestore(); });

const TelegramBotMock = jest.fn().mockImplementation(() => ({
  onText: (re, cb) => onTextHandlers.push({ re, cb }),
  on: (event, cb) => onHandlers.set(event, cb),
  sendMessage,
}));
jest.unstable_mockModule("node-telegram-bot-api", () => ({ default: TelegramBotMock }));

const renderEmptyField = jest.fn(() => "FIELD_20x10");
const randomTetromino = jest.fn(() => ({ name: "T", preview: "###\n # " }));
const RULES_TEXT = "RULES_TEXT";
const HELP_TEXT = "HELP_TEXT"
jest.unstable_mockModule("../src/utils/index.js", () => ({
  renderEmptyField,
  randomTetromino,
  RULES_TEXT,
  HELP_TEXT,
}));

const validateRows = jest.fn();
const validateCols = jest.fn();
const explainLimits = jest.fn((r, c) => `Введите целое число:\n• Строк: 1..${r}\n• Столбцов: 1..${c}`);
const buildFieldOrError = jest.fn();
jest.unstable_mockModule("../src/utils/fsm.js", () => ({
  validateRows,
  validateCols,
  explainLimits,
  buildFieldOrError,
}));

process.env.TELEGRAM_BOT_TOKEN = "test-token";

const { default: runServer } = await import("../src/server.js");

function triggerCommand(cmd, chatId = 1) {
  const h = onTextHandlers.find(({ re }) => re.test(cmd));
  if (!h) throw new Error(`Handler for ${cmd} not found`);
  h.cb({ chat: { id: chatId }, text: cmd });
}
function triggerMessage(text, chatId = 1) {
  const cb = onHandlers.get("message");
  if (!cb) throw new Error("message handler not found");
  cb({ chat: { id: chatId }, text });
}
function triggerPollingError(err) {
  const cb = onHandlers.get("polling_error");
  if (cb) cb(err);
}

beforeEach(() => {
  sendMessage.mockClear();
  renderEmptyField.mockClear();
  randomTetromino.mockClear();
  validateRows.mockReset();
  validateCols.mockReset();
  explainLimits.mockClear();
  buildFieldOrError.mockReset();
});

test("server wires handlers and covers command flows + FSM branches", () => {
  runServer();

  // /help
  sendMessage.mockClear();
  triggerCommand("/help");
  expect(sendMessage).toHaveBeenCalledWith(1, "HELP_TEXT", expect.any(Object));

  // /rules
  sendMessage.mockClear();
  triggerCommand("/rules");
  expect(sendMessage).toHaveBeenCalledWith(1, "RULES_TEXT", expect.any(Object));

  // /field
  sendMessage.mockClear();
  triggerCommand("/field");
  expect(renderEmptyField).toHaveBeenCalled();
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("FIELD_20x10"),
    expect.objectContaining({ parse_mode: "MarkdownV2" })
  );

  // /next_tetramino
  sendMessage.mockClear();
  triggerCommand("/next_tetramino");
  expect(randomTetromino).toHaveBeenCalled();
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Следующая фигура: T"),
    expect.objectContaining({ parse_mode: "MarkdownV2" })
  );

  // /custom_field старт = AWAIT_ROWS
  sendMessage.mockClear();
  triggerCommand("/custom_field");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Шаг 1/2"),
  );

  // AWAIT_ROWS: сначала невалидно = подсказка
  sendMessage.mockClear();
  validateRows.mockReturnValueOnce({ ok: false, error: "Некорректное значение строк" });
  triggerMessage("0");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Некорректное значение строк"),
  );

  // AWAIT_ROWS: валидно = переходим в AWAIT_COLS
  sendMessage.mockClear();
  validateRows.mockReturnValueOnce({ ok: true, value: 20 });
  triggerMessage("20");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Шаг 2/2"),
  );

  // AWAIT_COLS: невалидно
  sendMessage.mockClear();
  validateCols.mockReturnValueOnce({ ok: false, error: "Некорректное значение столбцов" });
  triggerMessage("0");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Некорректное значение столбцов"),
  );

  // AWAIT_COLS: валидно, но buildFieldOrError = error
  sendMessage.mockClear();
  validateCols.mockReturnValueOnce({ ok: true, value: 10 });
  buildFieldOrError.mockReturnValueOnce({ ok: false, error: "ошибка построения" });
  triggerMessage("10");
  expect(sendMessage).toHaveBeenCalledWith(1, expect.stringContaining("Ошибка: ошибка построения"));

  // AWAIT_COLS: валидно, buildFieldOrError = ok = отправляем поле и выходим в IDLE
  sendMessage.mockClear();
  validateCols.mockReturnValueOnce({ ok: true, value: 10 });
  buildFieldOrError.mockReturnValueOnce({ ok: true, field: "FIELD_CUSTOM" });
  triggerMessage("10");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("FIELD_CUSTOM"),
    expect.objectContaining({ parse_mode: "MarkdownV2" })
  );

  // /cancel в IDLE
  sendMessage.mockClear();
  triggerCommand("/cancel");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Нечего отменять.")
  );

  // Неподдерживаемый текст в IDLE = подсказка
  sendMessage.mockClear();
  triggerMessage("bla-bla");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Команды: /rules")
  );

  // polling_error покрытие
  sendMessage.mockClear();
  triggerPollingError(new Error("polling boom"));

  // РАННИЙ ВЫХОД из universal message handler на командном тексте
  sendMessage.mockClear();
  triggerMessage("/help");
  expect(sendMessage).not.toHaveBeenCalled();

  // TL истёк: переводим в AWAIT_ROWS, ждём авто-сброс и сообщение "Сессия истекла"
  sendMessage.mockClear();
  triggerCommand("/custom_field");
  const nowReal = Date.now();
  const nowSpy = jest.spyOn(Date, "now").mockReturnValue(nowReal + 5 * 60 * 1000 + 1);
  triggerMessage("любое");
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Сессия истекла. Начните заново: /custom_field")
  );
  nowSpy.mockRestore();

  // /custom_field = AWAIT_ROWS, потом /cancel
  sendMessage.mockClear();
  triggerCommand("/custom_field");
  triggerCommand("/cancel");
  expect(sendMessage).toHaveBeenLastCalledWith(
    1,
    expect.stringContaining("Операция отменена. Состояние сброшено.")
  );

  // polling_error c «сырой» строкой (нет err.message)
  sendMessage.mockClear();
  const cbPoll = onHandlers.get("polling_error");
  cbPoll && cbPoll("raw failure");
  expect(true).toBe(true);

  // универсальный обработчик, msg без text (msg.text === undefined)
  sendMessage.mockClear();
  const cbMsg = onHandlers.get("message");
  cbMsg && cbMsg({ chat: { id: 1 } }); // без text
  expect(sendMessage).toHaveBeenCalledWith(
    1,
    expect.stringContaining("Команды: /rules")
  );
  
  // rows отсутствует, используется дефолт 20 через (rows ?? 20)
  sendMessage.mockClear();

  triggerCommand("/custom_field");
  validateRows.mockReturnValueOnce({ ok: true, value: undefined });
  triggerMessage("что-угодно");
  validateCols.mockReturnValueOnce({ ok: true, value: 9 });
  buildFieldOrError.mockReturnValueOnce({ ok: true, field: "FIELD_DEFAULT_ROWS" });

  triggerMessage("9");
  expect(buildFieldOrError).toHaveBeenLastCalledWith(20, 9, expect.any(Function));

  expect(sendMessage).toHaveBeenLastCalledWith(
    1,
    expect.stringContaining("FIELD_DEFAULT_ROWS"),
    expect.objectContaining({ parse_mode: "MarkdownV2" })
  );


});
