describe("Log examples - long", () => {
  const repeat = 10000;

  it("cy logs", () => {
    cy.log(new Date().toJSON());
    for (let i = 0; i <= repeat; i++) {
      cy.log(`Used cy.log (${i})`);
    }
    cy.log(new Date().toJSON());
  });

  it("Cypress.log", () => {
    cy.log(new Date().toJSON());
    for (let i = 0; i <= repeat; i++) {
      Cypress.log({ message: `Used cy.log (${i})` });
    }
    cy.log(new Date().toJSON());
    expect(true).to.be.false;
  });
});
