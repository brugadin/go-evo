// https://docs.cypress.io/api/introduction/api.html

describe('Markup loads', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('body').find('main');
  });
});
