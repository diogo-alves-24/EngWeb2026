# TPC2: Servidor para o dataset Oficina
### Data: 11-02-2025
### UC: Engenharia Web (EW)

# Autor
### Nº Aluno: A106904
### Nome: Diogo Alves Ferreira
### Foto: 
<img src="photos/foto.jpeg"  width="100px" height="150px">

# Enunciado
Criar 1 json-server com o dataset das reparacoes
Criar um servidor aplicacional para responder aos seguintes servicos:
    1. `/reparacoes` - Tabela HTML com os dados das reparacoes
    2. `/intervencoes` - Tabela HTML com os diferentes tipos de intervencao, sem repeticoes e com o numero de vezes que foram feitas
    3. `/viaturas` - Tabela HTML com os dados dos tipos de viatura intervencionados (sem repeticoes) e o numero de vezes que cada modelo foi reparado

# Resumo
Neste projeto conseguimos aceder a páginas HTML com o conteúdo presente no dataset acedendo a um servidor http, especificando no URL a página que queremos, como: "/reparacoes", "/viaturas" e "/intervenções".

## Dados Listados
* Na página "/reparacoes" são listadas todas as reparações presentes no dataset com a seguinte estrutura:
    - Nome; NIF; Data; Marca; Modelo; Matrícula; Nr Intervenções; Códigos Intervenções (lista dos códigos das intervenções feitas na reparação).

* Na página "/viaturas" é listada a quantidade de intervenções feitas a cada viatura de uma dada Marca e Modelo com a estrutura:
    - Marca; Modelo; Nr Intervenções.

* Na página "/intervencoes" temos os dados de cada tipo de intervenção:
    - Código; Nome; Descrição; Nr Intervenções (total de intervenções feitas daquele tipo).