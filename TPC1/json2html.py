import json, os, shutil

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data


def create_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)


def make_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)


#--------------------- Página Principal ---------------------

html= '''
    <html>
        <head>
            <title>Reparações</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <ul>
                <li><a href="reparacoes.html">Listagem de Reparações</a></li>
                <li><a href="tiposIntervencoes.html">Listagem dos Tipos de Intervenções</a></li>
                <li><a href="marcasModelos.html">Listagem das marcas e modelos dos carros intervencionados</a></li>
            <ul>
        </body>
    </html>
'''

make_dir("output")
create_file("./output/index.html", html)



#--------------------- Página Listagens de Reparações ---------------------
data = open_json("dataset_reparacoes.json")
dados_reparacoes = data["reparacoes"]
reparacoes = ''

for d in dados_reparacoes:
    reparacoes += f'''
        <li>
            <a href="{d["data"]}_{d["viatura"]["matricula"]}.html">
                {d["data"]} - {d["nif"]} - {d["nome"]} - {d["viatura"]["marca"]} - {d["viatura"]["modelo"]} - {d["nr_intervencoes"]}'
            </a>
        </li>
'''

html = f'''
    <html>
        <head>
            <title>Listagens de Reparações</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Listagens de Reparações</h2>
            <ul>
                {reparacoes}
            </ul>
        </body>
    </html>
'''

create_file("./output/reparacoes.html", html)



#----------------- Página da Reparação ------------------

for d in dados_reparacoes:
    linhasTabela = ''
    listaIntervencoes = ''

    intervencoes = d["intervencoes"]
    for intervencao in intervencoes:
        listaIntervencoes += f'''
            <li>
                <ul>
                    <li>{intervencao["codigo"]}</li>
                    <li>{intervencao["nome"]}</li>
                    <li>{intervencao["descricao"]}</li>
                </ul>
            </li>
        '''


    linhasTabela += f'''
        <tr>
            <td>{d["nome"]}</td>
            <td>{d["nif"]}</td>
            <td>{d["data"]}</td>
            <td>{d["viatura"]["marca"]}</td>
            <td>{d["viatura"]["modelo"]}</td>
            <td>{d["viatura"]["matricula"]}</td>
            <td>{d["nr_intervencoes"]}</td>
            <td>
                <ul>{listaIntervencoes}</ul>
            </td>
        </tr>
    '''

    html = f'''
        <html>
            <head>
                <title>Reparação {d["data"]}_{d["viatura"]["matricula"]}</title>
                <meta charset="utf-8"/>
            </head>
            <body>
            <h2>Reparação {d["data"]}_{d["viatura"]["matricula"]}</h2>
                <table border="1">
                    <tr>
                        <th>Nome</th>
                        <th>Nif</th>
                        <th>Data</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Matrícula</th>
                        <th>Nº Intervenções</th>
                        <th>Intervenções</th>
                    <tr>
                    {linhasTabela}
                </table>
            </body>
        </html>
    '''

    create_file(f"./output/{d["data"]}_{d["viatura"]["matricula"]}.html", html)
