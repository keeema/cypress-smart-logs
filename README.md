# cypress-smart-logs

Cypress plugin allowing to add additional information to logs and configure the output.

## Setup plugin

Change your _cypress/plugins/index.ts_

```ts
/// <reference types="cypress" />

import smartLogs = require("cypress-smart-logs/plugin");

module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  smartLogs.install(on, config);
};
```

## Register commands

Change your _cypress/support/index.ts_

```ts
/// <reference types="." />

import "cypress-smart-logs/commands";

// use this construct to add new warning type
Cypress.SmartLogs.setLogType("WARNING", {
  format: "*",
  target: { openMode: ["file", "window"], runMode: ["file"] },
  pairedCommands: ["custom"],
});

// this custom commands is bound to WARNING log type
Cypress.Commands.add("custom", () => {
  Cypress.log({});
});
```

and add type defs to _cypress/support/index.d.ts_

```ts
/// <reference types="cypress-smart-logs" />

declare namespace Cypress {
  interface ILogTypes {
    WARNING: ILogTypeConfig;
  }

  interface Chainable<Subject> {
    custom(): Cypress.Chainable<void>;
  }
}
```

## Additional settings

Logs are by default saved only for failed cases. In _run_ mode are window logs disabled.

Additional configuration can be defined in Cypress.SmartLogs.Config object.
