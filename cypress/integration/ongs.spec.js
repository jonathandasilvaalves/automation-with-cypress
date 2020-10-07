/// <reference types="cypress" />

describe('Ongs', () => {
    it('devem poder realizar um cadastro ', () => {
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
        cy.get('[data-cy=id]').type(Cypress.env('createdOngId'));
        cy.get('[data-cy=button-login]').click();

    });

    it.skip('devem poder fazer logout', () => {
        cy.login();
        cy.get('button').click();
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();
        cy.get('.button').click();
        cy.get('[placeholder="Título do caso"]').type('Mary Cat 2');
        cy.get('textarea').type('Apoio aos animais');
        cy.get('[placeholder="Valor em reais"]').type('400');

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get('li > button > svg').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        });

    });
})