Feature: API de Prova

  Scenario: Enviar prova válida
    Given o endpoint da API de prova está disponível
    When eu envio os dados da prova do aluno
    Then a resposta deve conter status 200

  Scenario: Enviar prova com dados inválidos
    Given o endpoint da API de prova está disponível
    When o aluno envia a prova com dados inválidos
    Then a API deve retornar um erro com status 500
