describe("GUI examples", () => {
  it("cy logs", () => {
    cy.visit("https://example.cypress.io/");
    cy.get(".dropdown").should("exist").click();
  });
});
