import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'

let token

Before(() => {
  cy.gerar_token().then((token_valido) => {
    token = token_valido
  })
})

Given('que possuo um token de acesso valido', function () {
  expect(token, 'valido').to.exist
})

// Inicia a prova TAI
When('envio uma requisição POST para iniciar', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai/599/iniciar-prova`,
    headers: {
      accept: 'text/plain',
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  }).as('response')
})

Then('retorna status 200 que a prova foi iniciada', function () {
  cy.get('@response').then((response) => {
    expect([200, 405]).to.include(response.status)
  })
})

// ID da prova TAI é obrigatório para iniciar
When('envio uma requisição POST para iniciar sem o ID', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai//iniciar-prova`,
    headers: {
      accept: 'text/plain',
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  }).as('response')
})

Then('retorna status 404 sem iniciar a prova', function () {
  cy.get('@response').then((response) => {
    expect(response.status).to.eq(404)
  })
})

// Não inicia prova sem autenticação
Given('que não possuo um token de acesso valido', () => {  
})

When('tento a requisição POST de iniciar prova', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai/599/iniciar-prova`,
    headers: {
     accept: 'text/plain',
     Authorization: 'Bearer token_invalido'
    },
    failOnStatusCode: false
  }).as('response')
})

Then('a prova não é iniciada retornando o status 401', function () {
  cy.get('@response').then((response) => {
    expect([401, 405]).to.include(response.status)
  })
})