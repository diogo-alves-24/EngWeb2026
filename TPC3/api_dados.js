axios = require("axios")
http = require("http")


myServer = http.createServer(async function(req, res) {
    if(req.method == "GET"){
        if(req.url == "/alunos"){
            const resp = await axios.get("http://localhost:3000/alunos")
            res.writeHead(200, {'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(resp.data))
        }
        else if(req.url == "/cursos"){
            const resp = await axios.get("http://localhost:3000/cursos")
            res.writeHead(200, {'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(resp.data))
        }
        else if(req.url == "/instrumentos"){
            const resp = await axios.get("http://localhost:3000/instrumentos")
            res.writeHead(200, {'Content-type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(resp.data))
        }
        else{
            res.writeHead(404, {'Content-type':'text/html;charset=utf-8'})
            res.end("Caminho não existente.")
        }
    }
    else{
        res.writeHead(404, {'Content-type':'text/html;charset=utf-8'})
        res.end("Método não supostado.")
    }

}).listen(7777)

console.log("API de dados à escuta na porta: 7777")