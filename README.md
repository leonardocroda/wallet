## Wallet API

Este é o projeto da API da aplicação Wallet, que consiste em um conjunto de microsserviços desenvolvidos em NestJS para gerenciar uma carteira digital com extrato. Os microsserviços incluem o `statement-service`, `account-service`, `auth-service` e o `api-gateway`, cada um com sua função específica no sistema.

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

## Organização do Projeto

O projeto Wallet API segue uma estrutura organizada, com base na separação de responsabilidades e na arquitetura de microsserviços. Cada microsserviço contém uma estrutura semelhante, com divisão em módulos, e cada um desses módulos é dividido em camadas para facilitar a manutenção, escalabilidade, testabilidade e entendimento do código. Cada camada tem uma responsabilidade específica:

### 1. Application Layer:

A camada de Application é responsável por lidar com as interfaces de comunicação externa e receber/responder a requisições HTTP ou outras formas de comunicação com os clientes, como gRPC e AMQP.

- **Controllers:** Cada microsserviço possui controllers que atuam como pontos de entrada para as requisições HTTP. Eles são responsáveis por receber os dados enviados pelos clientes, invocar os casos de uso adequados e enviar as respostas de volta aos clientes.

- **Data Transfer Objects (DTOs):** Os DTOs são estruturas de dados que representam a forma como os dados são transferidos entre a camada de Application e as outras camadas. Eles ajudam a garantir uma comunicação clara e consistente entre as diferentes partes do sistema.

### 2. Domain Layer:

A camada de Domain contém a lógica de negócio central do microsserviço, incluindo entidades e casos de uso específicos.

- **Entidades:** As entidades representam os conceitos fundamentais do domínio e contêm os dados e comportamentos essenciais do microsserviço. Elas encapsulam a lógica do negócio.

- **Casos de Uso (Use Cases):** Os casos de uso contêm a lógica de negócio específica para cada funcionalidade do microsserviço. Eles manipulam as entidades e implementam as regras de negócio necessárias para realizar operações específicas.

- **Interfaces de Gateway:** As interfaces de gateway definem contratos para a interação entre a camada de Domain e a camada de Infrastructure. Elas permitem a separação entre as implementações concretas das operações de infraestrutura.

### 3. Infrastructure Layer:

A camada de Infrastructure contém os detalhes de implementação específicos da infraestrutura, como acesso ao banco de dados, integrações com serviços externos e outras operações que não pertencem diretamente à lógica de negócio.

- **Implementação dos Gateways:** Nesta camada, são implementadas as interfaces de gateway definidas na camada de Domain. As implementações concretas conectam as operações da aplicação aos serviços e recursos externos.

- **Comunicação com Banco de Dados:** Aqui estão localizados os códigos relacionados à conexão e interação com o banco de dados, permitindo o armazenamento e a recuperação dos dados do microsserviço.

- **Integrações Externas:** Caso o microsserviço precise interagir com outros serviços externos ou sistemas, essa camada é o local onde essas integrações são implementadas.

### Injeção de dependências

Cada módulo possui um arquivo {nome-do-modulo}.module.ts, é nesse arquivo que são injetadas as implementações dos gateways da camada de domínio, nele também são configuradas as conexões (a depender da necessidade do módulo, com o banco de dados, RabbitMQ e gRPC).

## Executando o Projeto

1. Você precisa possuir o Docker e o docker-compose instalados em sua máquina
2. Clone o repositório: `git clone https://github.com/leonardocroda/wallet.git`
3. Para executar o projeto e os microsserviços, basta usar o comando:

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

   - `GET /statement`: Obtém os dados do extrato da carteira digital.

4. **Compra:**

   - `POST /statement/purchase`: Adiciona uma compra ao extrato.

5. **Transferência:**

   - `POST /statement/transfer`: Adiciona uma transferÊncia ao extrato.

## Testes

Para executar os testes unitários pela primeira vez de todos os microsserviços, com o Nodejs instalado, utilize os seguintes comandos:

```
chmod +x install-dependencies.sh
```

```
chmod +x test.sh
```

```
./install-dependencies.sh
```

```
./test.sh
```

## Documentação

A documentação completa da API está disponível no Swagger em `http://localhost:3000/api`.
