const elements = require('./elements').ELEMENTS;

class Logon {
    acessarLogin() {
        cy.visit('http://localhost:3000/');
    }

    preencherLogin() {
        cy.get(elements.id).type(Cypress.env('createdOngId'));
        cy.get(elements.buttonLogin).click();
    }

}

export default new Logon();