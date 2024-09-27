describe('Movie Details Component', () => {
  beforeEach(() => {
    cy.visit('/details/Kill'); 
  });

  it('should load movie details', () => {
    cy.get('h2').should('contain.text', 'Kill'); 

    cy.get('.theatre-item').should('have.length.greaterThan', 0); 
  });

  it('should allow selecting and deselecting tickets', () => {
    cy.get('.ticket-control span').first().should('contain.text', '0');

    cy.get('.ticket-control button.plus').first().click();
    cy.get('.ticket-control span').first().should('contain.text', '1');

    cy.get('.ticket-control button.minus').last().click();
    cy.get('.ticket-control span').first().should('contain.text', '0');
  });

  it('should handle seat selection and deselection', () => {
    cy.get('.ticket-control button.plus').first().click();
    cy.get('.book-ticket-button').first().click();

    cy.get('.seat-layout .available-seat').first().click();
    cy.get('.selected-seats').should('contain.text', '0'); 

    cy.get('.seat-layout .available-seat').first().click();
    cy.get('.selected-seats').should('not.contain.text', '0');
  });

  it('should not allow booking confirmation without selecting required seats', () => {
    cy.get('.ticket-control button.plus').first().click();
    cy.get('.book-ticket-button').first().click();

    cy.get('.confirm').should('be.disabled');
  });

  it('should confirm booking when tickets and seats are selected', () => {
    cy.get('.ticket-control button.plus').first().click();
    cy.get('.book-ticket-button').first().click();

    cy.get('.seat-layout .available-seat').first().click();

    cy.get('.confirm').should('not.be.disabled');

    cy.get('.confirm').click();

    cy.get('.snackbar-class').should('contain.text', 'Booking Confirmed!');

  });
  

  it('should display error if trying to book with no available tickets', () => {
    cy.get('.ticket-control span').each(($el, index) => {
      if ($el.text().includes('Available: 0')) {
        cy.get('.book-ticket-button').eq(index).click();

        cy.get('.mat-raised-button').should(
          'contain.text',
          'Tickets for this movie has been SOLD OUT'
        );
      }
    });
  });

  it('should handle API error scenarios gracefully', () => {
    cy.intercept('POST', '/api/v1.0/MovieBooking/*/add', { statusCode: 500, body: { message: 'Error booking tickets' } });

    cy.get('.ticket-control button.plus').first().click();
    cy.get('.book-ticket-button').first().click();
    cy.get('.seat-layout .available-seat').first().click();

    cy.get('.confirm').click();

    cy.get('.snackbar-class').should('contain.text', 'Error booking tickets');
  });
});
