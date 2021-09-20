/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/naming-convention

  interface ResolvedConfigOptions {
    "smart-logs-timestamp": LogTimestamp;
    "smart-logs-folder": string;
    "smart-logs-file-save": LogFileSave;
  }

  interface Cypress {
    SmartLogs: {
      Config: ISmartLogConfig;
      LogTypes: Cypress.ILogTypes;
      setLogType(name: keyof Cypress.ILogTypes, config: ILogTypeConfig): void;
    };
  }

  type LogTarget = "file" | "window";
  type LogTimestamp = "time" | "datetime" | false;
  type LogFileSave = "all" | "failed";

  interface ILogTypeConfig {
    format?: string | [string, string];
    target: {
      runMode: [LogTarget] | [LogTarget, LogTarget];
      openMode: [LogTarget] | [LogTarget, LogTarget];
    };
    pairedCommands?: string[];
  }

  interface ISmartLogConfig {
    folder: string;
    timestamp: LogTimestamp | false;
    fileSave: LogFileSave;
  }

  interface ILogTypes {
    INFO: ILogTypeConfig;
    ASSERT: ILogTypeConfig;
  }

  interface Chainable<Subject = any> {
    log(type: keyof ILogTypes, message: string, ...args: any[]): Chainable<null>;
  }

  interface LogConfig {
    logType: keyof ILogTypes;
  }
}
