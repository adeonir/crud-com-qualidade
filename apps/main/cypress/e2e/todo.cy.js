const baseUrl = 'http://localhost:3000'

describe('Todos', () => {
  beforeEach(() => {
    cy.fixture('todos').then((data) => {
      cy.intercept('GET', `${baseUrl}/api/todos?page=1&limit=2`, data).as('getTodos')
      cy.visit(baseUrl)
    })
  })

  it('should render two items in the list', () => {
    cy.get('[role=row]').should('have.length', 2)
  })

  it('should render in the list when create a new item', () => {
    cy.intercept('POST', `${baseUrl}/api/todos`, (req) => {
      req.reply({
        id: '185b267f-ee75-4cf2-835c-fd0eb55c2185',
        date: '2023-08-21T10:51:28.884Z',
        content: 'Make coffee',
        done: false,
      })
    }).as('createTodo')
    cy.get('input[name="addNew"]').type('Make coffee')
    cy.get('button[aria-label="Adicionar novo item"]').click()
    cy.wait('@createTodo')
    cy.get('[role=row]').contains('Make coffee')
  })

  it('should change when toggle a done item', () => {
    cy.intercept('PUT', `${baseUrl}/api/todos/b4c7d9e0-f3a0-4e5d-8c2b-1e7e8d9f0a1b/toggle-done`, (req) => {
      req.reply({
        id: 'b4c7d9e0-f3a0-4e5d-8c2b-1e7e8d9f0a1b',
        date: '2023-05-07T13:53:21.779Z',
        content: 'Finish coding project',
        done: false,
      })
    }).as('toggleDone')
    cy.get('input[type="checkbox"]').last().check()
    cy.get('input[type="checkbox"]').last().should('be.checked')
  })

  it('should remove from the list when delete a item', () => {
    cy.intercept('DELETE', `${baseUrl}/api/todos/b4c7d9e0-f3a0-4e5d-8c2b-1e7e8d9f0a1b`, (req) => {
      req.reply()
    }).as('deleteTodo')
    cy.get('button[aria-label="Remover um item"]').first().click()
    cy.get('[role=row]').should('have.length', 1)
  })
})
