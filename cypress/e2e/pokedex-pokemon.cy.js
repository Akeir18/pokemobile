describe('pokedex pokemon', () => {
  beforeEach(() => {
    cy.visit('/pokedex/1');
    // cy.openMenu();
    // cy.get('[data-cy="all-pokedex-link"]').click();
    // cy.closeMenu();
    // cy.get('')
  });
  it('should open the pokedex site from start', () => {
    cy.visit('/');
    cy.openMenu();
    cy.get('[data-cy="all-pokedex-link"]').click();
    cy.closeMenu();
    cy.get('.q-infinite-scroll > .q-list')
      .first()
      .contains('Nacional')
      .contains('Pokédex Nacional completa')
      .click();

    cy.get('.text-h5').contains('Nacional');
    cy.url().should('eq', 'http://localhost:9000/pokedex/1');
  });

  it('should be on list view as default', () => {
    cy.get('.q-infinite-scroll > .q-list').should('not.be.empty');
    cy.get('.q-infinite-scroll > .q-list')
      .first()
      .should('contain.text', 'Bulbasaur')
      .should('contain.text', 'Planta')
      .should('contain.text', 'Veneno');
  });
  it('can change view mode to grid', () => {
    cy.get('[data-cy="grid-view"]').click();
    cy.get(':nth-child(1) > .q-card__section > .text-h6').should(
      'contain.text',
      'Bulbasaur'
    );
    cy.get(':nth-child(1) > .q-card__section > .text-subtitle2')
      .should('contain.text', 'Planta')
      .should('contain.text', 'Veneno');
  });
  it('can change view mode to list', () => {
    cy.get('[data-cy="list-view"]').click();
    cy.get('.q-infinite-scroll > .q-list')
      .first()
      .should('contain.text', 'Bulbasaur')
      .should('contain.text', 'Planta')
      .should('contain.text', 'Veneno');
  });
});
