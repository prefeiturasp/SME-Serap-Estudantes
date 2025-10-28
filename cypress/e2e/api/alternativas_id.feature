
Feature: Consultar alternativa por ID
  Como um cliente da API
  Quero consultar uma alternativa pelo seu ID
  Para obter as informações cadastradas

Scenario: Consultar alternativa existente
  Given que eu possuo um endpoint da API de alternativas
  When eu consulto a alternativa com o ID 96034733
  Then o status da resposta deve ser 200
  And o corpo da resposta deve conter os campos esperados

Scenario: Consultar alternativa existente sem autenticação
  Given que eu possuo o endpoint da API de alternativas
  When tento consultar a alternativa existe sem autenticação com o ID 96034733
  Then o status da resposta deve ser 401

Scenario: Consultar alternativa inexistente
  Given que eu possuo o endpoint da API de alternativas
  When eu consulto a alternativa com o ID 99999999
  Then o status da resposta deve ser 500
  And a resposta deve indicar que existem erros