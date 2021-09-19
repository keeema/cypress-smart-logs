/// <reference types="." />

import "../../commands";

Cypress.SmartLog.setLogType("WARNING", {
  format: "*",
});

Cypress.Commands.add("custom", () => {
  Cypress.log({});
});
