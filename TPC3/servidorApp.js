axios = require("axios")
http = require("http")

myServer = http.createServer(async function(req, res){
    if(req.method == "GET"){
        if(req.url == "/alunos"){
            try{
                var dados = await axios.get("http://localhost:7777/alunos")
                var linhasTabela = dados.data.map(d => `
                    <tr>
                        <td>${d.id}</td>
                        <td>${d.nome}</td>
                        <td>${d.dataNasc}</td>
                        <td>${d.curso}</td>
                        <td>${d.anoCurso}</td>
                        <td>${d.instrumento}</td>
                    </tr>    
                `).join('')

                html = `
                    <html>
                        <head>
                            <title>Alunos</title>
                            <meta charset="utf-8"/>
                        </head>
                        <body>
                            <h1>Alunos</h1>
                            <table border="1">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Data Nascimento</th>
                                    <th>Curso</th>
                                    <th>Ano Curso</th>
                                    <th>Instrumento</th>
                                </tr>
                                ${linhasTabela}
                            </table>
                        </body>
                    </html>
                `
                res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                res.end(html)
            }
            catch (error){
                res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
                res.end(`<p>Erro: ${error}</p>`)
            }
        }
        else if(req.url == "/cursos"){
            try{
                var dados = await axios.get("http://localhost:7777/cursos")
                var linhasTabela = dados.data.map(d => `
                    <tr>
                        <td>${d.id}</td>
                        <td>${d.designacao}</td>
                        <td>${d.duracao}</td>
                        <td>${d.instrumento.id}</td>
                        <td>${d.instrumento["#text"]}</td>
                    </tr>
                `).join('')

                html = `
                    <html>
                        <head>
                            <title>Alunos</title>
                            <meta charset="utf-8"/>
                        </head>
                        <body>
                            <h1>Cursos</h1>
                            <table border="1">
                                <tr>
                                    <th>ID</th>
                                    <th>Designação</th>
                                    <th>Duração</th>
                                    <th>ID Instrumento</th>
                                    <th>Nome Instrumento</th>
                                </tr>
                                ${linhasTabela}
                            </table>
                        </body>
                    </html>
                `
                res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                res.end(html)
            }
            catch (error){
                res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
                res.end(`<p>Erro: ${error}</p>`)
            }
        }
        else if(req.url == "/instrumentos"){
            try{
                var dados = await axios.get("http://localhost:7777/instrumentos")
                var linhasTabela = dados.data.map(d => `
                    <tr>
                        <td>${d.id}</td>
                        <td>${d["#text"]}</td>
                    </tr>
                `).join('')

                html = `
                    <html>
                        <head>
                            <title>Alunos</title>
                            <meta charset="utf-8"/>
                        </head>
                        <body>
                            <h1>Cursos</h1>
                            <table border="1">
                                <tr>
                                    <th>ID</th>
                                    <th>Instrumento</th>
                                </tr>
                                ${linhasTabela}
                            </table>
                        </body>
                    </html>
                `
                res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                res.end(html)
            }
            catch (error){
                res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
                res.end(`<p>Erro: ${error}</p>`)
            }
        }
        else{
            res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
            res.end(`<p>Caminho desconhecido: ${req.url}</p>`)
        }
    }
    else{
        res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
        res.end(`<p>Método não suportado: ${req.method}.</p>`)
    }
}).listen(7778)
console.log("Servidor à escuta na porta: 7778")