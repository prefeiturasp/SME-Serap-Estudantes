Feature: Consultar arquivo por ID
  Como um cliente da API
  Quero consultar um arquivo pelo seu ID
  Para obter suas informações cadastradas

  Scenario: Consultar arquivo existente
    Given que possuo um endpoint da API de arquivos
    When eu consulto o arquivo com ID 123
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter os campos esperados

  Scenario: Consultar arquivo inexistente
    Given que possuo um endpoint da API de arquivos
    When eu consulto o arquivo com ID 999999
    Then o status da resposta deve ser 500
    And a resposta deve conter uma mensagem de erro