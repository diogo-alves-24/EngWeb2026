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
            <h2>Lista de Dados Consultáveis</h2>
            <ul>
                <li><a href="reparacoes.html">Listagem de Reparações</a></li>
                <li><a href="tiposIntervencao.html">Listagem dos Tipos de Intervenções</a></li>
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
            <a href="reparacoes/{d["data"]}_{d["viatura"]["matricula"]}.html">
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
            <a href="../output/index.html">Voltar ao Índice</a>
        </body>
    </html>
'''

create_file("./output/reparacoes.html", html)



#----------------- Página da Reparação ------------------
make_dir("./output/reparacoes")

for d in dados_reparacoes:
    linhasTabelaReparacoes = ''
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


    linhasTabelaReparacoes += f'''
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
                    {linhasTabelaReparacoes}
                </table>
                <a href="../reparacoes.html">Voltar ao Índice das Reparações</a>
            </body>
        </html>
    '''

    create_file(f"./output/reparacoes/{d["data"]}_{d["viatura"]["matricula"]}.html", html)



#---------------- Página Listagem Tipos de Intervenção -----------------------

itemsTiposIntervencoes = set()
infoTipoIntervencao = dict()
reparacoesPorTipoIntervencao = dict()

for d in dados_reparacoes:
    for intervencao in d["intervencoes"]:
        itemsTiposIntervencoes.add(f'''
            <li>
                <a href="tiposIntervencao/{intervencao["codigo"]}.html">{intervencao["codigo"]}-{intervencao["nome"]}-{intervencao["descricao"]}</a>
            </li>
        ''')

        if intervencao["codigo"] not in reparacoesPorTipoIntervencao:
            reparacoesPorTipoIntervencao[intervencao["codigo"]] = ""

        reparacoesPorTipoIntervencao[intervencao["codigo"]] += f'''
            <li>
                <a href="../reparacoes/{d["data"]}_{d["viatura"]["matricula"]}.html">{d["data"]}_{d["viatura"]["matricula"]}</a>
            </li>
        '''

        infoTipoIntervencao[intervencao["codigo"]] = (intervencao["nome"], intervencao["descricao"])


itemsTiposIntervencoes = sorted(itemsTiposIntervencoes)
listaItemsTiposIntervencoes = ""

for item in itemsTiposIntervencoes:
    listaItemsTiposIntervencoes += item

html = f'''
    <html>
        <head>
            <title>Listagem de Tipos de Intervenção</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Listagem de Tipos de Intervenção</h2>
            <ul>
                {listaItemsTiposIntervencoes}
            </ul>
            <a href="../output/index.html">Voltar ao Índice</a>
        </body>
    </html>
'''

create_file(f"./output/tiposIntervencao.html", html)


#------------ Páginas Dados das Intervenções ------------------
make_dir("./output/tiposIntervencao")

for codigo, info in infoTipoIntervencao.items():
    nome, descricao = info
    linhasTabelaTipoIntervencao = ""
    linhasListaReparacoes = ""

    linhasTabelaTipoIntervencao = f'''
        <tr>
            <td>{codigo}</td>
            <td>{nome}</td>
            <td>{descricao}</td>
            <td>
                <ul>
                    {reparacoesPorTipoIntervencao[codigo]}
                </ul>
            </td>
        </tr>
    '''

    html = f'''
        <html>
            <head>
                <title>Tipo Intervenção: {codigo}</title>
                <meta charset="utf-8"/>
            </head>
            <body>
                <h2>Tipo Intervenção: {codigo}</h2>
                <table>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Lista de Reparações</th>
                    </tr>
                    {linhasTabelaTipoIntervencao}
                </table>
                <a href="../tiposIntervencao.html">Voltar ao Índice das Intervenções</a>
            </body>
        </html>
    '''

    create_file(f"./output/tiposIntervencao/{codigo}.html", html)


#--------- Página Marcas/Modelos -------------
quantMarcasModelos = dict()
setMarcasModelos = set()
linhasMarcasModelos = ''

for d in dados_reparacoes:
    marcaModelo = d["viatura"]["marca"] + "_" + d["viatura"]["modelo"]
    
    if marcaModelo not in quantMarcasModelos:
        quantMarcasModelos[marcaModelo] = 0
    
    quantMarcasModelos[marcaModelo] += 1


for d in dados_reparacoes:
    marcaModelo = d["viatura"]["marca"]+'_'+d["viatura"]["modelo"]

    setMarcasModelos.add(f'''
            <li>
                <a href="modelosMarcas/{marcaModelo}.html">
                    {marcaModelo}_{quantMarcasModelos[marcaModelo]}
                </a>
            </li>
    ''')

setMarcasModelos = sorted(setMarcasModelos)

html = f'''
    <html>
        <head>
            <title>Marcas/Modelos</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Marcas/Modelos</h2>
            <ul>
                {'\n'.join(setMarcasModelos)}
            </ul>
            <a href="../output/index.html">Voltar ao Índice</a>
        </body>
    </html>
'''

create_file("./output/marcasModelos.html", html)


#---------- Páginas Marcas/Modelos -------------
make_dir("./output/modelosMarcas")

for d in dados_reparacoes:
    dadosFiltrados = list(filter(lambda l: (l["viatura"]["marca"] == d["viatura"]["marca"]) and (l["viatura"]["modelo"] == d["viatura"]["modelo"]), dados_reparacoes))
    
    matriculas = ''
    for df in dadosFiltrados:
        matriculas += f'''
            <li>
                {df["viatura"]["matricula"]}
            </li>
        '''

    html = f'''
        <html>
            <head>
                <title>{d["viatura"]["marca"]}_{d["viatura"]["modelo"]}</title>
                <meta charset="utf-8"/>
            </head>
            <body>
                <h2>Marca: {d["viatura"]["marca"]} - Modelo: {d["viatura"]["modelo"]}</h2>
                <table border="1">
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Matrículas</th>
                    </tr>
                    <tr>
                        <td>{d["viatura"]["marca"]}</td>
                        <td>{d["viatura"]["modelo"]}</td>
                        <td>
                            <ul>
                                {matriculas}
                            </ul>
                        </td>
                    </tr>
                </table>
                <a href="../marcasModelos.html">Voltar ao Índice das Marcas/Modelos</a>
            </body>
        </html>
    '''    

    create_file(f"./output/modelosMarcas/{d["viatura"]["marca"]}_{d["viatura"]["modelo"]}.html", html)
    