describe("Log examples 2", () => {
  describe("inner", () => {
    before(() => {
      cy.log("log before  custom");
    });

    beforeEach(() => {
      cy.log("log before each custom");
    });

    it("cy logs", () => {
      expect(true).to.be.false;
      cy.log("1");
      cy.log("INFO", "2");
      cy.log("WARNING", "2");
      cy.wrap(true).should("be.true");
    });

    it("Cypress.log", () => {
      Cypress.log({ message: ["3", "4"] });
      const log = Cypress.log({ message: ["5", "6"] });
      cy.wait(10000).then(() => {
        log.set("consoleProps", () => ({ Test: "Testing value" }));
        log.finish();
      });
    });

    it("Custom command", () => {
      cy.custom();
    });

    afterEach(() => {
      cy.log("log after each custom");
    });

    after(() => {
      cy.log("log after custom");
    });
  });
});
