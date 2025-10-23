import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'

let token
let response

// 🔹 Gera token de autenticação antes dos testes que precisam dele
Before(() => {
  cy.gerar_token().then((token_valido) => {
    token = token_valido
  })
})

// ====================
// Cenário base
// ====================
Given('que eu possuo o endpoint da API de arquivos', () => {
  // Apenas descritivo — nada a executar
})

Given('que possuo um endpoint da API de arquivos', () => {
  // Mantido para compatibilidade com variações no .feature
})

// ====================
// Cenário 1 — Arquivo EXISTENTE
// ====================
When('eu consulto o arquivo com o ID {int}', (id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}/api/v1/arquivos/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    failOnStatusCode: false
  }).as('response')
})

Then('o status da resposta deve ser {int}', (statusCode) => {
  cy.get('@response').then((response) => {
    cy.log('Status retornado:', response.status)
    cy.log('Corpo da resposta:', JSON.stringify(response.body))
    expect(response.status).to.eq(statusCode)
  })
})

Then('o corpo da resposta deve conter os campos esperados', () => {
  cy.get('@response').then((response) => {
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('legadoId')
    expect(response.body).to.have.property('caminho')
    expect(response.body).to.have.property('questaoId')
  })
})

// ====================
// Cenário 2 — Sem autenticação
// ====================
When('tento consultar o arquivo existente sem autenticação com o ID {int}', (id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}/api/v1/arquivos/${id}`,
    failOnStatusCode: false
  }).as('response')
})

// ====================
// Cenário 3 — Arquivo INEXISTENTE
// ====================
Then('a resposta deve indicar erro de arquivo inexistente', () => {
  cy.get('@response').then((response) => {
    expect(response.status).to.be.oneOf([400, 404, 500])
    cy.log('Mensagem de erro retornada:', JSON.stringify(response.body))
  })
})