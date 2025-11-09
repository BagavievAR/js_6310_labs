import { jest } from "@jest/globals";

const configMock = jest.fn();
jest.unstable_mockModule("dotenv", () => ({ default: { config: configMock } }));

jest.unstable_mockModule("node-telegram-bot-api", () => ({ default: jest.fn() }));

const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});
afterAll(() => errSpy.mockRestore());

test("runServer exits with code 1 when TELEGRAM_BOT_TOKEN is missing", async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;

  const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => { throw new Error("exit"); });

  const { default: runServer } = await import("../src/server.js");

  expect(() => runServer()).toThrow("exit");
  expect(configMock).toHaveBeenCalled();
  expect(errSpy).toHaveBeenCalledWith("TELEGRAM_BOT_TOKEN is missing in .env");
  expect(exitSpy).toHaveBeenCalledWith(1);

  exitSpy.mockRestore();
});
