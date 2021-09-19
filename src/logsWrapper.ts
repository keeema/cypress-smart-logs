export class LogsWrapper implements Cypress.Log {
  private loggers: Cypress.Log[];
  constructor(loggers: Cypress.Log[]) {
    this.loggers = loggers;
    if (loggers.length === 0) {
      throw new Error("Incorrect integration of cypress-smart-log. No log was defined.");
    }
  }

  end(): Cypress.Log {
    this.loggers.forEach((log) => log.end());
    return this;
  }
  error(error: Error): Cypress.Log {
    this.loggers.forEach((log) => log.error(error));
    return this;
  }
  finish(): void {
    this.loggers.forEach((log) => log.finish());
  }
  get(): Cypress.ILogConfig;
  get<K extends keyof Cypress.ILogConfig>(attr?: K): Cypress.ILogConfig[K] | Cypress.ILogConfig {
    return this.loggers[0]!.get(attr as K);
  }

  set(options: Partial<Cypress.ILogConfig>): Cypress.Log;
  set<K extends keyof Cypress.ILogConfig>(key: K, value: Cypress.ILogConfig[K]): Cypress.Log;
  set<K extends keyof Cypress.ILogConfig>(
    keyOrOptions: K | Partial<Cypress.ILogConfig>,
    value?: Cypress.ILogConfig[K]
  ): Cypress.Log {
    this.loggers.forEach((log) => log.set(keyOrOptions as K, value as Cypress.ILogConfig[K]));
    return this;
  }
  snapshot(name?: string, options?: { at?: number; next: string }): Cypress.Log {
    this.loggers.forEach((log) => log.snapshot(name, options));
    return this;
  }
}
