import { getCommandName } from "./logUtils";

export interface IWithText {
  getText: string;
}

export class FileLog implements Cypress.Log, IWithText {
  private _options: Partial<Cypress.LogConfig>;
  private _errorText = "";
  private _text = "";
  private _originalMessages: string[] = [];

  constructor(options: Partial<Cypress.LogConfig>) {
    this._options = { ...options };
    if (this._options.autoEnd) this.end();

    this.setText();
  }
  get getText(): string {
    return this._text;
  }

  private setText(): void {
    const message = (this._originalMessages = [...((this._options.message || this._originalMessages) as string[])]);

    if (this._options.consoleProps) {
      message.push(JSON.stringify(this._options.consoleProps()));
    }

    const commandName = getCommandName(this._options);
    if (message[this.commandIndex] !== commandName) {
      message.splice(this.commandIndex, 0, commandName);
    }

    this._errorText && message.push(this._errorText);

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
    this.setText();
  }

  get(): Cypress.LogConfig;
  get<K extends keyof Cypress.LogConfig>(attr?: K): Cypress.LogConfig[K] | Cypress.LogConfig {
    return attr ? this._options[attr] : (this._options as Cypress.LogConfig);
  }

  set(options: Partial<Cypress.LogConfig>): Cypress.Log;
  set<K extends keyof Cypress.LogConfig>(key: K, value: Cypress.LogConfig[K]): Cypress.Log;
  set<K extends keyof Cypress.LogConfig>(
    keyOrOptions: K | Partial<Cypress.LogConfig>,
    value?: Cypress.LogConfig[K]
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

  private get commandIndex(): number {
    return Cypress.SmartLogs.Config.timestamp ? 2 : 1;
  }
}
