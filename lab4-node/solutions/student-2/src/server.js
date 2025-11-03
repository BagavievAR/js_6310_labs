import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { renderEmptyField, randomTetromino, RULES_TEXT } from "./utils/index.js";

const stateMap = new Map();

const STATE = {
  IDLE: "IDLE",
  AWAIT_ROWS: "AWAIT_ROWS",
  AWAIT_COLS: "AWAIT_COLS",
};

const MAX_ROWS = 50;
const MAX_COLS = 50;

function getState(chatId) {
  return stateMap.get(chatId) ?? { step: STATE.IDLE, startedAt: 0 };
}
function setState(chatId, next) {
  stateMap.set(chatId, { ...getState(chatId), ...next });
}
function clearState(chatId) {
  stateMap.delete(chatId);
}

function isIntInRange(text, min, max) {
  if (typeof text !== "string") return false;
  const n = Number(text.trim());
  return Number.isInteger(n) && n >= min && n <= max;
}

function explainLimits() {
  return `Введите целое число:
• Строк: 1..${MAX_ROWS}
• Столбцов: 1..${MAX_COLS}`;
}

export default function runServer() {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN is missing in .env");
    process.exit(1);
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/help$/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      [
        "Команды:",
        "/rules — правила",
        "/field — пустое поле 20×10",
        "/next_tetramino — случайная фигура",
        "/custom_field — пошаговое создание поля (FSM)",
        "/cancel — отменить пошаговую операцию",
      ].join("\n"),
      { disable_web_page_preview: true }
    );
  });

  bot.onText(/^\/rules$/, (msg) => {
    bot.sendMessage(msg.chat.id, RULES_TEXT, { disable_web_page_preview: true });
  });

  bot.onText(/^\/field$/, (msg) => {
    const field = renderEmptyField();
    bot.sendMessage(msg.chat.id, `\`\`\`\n${field}\n\`\`\``, { parse_mode: "MarkdownV2" });
  });

  bot.onText(/^\/next_tetramino$/, (msg) => {
    const t = randomTetromino();
    bot.sendMessage(
      msg.chat.id,
      `Следующая фигура: ${t.name}\n\`\`\`\n${t.preview}\n\`\`\``,
      { parse_mode: "MarkdownV2" }
    );
  });

  bot.onText(/^\/custom_field$/, (msg) => {
    const chatId = msg.chat.id;
    setState(chatId, { step: STATE.AWAIT_ROWS, rows: undefined, startedAt: Date.now() });
    bot.sendMessage(chatId, `Шаг 1/2. Введите количество строк.\n${explainLimits()}`);
  });

  bot.onText(/^\/cancel$/, (msg) => {
    const chatId = msg.chat.id;
    if (getState(chatId).step === STATE.IDLE) {
      bot.sendMessage(chatId, "Нечего отменять. Начните с /custom_field или используйте /help.");
      return;
    }
    clearState(chatId);
    bot.sendMessage(chatId, "Операция отменена. Состояние сброшено.");
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = (msg.text ?? "").trim();

    if (/^\/(rules|field|next_tetramino|custom_field|cancel|help)$/.test(text)) return;

    const state = getState(chatId);

    const TTL_MS = 5 * 60 * 1000;
    if (state.step !== STATE.IDLE && state.startedAt && Date.now() - state.startedAt > TTL_MS) {
      clearState(chatId);
      bot.sendMessage(chatId, "Сессия истекла. Начните заново: /custom_field");
      return;
    }

    switch (state.step) {
    case STATE.AWAIT_ROWS: {
      if (!isIntInRange(text, 1, MAX_ROWS)) {
        bot.sendMessage(chatId, `Некорректное значение строк. ${explainLimits()}`);
        return;
      }
      const rows = Number(text);
      setState(chatId, { step: STATE.AWAIT_COLS, rows });
      bot.sendMessage(chatId, `Шаг 2/2. Введите количество столбцов.\n${explainLimits()}`);
      return;
    }

    case STATE.AWAIT_COLS: {
      if (!isIntInRange(text, 1, MAX_COLS)) {
        bot.sendMessage(chatId, `Некорректное значение столбцов. ${explainLimits()}`);
        return;
      }
      const cols = Number(text);
      const rows = getState(chatId).rows ?? 20;

      try {
        const field = renderEmptyField(rows, cols);
        bot.sendMessage(chatId, `\`\`\`\n${field}\n\`\`\``, { parse_mode: "MarkdownV2" });
        clearState(chatId);
      } catch (e) {
        bot.sendMessage(chatId, `Ошибка: ${e.message ?? "не удалось построить поле"}`);
      }
      return;
    }

    case STATE.IDLE:
    default: {
      bot.sendMessage(
        chatId,
        "Команды: /rules, /field, /next_tetramino, /custom_field, /help, /cancel"
      );
      return;
    }
    }
  });

  bot.on("polling_error", (err) => {
    console.error("Polling error:", err?.message ?? err);
  });

  console.log("TetrisBattle bot started");
}
