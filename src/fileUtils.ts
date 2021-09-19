const maxFileNameLength = 220;

function getCleanFilename(s: string): string {
  return Cypress._.truncate(Cypress._.kebabCase(Cypress._.deburr(s)), {
    length: maxFileNameLength,
    omission: "",
  });
}

function getFilepath(filename: string): string {
  return `cypress/smart-logs/${new Date().toJSON().slice(0, 23).replace(/[:]/g, "-")}-${filename}`;
}

export function writeFailedTestInfo(context: Mocha.Context, content: string): void {
  const testName = Cypress.currentTest.titlePath.join(" - ");
  const specName = Cypress.spec.name;
  const state = context.currentTest?.state;

  const cleaned = getCleanFilename(Cypress._.join([Cypress._.split(specName, ".")[0], testName], "-"));
  const filename = `${cleaned}${state !== undefined ? `-${state}` : ""}.json`;
  const filePath = getFilepath(filename);
  cy.task("write-smart-logs", { filePath, content }, { log: false });
}
