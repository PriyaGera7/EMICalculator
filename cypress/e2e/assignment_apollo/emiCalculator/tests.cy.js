import 'cypress-xpath';
import { SELECTORS } from "/Users/pgera/Desktop/Cypress/cypress/e2e/pages/constants.js"
describe('EMI Calculator' , () =>{
    beforeEach(()=>{

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });

        cy.visit("https://emicalculator.net")
    })


    it.skip('Test Case 1' , ()=>{
       
        const loanAmount = 2500000
        const interest = 10
        const tenure = 10

        const ratePerMonth = interest / 1200;
        const payments = tenure*12

        cy.get(SELECTORS.loanAmountLocator).clear().type(loanAmount)
        cy.get(SELECTORS.loanInterest).clear().type(interest)
        cy.get(SELECTORS.loanTenure).clear().type(tenure)


        // Calculate EMI
        const emi = (loanAmount * ratePerMonth * Math.pow(1 + ratePerMonth, payments)) /
                    (Math.pow(1 + ratePerMonth, payments) - 1);

        // Extracting text from webelement and performing actions on it to validate if emi amount generated is the same on page as calculated
        cy.get(SELECTORS.emiAmount).invoke('text').then((text)=>{
            const loanEmi = text.replace(/,/g, '');
            cy.wrap(loanEmi).should('eq',emi);
        })

        // Validate if pie chart is visible
        cy.get(SELECTORS.pieChart).should('be.visible')

        // Read numbers from both the sections of the pie chart 

        cy.get(SELECTORS.pieChartSection1).then((section1) => {
            const section1Value = parseFloat(section1.text());
            expect(section1Value).to.be.greaterThan(0);
          });

        cy.get(SELECTORS.pieChartSection2).then((section2) => {
            const section2Value = parseFloat(section2.text());
            expect(section2Value).to.be.greaterThan(0);
          });

    })

    it('Test Case 2' ,()=>{
        cy.get('#personal-loan > a').click()

        const loanAmount = 1000000
        const interest = 10
        const tenure = 5

        cy.get('#loanamountsteps > span:nth-child(3) > span').trigger('change')
        //cy.xpath('//span[@style="left: 33.34%;"]').trigger('input')
        cy.get(SELECTORS.loanInterestSlider).invoke('val',interest).trigger('change')
        cy.get(SELECTORS.loanTermSlider).invoke('val',tenure).trigger('input')

        // Selecting date from date picker
        cy.get(SELECTORS.date).click()
        cy.xpath('//span[text()="Nov"]').click()

        // Validating the availability of bar chart
        cy.get(SELECTORS.emiBarChart).should('exist')
        
        // Count number of bars
        cy.get(SELECTORS.noOfBars).its('length').then((length) => {
            cy.log(`Count": ${length}`);
        });

        //Read the values from any one bar tool tip

        // Checking that the below element does not exist before clicking
        cy.get('.highcharts-column-series.highcharts-tracker.highcharts-series-hover> rect:nth-child(2)').should('not.exist')

        // Triggering the mouse hover event
        cy.get('.highcharts-series-0.highcharts-column-series.highcharts-tracker > rect:nth-child(2)').trigger('mouseover').click()
        cy.wait(3000)
  
        cy.get('.highcharts-column-series.highcharts-tracker.highcharts-series-hover> rect:nth-child(2)').should('be.visible')
        cy.get('.highcharts-column-series.highcharts-tracker.highcharts-series-hover> rect:nth-child(2)').invoke('text').then((text) => {
            cy.log(`Text": ${text}`)
        });
    })
})