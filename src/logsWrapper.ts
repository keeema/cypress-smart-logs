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
  get(): Cypress.LogConfig;
  get<K extends keyof Cypress.LogConfig>(attr?: K): Cypress.LogConfig[K] | Cypress.LogConfig {
    return this.loggers[0]!.get(attr as K);
  }

  set(options: Partial<Cypress.LogConfig>): Cypress.Log;
  set<K extends keyof Cypress.LogConfig>(key: K, value: Cypress.LogConfig[K]): Cypress.Log;
  set<K extends keyof Cypress.LogConfig>(
    keyOrOptions: K | Partial<Cypress.LogConfig>,
    value?: Cypress.LogConfig[K]
  ): Cypress.Log {
    this.loggers.forEach((log) => log.set(keyOrOptions as K, value as Cypress.LogConfig[K]));
    return this;
  }
  snapshot(name?: string, options?: { at?: number; next: string }): Cypress.Log {
    this.loggers.forEach((log) => log.snapshot(name, options));
    return this;
  }
}
