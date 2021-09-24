const maxFileNameLength = 220;

function getCleanFilename(s: string): string {
  return Cypress._.truncate(Cypress._.kebabCase(Cypress._.deburr(s)), {
    length: maxFileNameLength,
    omission: "",
  });
}

function getFilepath(filename: string): string {
  return `${Cypress.SmartLogs.Config.folder}/${new Date().toJSON().slice(0, 23).replace(/[:.]/g, "-")}-${filename}`;
}

const lastFile = {
  fileNameWithoutTimestamp: "",
  fullFileName: "",
};

export function writeFailedTestInfo(context: Mocha.Context, content: string): void {
  const testName = Cypress.currentTest.titlePath.join(" - ");
  const specName = Cypress.spec.name;
  const state = context.currentTest?.state;

  const filePath = prepareFilePath(specName, testName, state);
  if (context.currentTest?.state !== "failed" && Cypress.SmartLogs.Config.fileSave === "failed") {
    return;
  }
  cy.task("write-smart-logs", { filePath, content }, { log: false });
}
function prepareFilePath(specName: string, testName: string, state: string | undefined) {
  const cleaned = getCleanFilename(Cypress._.join([Cypress._.split(specName, ".")[0], testName], "-"));
  const fileNameWithoutTimestamp = `${cleaned}${state !== undefined ? `-${state}` : ""}.log`;
  const filePath =
    lastFile.fileNameWithoutTimestamp === fileNameWithoutTimestamp
      ? lastFile.fullFileName
      : getFilepath(fileNameWithoutTimestamp);
  lastFile.fileNameWithoutTimestamp = fileNameWithoutTimestamp;
  lastFile.fullFileName = filePath;
  return filePath;
}
