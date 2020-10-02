/// <reference types="cypress" />

describe('Ongs', () => {
    it('devem poder ', () => {
        cy.visit('http://localhost:3000/register')
        cy.get("[placeholder='Nome da ONG']").type('Dogs queridos');
        cy.get("[type='email']").type('dogs@mail.com');
        cy.get("[placeholder='WhatsApp']").type('43999066650');
        cy.get("[placeholder='Cidade']").type('Londrina');
        cy.get("[placeholder='UF']").type('PR');
        
        cy.route('POST', '**/ongs').as('postOng');

        cy.get('.button').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body).is.not.null;
        });
    });

    it('deve poder realizar um login no sistema', () => {

        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();

    });
})