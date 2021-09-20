export function isTarget(logTypeConfig: Cypress.ILogTypeConfig, target: Cypress.LogTarget): boolean {
  const targetConfig = Cypress.browser.isHeaded ? logTypeConfig.target.openMode : logTypeConfig.target.runMode;

  return targetConfig.indexOf(target) >= 0;
}

export function getCommandName(options: Partial<Cypress.LogConfig>): string {
  return options.name || (Cypress as any).state("current")?.attributes?.name;
}

export function pairLogType(options: Partial<Cypress.LogConfig>): keyof Cypress.ILogTypes {
  if (options.logType) {
    return options.logType;
  }

  const commandName = getCommandName(options);

  const found = Object.keys(Cypress.SmartLogs.LogTypes).filter((logType) =>
    Cypress.SmartLogs.LogTypes[logType as keyof Cypress.ILogTypes].pairedCommands?.some(
      (command) => command === commandName
    )
  )[0] as keyof Cypress.ILogTypes | undefined;

  return found || "INFO";
}

export function enhanceOptions(
  options: Partial<Cypress.LogConfig>,
  logType: keyof Cypress.ILogTypes,
  logTypeConfig: Cypress.ILogTypeConfig
) {
  const message: string[] = createMessageArray(options);
  addLogType(message, logType);
  addTimeStamp(message);
  formatMessage(logTypeConfig.format, message);

  const enhancedOptions = {
    ...options,
    message,
  };

  return enhancedOptions;
}
function addLogType(message: string[], logType: string) {
  if (!isMessageWithTypeName(message)) {
    message.unshift(`${logType}`);
  }
}
function addTimeStamp(message: string[]): void {
  Cypress.SmartLogs.Config.timestamp &&
    message.unshift(
      Cypress.SmartLogs.Config.timestamp === "time"
        ? new Date().toJSON().slice(0, 23)
        : new Date().toJSON().slice(11, 23)
    );
}
function isMessageWithTypeName(message: string[]): boolean {
  const index = messageStartIndex();
  return (
    message.length > index && message[index] !== undefined && Cypress.SmartLogs.LogTypes.hasOwnProperty(message[index]!)
  );
}
function createMessageArray(options: Partial<Cypress.LogConfig>) {
  const message: string[] = [];

  if (options.message) {
    if (Array.isArray(options.message)) {
      message.push(...options.message);
    } else if (options.message !== undefined) {
      message.push(options.message);
    }
  }
  return message;
}
function formatMessage(format: string | [string, string] | undefined, message: string[]): void {
  if (!format) return;

  if (typeof format === "string") {
    format = [format, format];
  }

  for (let i = messageStartIndex(); i < message.length; i++) {
    message[i] = `${format[0]}${message[i]}${format[1]}`;
  }
}
function logTypeIndex(): number {
  let logTypeIndex = 0;
  Cypress.SmartLogs.Config.timestamp && ++logTypeIndex;
  return logTypeIndex;
}
function messageStartIndex(): number {
  let startIndex = logTypeIndex() + 1;
  return startIndex;
}
