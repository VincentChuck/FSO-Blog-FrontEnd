describe('Blog app', function() {
  let user = {
      name: 'Sample User',
      username: 'sampleUser',
      password: 'samplePassword' 
  }

  let blog = {
    title: 'sample blog',
    author: 'sampleUser',
    url: 'http://sampleblog.com'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
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
      console.log(this.currentUser)
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains('sampleUser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password+1)
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain','wrong username or password')
        .and('have.css','color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', `${user.username} logged in`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type(blog.title)
      cy.get('input[name="author"]').type(blog.author)
      cy.get('input[name="url"]').type(blog.url)
      cy.get('button:contains("create")').click()
      
      cy.get('.notification').contains(blog.title)
      cy.should('not.contain', '.error')
      cy.get('.blogs').contains(blog.title)
    })
  })
})
