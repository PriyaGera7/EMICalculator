/// <reference types ="cypress"/>

describe('Test' ,()=>{

    beforeEach(()=>{
        cy.visit('https://google.com')
    })
    it('Google Search', function(){
       
        cy.url().should('eq','https://www.google.com/');
        //cy.wait(2000)
        //cy.get('#APjFqb',{timeout:5000}).type("Automation step by Step{Enter}")
        //cy.contains('Google Search').click()
    
        //cy.title().should('eq', 'Google');

        // cy.contains('Google Search').then(($search) => {
        //     const section1Value = parseFloat($search.text());
        //     section1Value.should('have.value','Google Search')
        //   });

          cy.contains('Google Search').invoke('val').then((actualValue) => {
            expect(actualValue).to.equal('Google Search');
          });

        
    })
})
