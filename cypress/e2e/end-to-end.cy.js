/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Testes End To End do fluxo de cadastro e login', () => {

    beforeEach(() => {
        cy.visit('register.html')
    });

    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        // Massa de dados dinâmica
        const nome = faker.person.fullName()
        const email = faker.internet.email().toLowerCase()
        const telefone = faker.string.numeric(11)
        const senha = 'Teste@123'

        // 1 a 3 - Cadastro
        cy.preencherCadastro(nome, email, telefone, senha, senha)
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

        // Encerra a sessão aberta pelo cadastro, para o login ser feito do zero
        cy.clearLocalStorage()

        // 4 a 6 - Login com o usuário recém-cadastrado
        cy.visit('login.html')
        cy.login(email, senha)
        cy.get('#user-name').should('contain', nome)
    });
});
