/// <reference types="cypress" />

const smartLogs = require("../../src/plugin");

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on: Cypress.PluginEvents, _config: Cypress.ConfigOptions) => {
  smartLogs.install(on);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
