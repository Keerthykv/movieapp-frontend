describe('Manage Movies Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1.0/MovieBooking/all', { fixture: 'movies.json' }).as('getMovies');
    cy.intercept('DELETE', '/api/v1.0/MovieBooking/*/delete/*', { statusCode: 200 }).as('deleteMovie');
    cy.intercept('PUT', '/api/v1.0/MovieBooking/*/update/', { statusCode: 200 }).as('updateMovie');

    cy.visit('/admin/manage-movies'); 
  });

  it('should load and display movies', () => {
    cy.wait('@getMovies');

    cy.get('.movie-card').should('have.length.greaterThan', 0);
    cy.get('.movie-card').first().find('h3').should('contain.text', 'Inception'); 
  });

  it('should handle movie editing', () => {
    cy.get('.manage-btn-edit').first().click();
    
    cy.get('app-edit-movie-dialog').should('exist'); 

    cy.get('input[formControlName="no_tickets"]').type('3'); 
    cy.get('input[formControlName="seat_no"]').focus().type('2,3,4');
    cy.get('app-edit-movie-dialog .dialog-action-btn button').contains('Save').click();

    cy.wait('@updateMovie');

    cy.get('.snackbar-class').should('contain.text', 'Movie updated successfully!');
  });

  it('should handle movie deletion', () => {
    cy.get('.manage-btn-del').first().click();
 
    cy.wait('@deleteMovie');

    cy.get('.snackbar-class').should('contain.text', 'Movie deleted successfully!');
  
    
    cy.get('.movie-card').should('have.length.lessThan', 4); 
  });

  it('should handle API error scenarios', () => {
    cy.intercept('GET', '/api/v1.0/MovieBooking/all', { statusCode: 500, body: { message: 'Error fetching movies' } }).as('getMoviesError');
    cy.visit('/admin/manage-movies');
    cy.wait('@getMoviesError');

    cy.get('.snackbar-class').should('contain.text', 'Error fetching movies');
  });
});
