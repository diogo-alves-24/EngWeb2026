var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js');
const { serveStaticResource } = require('./static.js');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var emd_server = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        return serveStaticResource(req, res)
    }
    else{
        try{
            switch (req.method){
                case 'GET':
                    // --- GET '/' ou '/emd' ---
                    if(req.url == "/" || req.url == "/emd"){
                        axios.get("http://localhost:3000/emd?_sort=dataEMD&_order=desc")
                        .then(resp => {
                            var emd = resp.data 
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.examesListPage(emd, d))
                        })
                    }
                    else if(req.url == "/emd/registo"){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.treinoFormPage(d))
                    }
                    else if (req.url == "/emd/stats") {
                        axios.get("http://localhost:3000/emd")
                        .then(resp => {
                            const lista = resp.data

                            const stats = {
                                sexo: {},
                                modalidade: {},
                                clube: {},
                                resultado: {},
                                federado: {}
                            }

                            lista.forEach(e => {

                                // sexo
                                stats.sexo[e.género] =
                                (stats.sexo[e.género] || 0) + 1

                                // modalidade
                                stats.modalidade[e.modalidade] =
                                (stats.modalidade[e.modalidade] || 0) + 1

                                // clube
                                stats.clube[e.clube] =
                                (stats.clube[e.clube] || 0) + 1

                                // resultado
                                stats.resultado[e.resultado] =
                                (stats.resultado[e.resultado] || 0) + 1

                                // federado
                                stats.federado[e.federado] =
                                (stats.federado[e.federado] || 0) + 1
                            })

                            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                            res.end(templates.statsPage(stats, d))
                        })
                    }
                    else if(/\/emd\/[0-9a-zA-Z]+$/.test(req.url)){
                        var idEMD = req.url.split('/')[2]
                        axios.get("http://localhost:3000/emd/" + idEMD)
                        .then(resp => {
                            var emd = resp.data
                            console.log("JSON: " + JSON.stringify(emd))
                            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                            res.end(templates.examePage(emd, d))
                        })
                    }
                    else if(/\/emd\/editar\/[0-9a-zA-Z]+$/.test(req.url)){
                        var idEMD = req.url.split('/')[3]
                        axios.get("http://localhost:3000/emd/" + idEMD)
                        .then(resp => {
                            const emd = resp.data
                            res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                            res.end(templates.treinoFormEditPage(emd, d))
                        })
                    }
                    else if(/\/emd\/apagar\/[0-9a-zA-Z]+$/.test(req.url)){
                        var idEMD = req.url.split("/")[3]
                        axios.delete("http://localhost:3000/emd/" + idEMD)
                        .then(resp => {
                            res.writeHead(302, {Location: '/emd'})
                            res.end()
                        })
                        .catch(err => {
                            console.log(err)
                            res.writeHead(500, {'Content-Type':'text/html;charset=utf-8'})
                            res.end("<p>Erro ao apagar registo.</p>")
                        })
                    }
                    break;
                case 'POST':
                    if(req.url == "/emd"){
                        collectRequestBodyData(req, result => {
                            const partes = result.nome.split(" ")
                            const novoEMD = {
                                dataEMD: result.data,
                                nome: {
                                    primeiro: partes[0],
                                    último: partes[1]
                                },
                                modalidade: result.modalidade,
                                resultado: result.duracao
                            }

                            axios.post("http://localhost:3000/emd", novoEMD)
                            .then(resp => {
                                res.writeHead(302, {Location: "/emd"})
                                res.end()
                            })
                        })
                    }
                    else if(/\/emd\/[0-9a-zA-Z]+$/.test(req.url)){
                        const idEMD = req.url.split('/')[2]

                        collectRequestBodyData(req, result => {
                            const partes = result.nome.split(" ")

                            const emdAtualizado = {
                                dataEMD: result.data,
                                nome: {
                                    primeiro: partes[0],
                                    último: partes[1]
                                },
                                modalidade: result.modalidade,
                                resultado: (result.resultado === "Passou") ? true : false
                            }

                            axios.put("http://localhost:3000/emd/" + idEMD, emdAtualizado)
                            .then(resp => {
                                res.writeHead(302, {Location: "/emd"})
                                res.end()
                            })

                        })
                    }

                    break;
            }
        }
        catch (error){
            //res.writeHead(400, {'Content-type':'text/html;charset=utf-8'})
            //res.end(`<p>Erro: ${error}</p>`)
        }
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")