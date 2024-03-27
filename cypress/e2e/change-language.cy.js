context('change-language', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('change language to spanish', () => {
    cy.openMenu();

    cy.get('[data-cy="language-switcher"]').click();
    cy.get('.q-menu .q-item').should('have.length', 2);
    cy.selectLanguage('Español');

    cy.get('.q-drawer__content > .q-list > a')
      .first()
      .should('contain', 'Todos los pokémon');
  });

  it('change language to english', () => {
    cy.openMenu();

    cy.get('[data-cy="language-switcher"]').click();
    cy.get('.q-menu .q-item').should('have.length', 2);
    cy.selectLanguage('English');

    cy.get('.q-drawer__content > .q-list > a')
      .first()
      .should('contain', 'All pokemons');
  });
});

export {};
