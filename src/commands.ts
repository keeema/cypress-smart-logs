/// <reference types="../index" />

import { enhanceOptions } from "./logUtils";
import { createLogsWrapper } from "./logFactory";

export const originalCypressLog = Cypress.log;

Cypress.SmartLog = {
  Config: { timestamp: "datetime" },
  LogTypes: {
    INFO: { target: ["file", "window"] },
  } as Cypress.ILogTypes,
  setLogType(type: keyof Cypress.ILogTypes, config: Cypress.ILogTypeConfig): void {
    this.LogTypes[type] = config;
  },
};

Cypress.log = (options: Partial<Cypress.ILogConfig>): Cypress.Log => {
  const logType: keyof Cypress.ILogTypes = options.logType || "INFO";
  const logTypeConfig: Cypress.ILogTypeConfig = Cypress.SmartLog.LogTypes[logType];
  const enhancedOptions = enhanceOptions(options, logType, logTypeConfig);

  return createLogsWrapper(enhancedOptions, logTypeConfig);
};
