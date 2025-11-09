import { jest } from "@jest/globals";

const configMock = jest.fn();
jest.unstable_mockModule("dotenv", () => ({ default: { config: configMock } }));

const TelegramBotMock = jest.fn().mockImplementation(() => ({
  onText: jest.fn(),
  on: jest.fn(),
  sendMessage: jest.fn(),
}));
jest.unstable_mockModule("node-telegram-bot-api", () => ({ default: TelegramBotMock }));

process.env.TELEGRAM_BOT_TOKEN = "test-token";

const { default: runServer } = await import("../src/server.js");

test("runServer initializes TelegramBot with polling and reads .env", () => {
  runServer();
  expect(configMock).toHaveBeenCalled();
  expect(TelegramBotMock).toHaveBeenCalledWith("test-token", { polling: true });
});
