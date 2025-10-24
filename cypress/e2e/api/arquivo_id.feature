Feature: Consultar arquivo por ID
  Como cliente da API SERAp
  Quero consultar um arquivo pelo seu ID
  Para validar que os dados da prova estão corretos

  Background:
    Given que possuo um token de autenticação válido

  Scenario: Consultar arquivo existente da prova
    When eu consulto o arquivo com o ID 10
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter o arquivo com os dados esperados
