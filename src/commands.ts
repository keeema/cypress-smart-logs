/// <reference path="../index.d.ts" />

import { enhanceOptions, pairLogType } from "./logUtils";
import { createLogsWrapper } from "./logFactory";
import "./defaults";

export const originalCypressLog = Cypress.log;
Cypress.log = (options: Partial<Cypress.LogConfig>): Cypress.Log => {
  const logType = pairLogType(options);
  const logTypeConfig: Cypress.ILogTypeConfig = Cypress.SmartLogs.LogTypes[logType];
  const enhancedOptions = enhanceOptions(options, logType, logTypeConfig);

  return createLogsWrapper(enhancedOptions, logTypeConfig);
};
