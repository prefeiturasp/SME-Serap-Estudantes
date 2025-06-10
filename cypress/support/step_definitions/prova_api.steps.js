import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const endpoint = "https://hom-serap-estudante.sme.prefeitura.sp.gov.br/proximo";

let response;

// Cenário comum para validar se o endpoint está disponível
Given("o endpoint da API de prova está disponível", () => {
  cy.request({
    method: "OPTIONS",
    url: endpoint,
    failOnStatusCode: false,
  }).then((res) => {
    cy.log("Status do endpoint:", res.status);
    expect([200, 204, 400, 405]).to.include(res.status);
  });
});

// 1. Enviar prova válida
When("eu envio os dados da prova do aluno", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
    body: {
      ESTUDANTE: "Aluno1",
      AnoEscolarEstudante: "8",
      proficiencia: "500.0",
      "profic.inic": "500.0",
      idItem: "ITEM1,ITEM2",
      parA: "1.0,2.0",
      parB: "250.0,300.0",
      parC: "0.2,0.3",
      administrado: "ITEM1",
      respostas: "A",
      gabarito: "A",
      erropadrao: "0.5",
      "n.Ij": "45",
      componente: "Língua portuguesa",
      idEixo: "1,2",
      idHabilidade: "2,3"
    },
  }).as("response");
});

Then("a resposta deve conter status 200", () => {
  cy.get("@response").its("status").should("eq", 200);
});

// 2. Enviar prova com dados inválidos
When("o aluno envia a prova com dados inválidos", () => {
  cy.request({
    method: "POST",
    url: endpoint,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
    body: {
      estudante: "",
      nota: "oito"  // valor não numérico
    }
  }).as("response");
});

Then("a API deve retornar um erro com status 400", () => {
  cy.get("@response").its("status").should("eq", 400);
});