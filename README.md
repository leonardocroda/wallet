## Wallet Digital API

Este é o projeto da API do aplicativo Wallet Digital, que consiste em um conjunto de microsserviços desenvolvidos em Node.js e NestJS para gerenciar uma carteira digital com extrato. Os microsserviços incluem o `statement-service`, `account-service`, `auth-service` e o `api-gateway`, cada um com sua função específica no sistema.

Claro! Vamos adicionar as novas etapas à tabela de progresso do projeto:

## Progresso do Projeto

| Etapa                    | Descrição                                   | Status    |
| ------------------------ | ------------------------------------------- | --------- |
| :white_check_mark:       | Modelagem do Banco de Dados                 | Concluído |
| :white_check_mark:       | Definição do Escopo de cada Microsserviço   | Concluído |
| :white_check_mark:       | Definição da Arquitetura dos Microsserviços | Concluído |
| :white_check_mark:       | Criação dos microsserviços                  | Concluído |
| :white_check_mark:       | Autenticação com JWT                        | Concluído |
| :white_check_mark:       | Configuração do RabbitMQ                    | Concluído |
| :white_check_mark:       | Atualização assíncrona do saldo             | Concluído |
| :white_check_mark:       | Comunicação síncrona com gRPC               | Concluído |
| :white_check_mark:       | Dockerização dos microsserviços             | Concluído |
| :white_check_mark:       | Documentação da API                         | Concluído |
| :hourglass_flowing_sand: | Testes de Integração                        | Futuro    |
| :hourglass_flowing_sand: | Melhorias na segurança                      | Futuro    |
| :hourglass_flowing_sand: | Implementação de novas funcionalidades      | Futuro    |
| :hourglass_flowing_sand: | Escalabilidade e Performance                | Futuro    |

Legenda dos Emojis:

- :white_check_mark: : Etapa Concluída
- :hourglass_flowing_sand: : Etapa Futura

## Arquitetura da Solução

A arquitetura do projeto é baseada em microsserviços, com a seguinte estrutura:

![Desenho da arquitetura](/assets/architecture.jpg)

1. **Statement Service:**

   - Responsável por registrar transferências e compras na tabela do extrato.
   - Permite consultar os dados do extrato.

2. **Account Service:**

   - Mantém o registro do saldo da conta.

3. **Auth Service:**

   - Responsável pela autenticação dos usuários.
   - Utiliza autenticação simples de usuário e senha para gerar um JWT.

4. **API Gateway:**
   - Recebe todas as requisições dos clientes.
   - Verifica a validade do token de autenticação, comunicando-se com o Auth Service.
   - Encaminha as chamadas para o serviço correspondente.

A comunicação entre a maioria dos microsserviços é síncrona, usando gRPC. No entanto, a atualização do saldo ocorre de forma assíncrona após o registro de uma transação no extrato. Essa atualização é realizada através de uma fila do RabbitMQ.

## Modelo do banco de dados

![Modelo do banco de dados](/assets/database-model.png)

## Pré-requisitos

- Docker e Docker Compose instalados em sua máquina.

## Instalação

2. Acesse o diretório do projeto: `cd wallet`

## Executando o Projeto

1. Clone o repositório: `git clone https://github.com/leonardocroda/wallet.git`
2. Para executar o projeto e os microsserviços, basta usar o comando:

```
docker-compose up -d
```

Isso iniciará todos os serviços e garantirá que estejam funcionando corretamente.

## Endpoints

A API estará disponível em `http://localhost:3000` através do API Gateway. Abaixo estão os principais endpoints disponíveis:

1. **Autenticação:**

   - `POST /auth/login`: Realiza a autenticação do usuário e gera um token JWT.

2. **Saldo da Conta:**

   - `GET /account/balance`: Obtém o saldo da conta.

3. **Extrato:**

   - `GET /transactions`: Obtém os dados do extrato da carteira digital.

4. **Compra:**

   - `POST /transactions/purchase`: Adiciona uma compra ao extrato.

5. **Transferência:**

   - `POST /transactions/transfer`: Adiciona uma compra ao extrato.

## Testes

Para executar os testes unitários pela primeira vez de todos os microsserviços, com o Nodejs instalado, utilize os seguintes comandos:

```
sudo chmod +x install-dependencies.sh
```

```
sudo chmod +x test.sh
```

```
./install-dependencies.sh
```

```
./test.sh
```

## Documentação

A documentação completa da API está disponível no Swagger em `http://localhost:3000/api`.
