/// <reference path="../../index.d.ts" />

declare namespace Cypress {
  interface ILogTypes {
    WARNING: ILogTypeConfig;
  }

  interface Chainable<Subject> {
    custom(): Cypress.Chainable<void>;
  }
}
