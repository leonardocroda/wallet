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
| :x:                      | Melhorias na segurança                      | Futuro    |
| :x:                      | Implementação de novas funcionalidades      | Futuro    |
| :x:                      | Escalabilidade e Performance                | Futuro    |

Legenda dos Emojis:

- :white_check_mark: : Etapa Concluída
- :hourglass_flowing_sand: : Etapa Em Progresso
- :x: : Etapa Futura

## Arquitetura da Solução

A arquitetura do projeto é baseada em microsserviços, com a seguinte estrutura:

![Desenho da arquitetura](https://lh3.googleusercontent.com/pw/AIL4fc9t-MtgdIy2UoRgFvqBB-qYThxoWgwUOanuAqe-dVQqOysjEEaaAB3f82Pa1dXDNtnB7KwrrkluziymKx--FbXAyzaX4z2d6kpcQx33nDUpQV6qNk0TM3FyGNxysKDJc9WFRl9S2oRKBw2bGsurSVfPGjau9gk4GOgIA8cGs7sJLdPaAMSo_1H_aL0Pbc_l2ewZNxd_sUGmvXsaCfTJgMozkR2gHc5guJbwjE3xEuUjq1cvd5Pki5zW1Gsl3PXQEoyRWcxTgPAitnlb9D2-D4g9T9gNYETvZu9Y6abEsOgDhHlhaUUcd-Nf1ZQsZ7j0LsIcD_2bCL1nnPf9sJEZ6nHsqlFVjFgbHMy8-0MWIxm50ZIcQN9wZImUfQQUhlXOYkswoJ6VBe-SJeH4uC978j6pdek8P5VxQBxKlVmUAQ_AL5Fzt4X_umNmsa5hQ5znWffJBE4QW77q18HldjcexVd-IYec3hYh1j0VVz0H46qCWlTRkwEvRGCtcbpiMKz54XN3jt9AweXnXvEBOpyBNoAmWcVCoyOcokuVN76aGKIdzQsVHx0mN--IG7Z2703ZHXWHYZ9ZYLhC7OotKbtrQ-SY0PylE51ZtVrvMPc5DTX6RTc-QqL3KDIQKDYVOhVnVTSkPml0NRKN3KSmYbVOG6SiFlEqQJqu4IawOaxWgR2ooZTpzkjx5EapOI4TDV4bAx7vURrN-Kk_VqClZhwqWF6vbLT5ZCF9-zFTb5ie4Skia1ceI3urZad_tT7Jfb_KHMjudTVCIwGCe8D-PxQGtPpZEXDM6K4IU0kWw2cOpSGUpJ3XdqOQNbKiN0PclyQIYY_1Q1jnXi_vBLcXgKhaRmf-u1rUb1fCacehjZg9egYGQuA4a_Zud19HJFMsqWvHJv3BvdmrRNalIbldXzDPNZl71TQ=w1325-h924-s-no?authuser=0)

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

Para executar os testes unitários de todos os microsserviços, utilize o seguinte comando:

```
docker-compose run --rm statement-service npm run test
docker-compose run --rm account-service npm run test
docker-compose run --rm auth-service npm run test
docker-compose run --rm api-gateway npm run test
```

## Contribuição

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório e clone-o em sua máquina local.
2. Crie um branch para suas alterações: `git checkout -b minha-feature`.
3. Faça as alterações desejadas e faça commit delas: `git commit -m 'Minha contribuição'`.
4. Envie suas alterações para o repositório remoto: `git push origin minha-feature`.
5. Crie um novo Pull Request explicando suas alterações e aguarde a revisão.

## Documentação

A documentação completa da API está disponível no Swagger em `http://localhost:3000/api`.
