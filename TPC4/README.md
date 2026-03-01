# TPC4: Servidor para EMD com Pug
### Data: 25-02-2025
### UC: Engenharia Web (EW)

# Autor
### Nº Aluno: A106904
### Nome: Diogo Alves Ferreira
### Foto: 
<img src="photos/foto.jpeg"  width="100px" height="150px">

# Enunciado
Desenvolver uma aplicação web para gestão de registos EMD (Exames Médico-Desportivos), utilizando Node.js e Pug, com suporte às seguintes funcionalidades:

- Listagem de todos os registos EMD;
- Visualização individual de um registo;
- Inserção de novos registos;
- Edição de registos existentes;
- Remoção de registos;
- Página de estatísticas com distribuições dos registos por:
  - sexo
  - modalidade
  - clube
  - resultado
  - federado

# Resumo

Neste projeto foi desenvolvido um servidor aplicacional em Node.js responsável por consumir dados de um json-server e gerar páginas HTML dinâmicas através de templates Pug.

A aplicação permite realizar operações CRUD completas sobre registos EMD e inclui uma página de estatísticas que apresenta distribuições dos dados armazenados.

O layout foi construído utilizando **W3.CSS**, garantindo uma interface simples e consistente.

---

# Arquitetura do Projeto

O sistema está dividido em dois componentes principais:

## JSON Server (Porta 3000)
- Atua como base de dados REST.
- Armazena os registos EMD em formato JSON.
- Disponibiliza endpoints HTTP:
  - GET
  - POST
  - PUT
  - DELETE

## Servidor Aplicacional (Porta 7777)
- Desenvolvido em Node.js (HTTP module).
- Consome a API REST através de **Axios**.
- Processa os dados.
- Gera páginas HTML dinâmicas com **Pug**.
- Serve recursos estáticos (CSS).

# Funcionalidades Implementadas

## Listagem de EMD
- Endpoint: `/emd`
- Apresenta todos os exames numa tabela HTML.
- Ordenação por data do exame.

---

## Visualização Individual
- Endpoint: `/emd/:id`
- Mostra informação detalhada de um registo EMD.

---

## Inserção de Registos
- Endpoint: `/emd/registo`
- Formulário HTML para criação de novos exames.
- Envio via método POST.

---

## Edição de Registos
- Endpoint: `/emd/editar/:id`
- Pré-preenchimento automático do formulário.
- Atualização através de PUT no json-server.

---

## Remoção de Registos
- Endpoint: `/emd/apagar/:id`
- Remove o registo selecionado.
- Redireciona para a página principal.

---

## Estatísticas
- Endpoint: `/emd/stats`

Apresenta distribuições dos registos por:

- Sexo
- Modalidade
- Clube
- Resultado
- Federado

