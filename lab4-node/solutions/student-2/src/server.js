import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { renderEmptyField, randomTetromino, RULES_TEXT, HELP_TEXT } from "./utils/index.js";
import {
  validateRows,
  validateCols,
  explainLimits,
  buildFieldOrError,
} from "./utils/fsm.js";

const stateMap = new Map();
const STATE = { IDLE: "IDLE", AWAIT_ROWS: "AWAIT_ROWS", AWAIT_COLS: "AWAIT_COLS" };
const MAX_ROWS = 50;
const MAX_COLS = 50;

function getState(chatId) { return stateMap.get(chatId) ?? { step: STATE.IDLE, startedAt: 0 }; }
function setState(chatId, next) { stateMap.set(chatId, { ...getState(chatId), ...next }); }
function clearState(chatId) { stateMap.delete(chatId); }

export default function runServer() {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) { console.error("TELEGRAM_BOT_TOKEN is missing in .env"); process.exit(1); }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/help$/, (msg) => {
    bot.sendMessage(msg.chat.id, HELP_TEXT, { disable_web_page_preview: true });
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
    bot.sendMessage(chatId, `Шаг 1/2. Введите количество строк.\n${explainLimits(MAX_ROWS, MAX_COLS)}`);
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
      const r = validateRows(text, MAX_ROWS);
      if (!r.ok) { bot.sendMessage(chatId, `${r.error}. ${explainLimits(MAX_ROWS, MAX_COLS)}`); return; }
      setState(chatId, { step: STATE.AWAIT_COLS, rows: r.value });
      bot.sendMessage(chatId, `Шаг 2/2. Введите количество столбцов.\n${explainLimits(MAX_ROWS, MAX_COLS)}`);
      return;
    }

    case STATE.AWAIT_COLS: {
      const v = validateCols(text, MAX_COLS);
      if (!v.ok) { bot.sendMessage(chatId, `${v.error}. ${explainLimits(MAX_ROWS, MAX_COLS)}`); return; }
      const rows = getState(chatId).rows ?? 20;
      const res = buildFieldOrError(rows, v.value, renderEmptyField);
      if (!res.ok) { bot.sendMessage(chatId, `Ошибка: ${res.error}`); return; }
      bot.sendMessage(chatId, `\`\`\`\n${res.field}\n\`\`\``, { parse_mode: "MarkdownV2" });
      clearState(chatId);
      return;
    }

    case STATE.IDLE:
    default:
      bot.sendMessage(chatId, "Команды: /rules, /field, /next_tetramino, /custom_field, /help, /cancel");
      return;
    }
  });

  bot.on("polling_error", (err) => {
    console.error("Polling error:", err?.message ?? err);
  });

  console.log("TetrisBattle bot started");
}
