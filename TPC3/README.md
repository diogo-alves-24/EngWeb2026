# TPC2: Servidor para o dataset Escola de Música
### Data: 18-02-2025
### UC: Engenharia Web (EW)

# Autor
### Nº Aluno: A106904
### Nome: Diogo Alves Ferreira
### Foto: 
<img src="photos/foto.jpeg"  width="100px" height="150px">

# Enunciado
- Criar um json-server com o dataset da escola de música (feito nas aulas da semana2); 
- Criar um servidor aplicacional para responder aos seguintes serviços: . /alunos - Tabela HTML com os dados de todos os alunos; . /cursos - Tabela HTML com os a informação de todos os cursos; . /instrumentos - Tabela HTML com os dados dos vários instrumentos.

# Resumo
Neste projeto foi desenvolvido um servidor que serve como api de dados que os vai buscar a um json-server e fornece-os ao servidorApp que os transforma em páginas HTML para o cliente

# Arquitetura do Projeto
O sistema está dividido em dois servidores Node.js:
- API de Dados (Porta 7777): Atua como middleware, consumindo dados de um json-server (Porta 3000) e servindo-os em formato JSON.
- Servidor de Aplicação (Porta 7778): Consome a API de dados, processa a informação (agregações e cálculos) e gera páginas HTML dinâmicas utilizando W3.CSS para o design.

# Funcionalidades Implementadas
1. Gestão de Entidades Base
- Alunos: Listagem completa com ID, Nome, Data de Nascimento e Instrumento.
- Cursos: Exibição dos cursos disponíveis, incluindo o tratamento de campos complexos como o nome do instrumento (mapeamento de propriedades com caracteres especiais como #text).
- Instrumentos: Índice de todos os instrumentos registados.