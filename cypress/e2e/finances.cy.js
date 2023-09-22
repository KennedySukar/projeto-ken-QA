const { it, beforeEach } = require("mocha");

beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/")
    
});

describe('transações', () => {
    it('cadastrar uma entrada', () => {
        

        criarTransacao("freela", 250)
        

        cy.get("tbody tr td.description").should("have.text", "freela")
    });

    it('cadastrar uma saída', () => {

        criarTransacao("feira", -150)


        cy.get("tbody tr td.description").should("have.text", "feira")


    });

    it('excluir trasação', () => {
        criarTransacao("freela", 100)
        criarTransacao("doação", 50)

        //cy.contains(".description", "freela") //  td  -- referencia
        //  .parent()  //  tr
        //  .find("img")  // elemento que a gente precisa
        //  .click()

        cy.contains(".description", "freela")
        .siblings()
        .children("img")
        .click()

        cy.get('tbody tr').should("have.length", 1)
        cy.get('tbody tr td.description').should("have.text", "doação")
       // cy.get('tbody tr td.date').should("have.data", "2023-08-02") // dando errado...

    

        
    });
});

function criarTransacao(descricao, valor) {
        
        cy.contains("Nova Transação").click()
        cy.get('#description').type(descricao)
        cy.get('#amount').type(valor)
        cy.get('#date').type("2023-08-02")  //  yyyy-mm-dd

        cy.contains("button", "Salvar").click()
}
        
