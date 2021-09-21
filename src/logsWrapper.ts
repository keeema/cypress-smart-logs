export class LogsWrapper implements Cypress.Log {
  private loggers: Cypress.Log[];
  private attributes: Partial<Cypress.LogConfig>;
  constructor(loggers: Cypress.Log[], options: Partial<Cypress.LogConfig>) {
    this.attributes = options;
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
  get<K extends keyof Cypress.LogConfig>(attr: K): Cypress.LogConfig[K];
  get<K extends keyof Cypress.LogConfig>(attr?: K): Cypress.LogConfig[K] | Cypress.LogConfig {
    return this.loggers[this.loggers.length - 1]!.get(attr as K);
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

  unset<K extends keyof Cypress.LogConfig>(key: K) {
    return this.set(key, undefined as any);
  }

  invoke<K extends keyof Cypress.LogConfig>(key: K) {
    const invoke = () => {
      // ensure this is a callable function
      // and set its default to empty object literal
      const fn = this.get(key);

      if (Cypress._.isFunction(fn)) {
        return fn();
      }

      return fn;
    };

    return invoke() || {};
  }

  toJSON() {
    return Cypress._.chain(this.attributes)
      .omit("error")
      .omitBy(Cypress._.isFunction)
      .extend({
        err: (Cypress as any).$errUtils.wrapErr(this.get("error" as any)),
        consoleProps: this.invoke("consoleProps"),
        renderProps: this.invoke("renderProps" as any),
      })
      .value();
  }
}
