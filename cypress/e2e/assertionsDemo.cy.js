it('Assertions Demo',()=>{

    cy.visit('https://example.cypress.io')
    cy.contains('get').click()
    cy.get('#query-btn')
    .should('be.visible')
    .and('contain.text','Button')


    let name = 'cypress'
    expect(name).be.equal('cypress')

    assert.equal(4,'4','Not equal')
    assert.strictEqual(4,'4','Nope')

})