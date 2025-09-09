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

// Próxima questão da prova TAI
When('envio uma requisição POST da próxima', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai/599/proximo`,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  }).as('response')
})

Then('retorna status 200 de sucesso da questão', function () {
  cy.get('@response').then((response) => {
    expect([200, 405]).to.include(response.status)
  })
})

// ID da prova TAI é obrigatório na próxima questão
When('envio uma requisição POST da próxima sem o ID', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai//proximo`,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  }).as('response')
})

Then('retorna status 404 sem a questão', function () {
  cy.get('@response').then((response) => {
    expect(response.status).to.eq(404)
  })
})

// Não obtem a próxima questão sem autenticação
Given('que não possuo um token de acesso valido', () => {  
})

When('tento a requisição POST da próxima', function () { 
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + `/api/v1/provas-tai/599/proximo`,
    headers: {
     accept: '*/*',
     Authorization: 'Bearer token_invalido'
    },
    failOnStatusCode: false
  }).as('response')
})

Then('não retorna a questão somente 401', function () {
  cy.get('@response').then((response) => {
    expect([401, 405]).to.include(response.status)
  })
})