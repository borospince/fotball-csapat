describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('[id="belep-gomb"]').click();
    cy.get('[id="regiszter-gomb"]').click();
    cy.get('[id="nev"]').type("otto");
    cy.get('[id="email"]').type("otto2@gmail.com");
    cy.get('[id="jelszo"]').type("Otto2123");
    cy.get('[id="jelszo-ujra"]').type("Otto2123");
    cy.get('[id="registeration-gomb"]').click();
    cy.wait(1000);
    cy.get('[id="belep-gomb"]').click();
    cy.get('[id="email"]').type("otto2@gmail.com");
    cy.get('[id="jelszo"]').type("Otto2123");
    cy.get('[id="belepes-gomb"]').click();
  })
})