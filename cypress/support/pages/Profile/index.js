const elements = require('./elements').ELEMENTS;

class Profile {
    clicarNoBotaoLogout() {
        cy.get(elements.buttonLogout).click();
    }
    clicarNoBotaoCadastrarNovosCasos() {
        cy.get(elements.buttonNewIncident).click();
    }

    clicarNoBotaoExcluirUmCaso() {
        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get(elements.buttonDelete).click();
    }

    validarExclusaoDeCasoComSucesso() {
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        });
    }
}

export default new Profile();