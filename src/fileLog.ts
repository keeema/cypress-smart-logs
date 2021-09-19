export class FileLog implements Cypress.Log {
  private _options: Partial<Cypress.ILogConfig>;
  private _errorText = "";
  private _text = "";

  constructor(options: Partial<Cypress.ILogConfig>) {
    this._options = { ...options };
    if (this._options.autoEnd) this.end();

    this.setText();
  }
  get fileText(): string {
    return this._text;
  }

  private setText(): void {
    const message = [...((this._options.message || []) as string[])];
    if (this._options.consoleProps) {
      message.push(JSON.stringify(this._options.consoleProps()));
    }
    message.push(this._errorText);
    this._text = message.join("\t");
  }

  end(): Cypress.Log {
    this.setText();
    return this;
  }
  error(error: Error): Cypress.Log {
    this._errorText = `${error.name}\n${error.message}\n${error.stack}`;
    return this;
  }

  finish(): void {
    this.end();
  }

  get(): Cypress.ILogConfig;
  get<K extends keyof Cypress.ILogConfig>(attr?: K): Cypress.ILogConfig[K] | Cypress.ILogConfig {
    return attr ? this._options[attr] : (this._options as Cypress.ILogConfig);
  }

  set(options: Partial<Cypress.ILogConfig>): Cypress.Log;
  set<K extends keyof Cypress.ILogConfig>(key: K, value: Cypress.ILogConfig[K]): Cypress.Log;
  set<K extends keyof Cypress.ILogConfig>(
    keyOrOptions: K | Partial<Cypress.ILogConfig>,
    value?: Cypress.ILogConfig[K]
  ): Cypress.Log {
    if (typeof keyOrOptions !== "object") {
      this._options[keyOrOptions] = value;
    } else {
      this._options = keyOrOptions;
    }
    return this;
  }
  snapshot(): Cypress.Log {
    return this;
  }
}
