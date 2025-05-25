
# AnotaAi Challenge

- [Desafio proposto](https://github.com/githubanotaai/new-test-backend-nodejs)



Construir uma API para que usuários consigam gerenciar catálogos dentro de uma aplicação marketplace, podendo criar, atualizar e deletar uma categorias e produtos.

A cada criação/atualização de uma categoria ou produto, deve ser enviado uma mensagem para um serviço SQS informando o ID do usuário, para que seja gerado um novo arquivo com todos os dados do catálogo e enviado para um serviço S3.

## Arquitetura de referência
![image](https://github.com/githubanotaai/new-test-backend-nodejs/assets/52219768/504ba448-f128-41db-ae86-18dc19c0dc9d)
- obs: o catálogo também é atualizado quando há a exclusão de uma categoria ou produto.





## Tecnologias utilizadas

- NodeJS
- Typescript
- MongoDB
- Docker
    - Localstack (simular serviços da AWS)
- Terraform (IaC)

    
## Funcionalidades

- Autenticação via token
- Criação, atualização e exclusão de Categorias
- Criação, atualização e exclusão de Produtos
- Produção e consumo de mensagens
- Geração de arquivo para catalogar todos os produtos de um usuário

## Rodando localmente
#### Requisitos mínimos:
- Docker instalado
- Conta na [Localstack](https://app.localstack.cloud/sign-in)

Clone o projeto
```bash
  git clone https://github.com/eduufreire/anotaai-challenge-backend-nodejs
```

```bash
  cd anotaai-challenge-backend-nodejs
```

Crie os containers docker
```bash
  docker compose up -d
```

Acesse o Mongo Express para verificar as inserções:
[dashboard](http://localhost:8081/db/catalogos)

Acesse o Localstack para verificar os arquivos gerados no S3:
[dashborad](https://app.localstack.cloud/inst/default/status)

Importe a [collection](https://github.com/eduufreire/anotaai-challenge-backend-nodejs/blob/develop/collection-api.yamlink) no Postman ou Insomnia para testar os endpoits


## Documentação da API

#### URL base: http://localhost:9999/

#### Autenticação (Obrigatória)

```http
  POST login/
```

#### Logins disponíveis:
- email: user1@gmail | senha: 123
- email: user2@gmail | senha: 456
- email: user3@gmail | senha: 789

#### Body
| Campos   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email cadastrado |
| `password` | `string` | **Obrigatório**. Senha cadastrada |


## Categorias
Criar uma nova categoria:
```http
  POST categories/
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |

#### Body
| Campos   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. Título da categoria |
| `description` | `string` | **Obrigatório**. Descrição da categoria |

#### ㅤㅤ

Atualizar dados de uma categoria:
```http
  PATCH categories/:category_id
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |

#### Body
| Campos   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Opcional**. Título da categoria |
| `description` | `string` | **Opcional**. Descrição da categoria |


#### ㅤㅤ

Deletar uma categoria:
```http
  DELETE categories/:category_id
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |


## Produtos
Criar um novo produto:
```http
  POST products/
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |

#### Body
| Campos   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. Título do produto |
| `description` | `string` | **Obrigatório**. Descrição do produto |
| `price` | `number` | **Obrigatório**. Preço do produto |
| `categoryId` | `string` | **Obrigatório**. ID da categoria que deseja associar o produto |


#### ㅤㅤ

Atualizar um produto:
```http
  PATCH products/:product_id
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |

#### Body
| Campos   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Opcional**. Título do produto |
| `description` | `string` | **Opcional**. Descrição do produto |
| `price` | `number` | **Opcional**. Preço do produto |
| `categoryId` | `string` | **Opcional**. ID da categoria que deseja associar o produto 


#### ㅤ

Deletar um produto:
```http
  DELETE products/:product_id
```

#### Headers
| Campos   | Tipo       |
| :---------- | :--------- |
| `Authorization` | `Bearer <token>` |