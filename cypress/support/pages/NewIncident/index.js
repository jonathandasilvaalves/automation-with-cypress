const elements = require('./elements').ELEMENTS;

class NewIncident {
    preencherCadastroDeCaso() {
        cy.get(elements.title).type('Mary Cat 2');
        cy.get(elements.description).type('Apoio aos animais');
        cy.get(elements.value).type('400');

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get(elements.buttonSave).click();
    }

    validarCadastroDeCaso() {
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
}

export default new NewIncident();