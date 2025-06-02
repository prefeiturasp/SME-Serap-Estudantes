import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const endpoint = "https://hom-serap-estudante.sme.prefeitura.sp.gov.br/proximo";

Given("o endpoint da API de prova está disponível", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    failOnStatusCode: false,
  }).then((response) => {
    expect([200, 422]).to.include(response.status);
  });
});

When("eu envio os dados da prova do aluno", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: {
      "ESTUDANTE": "Aluno1",
      "AnoEscolarEstudante": "8",
      "proficiencia": "500.0",
      "profic.inic": "500.0",
      "idItem": "ITEM1,ITEM2",
      "parA": "1.0,2.0",
      "parB": "250.0,300.0",
      "parC": "0.2,0.3",
      "administrado": "ITEM1",
      "respostas": "A",
      "gabarito": "A",
      "erropadrao": "0.5",
      "n.Ij": "45",
      "componente": "Língua portuguesa",
      "idEixo": "1,2",
      "idHabilidade": "2,3"
    },
    headers: {
      "Content-Type": "application/json"
    },
    failOnStatusCode: false
  }).then((res) => {
    response = res;
  });
});

Then("a resposta deve conter status 200", () => {
  expect(response.status).to.eq(200);
});

When("o aluno envia a prova com dados inválidos", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: {
      estudante: "",
      nota: "oito",  
    },
    failOnStatusCode: false,
  }).as("response");
});

Then("a API deve retornar um erro com status 400", () => {
  cy.get("@response").its("status").should("eq", 400);
});

When('o aluno envia a prova sem o campo "ESTUDANTE"', () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: {
      disciplina: "Português",
      nota: 7.0,
      proficiencia: 0.85,
    },
    failOnStatusCode: false,
  }).as("response");
});

Then("a API deve retornar um erro informando campo obrigatório", () => {
  cy.get("@response").its("status").should("eq", 400);
  });

When('o aluno envia a prova com "proficiencia" como texto', () => {
  cy.request({
    method: "POST",
    url: endpoint,
    body: {
      estudante: "78910",
      disciplina: "História",
      nota: 9,
      proficiencia: "alta",
    },
    failOnStatusCode: false,
  }).as("response");
});

Then("a API deve retornar um erro de validação de tipo de dado", () => {
cy.get("@response").its("status").should("eq", 400);
});
