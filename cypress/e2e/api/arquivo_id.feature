Feature: Consultar arquivo por ID
  Como um cliente da API de arquivos
  Quero consultar um arquivo pelo seu ID
  Para validar o comportamento da API em casos existentes e inexistentes

  Background:
    Given que possuo um token de autenticação válido

  Scenario: Consultar arquivo existente
    When eu consulto o arquivo com o ID 67
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter os campos esperados

  Scenario: Consultar arquivo inexistente (API retorna 200)
    When eu consulto o arquivo com um ID inexistente
    Then o status da resposta deve ser 200
    And a resposta deve indicar que existem erros
