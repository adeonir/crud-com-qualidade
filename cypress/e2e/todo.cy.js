describe('Todos', () => {
  it('should render the page', () => {
    cy.visit('http://localhost:3000')
  })
  it('should render two items in the list', () => {
    cy.visit('http://localhost:3000')
    cy.get('[role=row]').should('have.length', 2)
  })
})
