/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/naming-convention

  interface Cypress {
    SmartLog: {
      Config: ISmartLogConfig;
      LogTypes: Cypress.ILogTypes;
      setLogType(name: string, config: ILogTypeConfig): void;
    };
  }

  type LogTarget = "file" | "window";

  interface ILogTypeConfig {
    format?: string | [string, string];
    target?: [LogTarget] | [LogTarget, LogTarget];
  }

  interface ISmartLogConfig {
    timestamp?: "time" | "datetime" | false;
  }

  interface ILogTypes {
    INFO: ILogTypeConfig;
  }

  interface Chainable<Subject = any> {
    log(type: keyof ILogTypes, message: string, ...args: any[]): Chainable<null>;
  }

  interface ILogConfig {
    logType: keyof ILogTypes;
  }
}
