Cypress.Commands.add('gerar_token', () => {
  return cy.request({
    method: 'POST',
    url: 'https://hom-serap-estudante.sme.prefeitura.sp.gov.br/api/v1/autenticacao',
    headers: {
      'accept': '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
    body: {
      login: '5937723',
      senha: '14062011',
      dispositivo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Authentication failed with status: ${response.status}`)
    }
    return response.body.token
  })
})
