describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sample User',
      username: 'sampleUser',
      password: 'samplePassword' 
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown by default', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sampleUser')
      cy.get('#password').type('samplePassword')
      cy.get('#login-button').click()
      cy.contains('sampleUser logged-in')
    })

    it('fails with correct credentials', function() {
      cy.get('#username').type('sampleUser1')
      cy.get('#password').type('samplePassword')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
})
