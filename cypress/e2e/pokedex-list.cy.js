describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/pokedex');
  });
  it('should open the pokedex site from menu', () => {
    cy.visit('/');
    cy.openMenu();
    cy.get('[data-cy="all-pokedex-link"]').click();
    cy.closeMenu();
    cy.get('.q-infinite-scroll > .q-list')
      .first()
      .contains('Nacional')
      .contains('Pokédex Nacional completa');

    cy.url().should('eq', 'http://localhost:9000/pokedex');
  });
});

export {};
