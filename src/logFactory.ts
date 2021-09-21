import { buffer } from "./buffer";
import { LogsWrapper } from "./logsWrapper";
import { FileLog } from "./fileLog";
import { originalCypressLog } from "./commands";
import { isTarget } from "./logUtils";

export function createLogsWrapper(options: Partial<Cypress.LogConfig>, logTypeConfig: Cypress.ILogTypeConfig) {
  const loggers: Cypress.Log[] = [];
  isTarget(logTypeConfig, "file") && loggers.push(createFileLog(options));
  isTarget(logTypeConfig, "window") && loggers.push(originalCypressLog(options));

  return new LogsWrapper(loggers, options);
}
function createFileLog(options: Partial<Cypress.LogConfig>): FileLog {
  const log = new FileLog(options);
  buffer.push(log);
  return log;
}
