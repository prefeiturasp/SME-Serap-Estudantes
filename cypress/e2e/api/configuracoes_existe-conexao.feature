Feature: Verificar conexão com o serviço de configurações
  Como um cliente da API
  Quero validar a resposta do endpoint de verificação de conexão
  Para garantir que o sistema retorna corretamente os códigos esperados

  Background:
    Given que possuo um token de autenticação válido

  Scenario: Validar conexão existente com o endpoint de configurações
    When eu envio uma requisição HEAD para o endpoint de verificação de conexão
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter "true"

  Scenario: Validar resposta 404 quando o endpoint de conexão não existe
    When eu envio uma requisição HEAD para o endpoint inexistente de verificação de conexão
    Then o status da resposta deve ser 404
