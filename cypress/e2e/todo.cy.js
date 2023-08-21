const baseUrl = 'http://localhost:3000'

describe('Todos', () => {
  it('should render the page', () => {
    cy.visit(baseUrl)
  })

  it('should render two items in the list', () => {
    cy.visit(baseUrl)
    cy.get('[role=row]').should('have.length', 2)
  })

  it('should render in the list when create a new item', () => {
    cy.intercept('POST', `${baseUrl}/api/todos`, (req) => {
      req.reply({
        statusCode: 201,
        body: {
          todo: {
            id: '185b267f-ee75-4cf2-835c-fd0eb55c2185',
            date: '2023-08-21T10:51:28.884Z',
            content: 'Make coffee',
            done: false,
          },
        },
      })
    }).as('createTodo')
    cy.visit(baseUrl)
    cy.get('input[name="addNew"]').type('Make coffee')
    cy.get('button[aria-label="Adicionar novo item"]').click()
    cy.get('[role=row]').contains('Make coffee')
  })
})
