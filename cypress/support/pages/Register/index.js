const elements = require('./elements').ELEMENTS;

class Register {
    acessarCadastro() {
        cy.visit('http://localhost:3000/register')
    }

    preencherCadastro() {
        cy.get(elements.name).type('Dogs queridos');
        cy.get(elements.email).type('dogs@mail.com');
        cy.get(elements.whatsapp).type('43999066650');
        cy.get(elements.city).type('Londrina');
        cy.get(elements.uf).type('PR');
        
        cy.route('POST', '**/ongs').as('postOng');

        cy.get(elements.submit).click();
    }

    validarCadastroDeOngComSucesso() {
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body).is.not.null;
        });
    }

}

export default new Register();