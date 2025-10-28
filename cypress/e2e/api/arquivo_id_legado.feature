Feature: Consultar arquivo legado por ID
  Como cliente da API
  Quero consultar um arquivo legado pelo seu ID
  Para validar o retorno do endpoint /api/v1/arquivos/{id}/legado

  Scenario: Consultar arquivo legado existente
    Given que possuo um token de autenticação válido
    When eu consulto o arquivo legado com o ID 0
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter os campos esperados
        | id          |
        | nome        |
        | tamanho     |
        | tipo        |
        | dataCriacao |
        