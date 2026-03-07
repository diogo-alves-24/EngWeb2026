# TPC5: Servidor para o dataset Cinema
### Data: 07-03-2026
### UC: Engenharia Web (EW)

# Autor
### Nº Aluno: A106904  
### Nome: Diogo Alves Ferreira  
### Foto:
<img src="photos/foto.jpeg" width="100px" height="150px">

# Enunciado
- Colocar o json-server a correr com o dataset de filmes.
- Criar uma aplicação web com express que responda aos seguintes serviços:
  - / ou /filmes → tabela com id, título, ano, nº de géneros e nº de atores.
  - /filmes/:id → página com toda a informação de um filme.
  - /atores → tabela com ator e nº de filmes em que participa.
  - /atores/:id → página do ator com os filmes em que participou.
  - Extra: páginas para géneros (/generos e /generos/:id).

# Resumo
Neste projeto foi criada uma aplicação web que utiliza um json-server para fornecer um dataset de filmes.  
O servidor Express faz pedidos ao json-server usando axios, processa os dados e gera páginas HTML utilizando Pug.

# Arquitetura do Projeto
O sistema é composto por dois componentes:
- json-server (porta 3000) que fornece os dados do dataset em formato JSON.
- servidor Express (porta 7777) que consome esses dados e gera páginas HTML.

# Funcionalidades Implementadas
- Listagem de filmes com informação resumida.
- Página individual de cada filme.
- Listagem de atores com número de filmes em que participam.
- Página de ator com lista dos seus filmes.
- (Extra) Listagem de géneros e página com filmes de cada género.