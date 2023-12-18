
import {LoginPage} from "./pages/login_page"

const login = new LoginPage() 

describe('Login tests' ,()=> {
    beforeEach(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('Login Test - Valid' ,()=>{
        //cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    
        login.enterUsername("Admin");
        login.enterPassWord("admin123");
        login.clickLogin();
    
        // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type("Admin")
        // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input') .type("admin123" )
        // cy.get('.oxd-button').click()
    
    })
    
    it('Login Test - Invalid' ,()=>{
        //cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    
        login.enterUsername("Admin");
        login.enterPassWord("admin124");
        login.clickLogin();
    
    //    cy.contains('Invalid credentials').should('be.visible')
    
        // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type("Admin")
        // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input') .type("admin123" )
        // cy.get('.oxd-button').click()
    
    })
})

