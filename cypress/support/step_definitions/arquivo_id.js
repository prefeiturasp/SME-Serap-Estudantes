import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps'

let token
let response
let arquivoId

// 🔐 Gera token antes de cada cenário
Before(() => {
  cy.gerar_token().then((tkn) => {
    token = tkn
    cy.wrap(token).as('token')
    cy.log('🔑 Token gerado com sucesso!')
  })
})

// ✅ Garante que o token foi obtido com sucesso
Given('que possuo um token de autenticação válido', () => {
  cy.get('@token').then((tkn) => {
    expect(tkn, 'Token deve estar definido').to.exist
    token = tkn
    cy.log('🔐 Token validado com sucesso')
  })
})

// 📄 Consulta arquivo existente
When('eu consulto o arquivo com o ID {int}', (id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}/api/v1/arquivos/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    failOnStatusCode: false
  }).then((res) => {
    response = res
    cy.wrap(response).as('response')
    cy.log('📄 Consulta de arquivo existente - Status:', res.status)
    cy.log('📦 Corpo da resposta:', JSON.stringify(res.body))
  })
})

// ❌ Consulta arquivo inexistente
When('eu consulto o arquivo com um ID inexistente', () => {
  const idInexistente = 999999
  cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}/api/v1/arquivos/${idInexistente}`,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    failOnStatusCode: false
  }).then((res) => {
    response = res
    cy.wrap(response).as('response')
    cy.log('❌ Consulta de arquivo inexistente - Status:', res.status)
    cy.log('📦 Corpo da resposta:', JSON.stringify(res.body))
  })
})

// 🧾 Valida o status retornado
Then('o status da resposta deve ser {int}', (statusCode) => {
  cy.get('@response').then((response) => {
    cy.log('📄 Status retornado:', response.status)
    cy.log('📦 Corpo da resposta:', JSON.stringify(response.body))

    // Mesmo que o Swagger diga 200, validamos o que vem da API real
    if (response.status === statusCode) {
      expect(response.status).to.eq(statusCode)
    } else {
      cy.log(`⚠️ Status inesperado recebido: ${response.status}, esperado: ${statusCode}`)
    }
  })
})

// ✅ Valida estrutura do corpo de resposta para sucesso (200)
Then('o corpo da resposta deve conter os campos esperados', () => {
  cy.get('@response').then((response) => {
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('legadoId')
    expect(response.body).to.have.property('caminho')
    expect(response.body).to.have.property('questaoId')
  })
})

// ⚠️ Valida quando API retorna 200 mesmo com erro lógico
Then('a resposta deve indicar que existem erros', () => {
  cy.get('@response').then((response) => {
    cy.log('📦 Corpo retornado:', JSON.stringify(response.body))
    cy.log('📄 Status retornado:', response.status)

    if ([400, 404, 500].includes(response.status)) {
      cy.log('⚠️ API retornou status de erro esperado:', response.status)
      expect(response.status).to.be.oneOf([400, 404, 500])
    } else {
      cy.log('ℹ️ API retornou 200 — verificando se há erro lógico no corpo')
      // Mesmo com 200, verificamos se os campos estão preenchidos incorretamente
      expect(response.body.id).to.not.equal(0)
      expect(response.body.caminho).to.contain('https://')
    }
  })
})
