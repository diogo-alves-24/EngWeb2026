# TPC6: Aplicação Web Cinema com Docker
### Data: 14-03-2026  
### UC: Engenharia Web (EW)

# Autor
### Nº Aluno: A106904  
### Nome: Diogo Alves Ferreira  
### Foto:
<img src="photos/foto.jpeg" width="100px" height="150px">

# Enunciado
Desenvolver uma aplicação web baseada no dataset **Cinema**, utilizando **MongoDB** como base de dados e **Docker** para executar todos os serviços.

A aplicação é composta por:
- Uma **API de dados** que fornece acesso aos dados armazenados em MongoDB.
- Uma **interface web** que consome essa API e apresenta os dados ao utilizador.
- Um **sistema de containers Docker** que executa todos os serviços.

A aplicação disponibiliza os seguintes serviços:

- `/filmes` → tabela com título, ano, nº de atores e nº de géneros.  
- `/filmes/:id` → página com informação detalhada de um filme.  
- `/atores` → tabela com atores e nº de filmes em que participam.  
- `/atores/:id` → página do ator com os filmes em que participou.  
- `/generos` → tabela com géneros.  
- `/generos/:id` → página com os filmes desse género.  

# Resumo

Neste projeto foi desenvolvida uma aplicação web para exploração de um dataset de filmes.

A arquitetura da aplicação foi dividida em três componentes principais:

- **MongoDB** para armazenamento dos dados.
- **API de dados** desenvolvida em Express e Mongoose.
- **Interface web** desenvolvida em Express e Pug.

A comunicação entre a interface e a API é feita através da biblioteca **Axios**.

Todos os serviços são executados em **containers Docker**, geridos através de **Docker Compose**, permitindo uma execução simples e consistente do sistema.

# Arquitetura do Projeto

A aplicação é composta por três serviços principais.

## MongoDB

Base de dados responsável por armazenar o dataset.

Coleções utilizadas:
- `filmes`
- `atores`
- `generos`

Os dados são carregados automaticamente através de um **script de inicialização** executado quando o container arranca.

Porta utilizada: 27017

## API de Dados

Servidor **Express + Mongoose** responsável por aceder ao MongoDB e disponibilizar endpoints REST.

Exemplos de endpoints:
- GET /filmes
- GET /filmes/:id

- GET /atores
- GET /atores/:id

- GET /generos
- GET /generos/:id

Porta utilizada: 7789

## Interface Web

Servidor Express responsável por gerar páginas HTML utilizando **Pug**.

Este servidor faz pedidos à API através de **Axios** para obter os dados necessários.

Exemplos de páginas:
- /filmes
- /filmes/:id

- /atores
- /atores/:id

- /generos
- /generos/:id

Porta utilizada: 7790

# Docker e Docker Compose

A aplicação é executada através de **Docker Compose**, que cria e liga todos os containers necessários.

Serviços definidos:

- `mongodb`
- `api_dados`
- `interface`

Todos os serviços comunicam através de uma rede Docker: cinema-network

# Execução da Aplicação

Para iniciar todos os serviços: **docker compose up --build**

# Funcionalidades Implementadas

## Filmes
Listagem de filmes com:
- título
- ano
- número de atores
- número de géneros

Página detalhada de cada filme com:
- título
- ano
- lista de atores
- lista de géneros

## Atores
Listagem de atores com:
- nome
- número de filmes em que participam

Página individual de cada ator com:
- nome
- lista de filmes em que participou

## Géneros
Listagem de géneros.
- Página com os filmes associados a cada género.
