Cypress.SmartLogs = {
  Config: {
    folder: Cypress.config("smart-logs-folder") || "cypress/smart-logs",
    timestamp: Cypress.config("smart-logs-timestamp") || "datetime",
    fileSave: Cypress.config("smart-logs-file-save") || "failed",
  },
  LogTypes: {} as Cypress.ILogTypes,
  setLogType(type: keyof Cypress.ILogTypes, config: Cypress.ILogTypeConfig): void {
    this.LogTypes[type] = config;
  },
};
Cypress.SmartLogs.setLogType("INFO", {
  target: {
    openMode: ["file", "window"],
    runMode: ["file"],
  },
});
Cypress.SmartLogs.setLogType("ASSERT", {
  target: {
    openMode: ["file", "window"],
    runMode: ["file"],
  },
  pairedCommands: ["assert"],
});
