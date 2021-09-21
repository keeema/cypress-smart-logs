/// <reference path="./index.d.ts" />

import "../../commands";

Cypress.SmartLogs.setLogType("WARNING", {
  format: "*",
  target: { openMode: ["file", "window"], runMode: ["file"] },
  pairedCommands: ["custom"],
});

Cypress.Commands.add("custom", () => {
  Cypress.log({});
});
