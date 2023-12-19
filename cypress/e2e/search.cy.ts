describe('Search Products', () => {
  it('should be able to search for products', () => {
    cy.visit('/')
    cy.searchByQuery('moletom')
    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to visit search page without a search query', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('/search')
    cy.location('pathname').should('not.include', '/search')
    cy.get('a[href^="/product"]').should('exist')
  })
})
