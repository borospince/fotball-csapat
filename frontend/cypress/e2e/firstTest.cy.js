describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('[id="belep-gomb"]').click();
    cy.get('[id="email"]').type("Huba@gmail.com");
    cy.get('[id="jelszo"]').type("Huba1234");
    cy.get('[id="belepes-gomb"]').click();
  })
})