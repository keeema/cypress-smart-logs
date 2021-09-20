/// <reference types="cypress" />

import smartLogs = require("../../plugin");

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  smartLogs.install(on, config);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
