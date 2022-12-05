describe('Blog app', function() {
  let user = {
      name: 'Sample User',
      username: 'sampleUser',
      password: 'samplePassword' 
  }

  let user1 = {
      name: 'Second User',
      username: 'userNumberTwo',
      password: 'someOtherPassword' 
  }

  let blog = {
    title: 'sample blog',
    author: 'sampleUser',
    url: 'http://sampleblog.com'
  }

  let blog1 = {
    title: 'second blog',
    author: 'sampleUser',
    url: 'http://sampleblog1.com'
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
      cy.login({ username: user.username, password: user.password })
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

    describe('and some blogs exist', function () {
      beforeEach(function() {
        cy.createBlog(blog)
        cy.createBlog(blog1)
      })

      it('one of those can be liked', function () {
        cy.intercept({ method: 'PUT', url: '*/blogs/*' }).as('likeReq')
        cy.contains(blog1.title).parent().contains('button','view').click()
        cy.contains(blog1.url).parent().as('blogExpanded')
          .find('.likes').then((likes) => {
            const likesBef = parseFloat(likes.text())
            cy.get('@blogExpanded').find('button:contains("like")').click()
            cy.wait('@likeReq').then(() => {
                cy.get('@blogExpanded').find('.likes').then((likes) => {
                  const likesAft = parseFloat(likes.text())
                  expect(likesAft).to.eq(likesBef + 1)
                })
              })
          })
      })

      it('they can be deleted by user who created them', function () {
        cy.intercept({ method: 'DELETE', url: '*/blogs/*' }).as('deleteReq')
        cy.contains(blog1.title).parent().contains('button','view').click()
        cy.contains(blog1.url).parent().as('blogExpanded')
          .find('button:contains("remove")').click()
        cy.on('window:confirm', (str) => {
          expect(str).to.eq(`Remove ${blog1.title}?`)
          return true
        })
        cy.get('html').should('not.contain', blog1.title)
      })

      it('they cannot be deleted by other users', function() {
        cy.request('POST', 'http://localhost:3003/api/users', user1)
        cy.get('button:contains("logout")').click()
        cy.login({ username: user1.username, password: user1.password })
        cy.contains(blog1.title).parent().contains('button','view').click()
        cy.contains(blog1.url).parent()
          .should('not.contain', 'button:contains("remove")')
      })
    })
  })
})
