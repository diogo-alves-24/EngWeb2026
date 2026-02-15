import axios from 'axios'
import { createServer } from 'http'

const domain = 'localhost'
const port = 7777

createServer(function (req, res){

    const url = req.url
    switch(url){
        case "/reparacoes":
            axios.get("http://localhost:3000/reparacoes")
            .then(resp => {
                let html = `
                <html>
                <head>
                    <title>Reparações</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <table border="1">
                        <tr>
                            <th>Nome</th>
                            <th>NIF</th>
                            <th>Data</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Matrícula</th>
                            <th>Nr Intervenções</th>
                            <th>Código Intervenção</th>
                        </tr>
                `
                const data = resp.data
                data.forEach(d => {
                    html += `
                        <tr>
                            <td>${d.nome}</td>
                            <td>${d.nif}</td>
                            <td>${d.data}</td>
                            <td>${d.viatura.marca}</td>
                            <td>${d.viatura.modelo}</td>
                            <td>${d.viatura.matricula}</td>
                            <td>${d.nr_intervencoes}</td>
                            <td>
                                <ul>
                    `  

                    d.intervencoes.forEach(i => {
                        html += `<li>${i.codigo}</li>`
                    })

                    html += `
                                </ul>
                            </td>
                        </tr>
                    `
                })
                html += `
                    </table>
                </body>
            </html>
                `   

                res.writeHead(200, {'Content-type':'text/html; charset="utf-8'})
                res.write(html)
                res.end()
            })
            
            break 
        case "/intervencoes":
            axios.get("http://localhost:3000/reparacoes")
            .then(resp => {
                const data = resp.data
                let quantTipo = new Map()

                data.forEach(d => {
                    d.intervencoes.forEach(i => {
                        if(!quantTipo.has(i.codigo)){
                            quantTipo.set(i.codigo, 0)
                        }
                        let valorAtual = quantTipo.get(i.codigo)
                        quantTipo.set(i.codigo, valorAtual + 1)
                    })
                })
                
                let setTrTiposIntervencao = new Set()

                data.forEach(a => {
                    a.intervencoes.forEach(i => {
                        const tr = `
                        <tr>
                            <td>${i.codigo}</td>
                            <td>${i.nome}</td>
                            <td>${i.descricao}</td>
                            <td>${quantTipo.get(i.codigo)}</td>
                        </tr>
                        `
                        //console.log(quantTipo.get(i.codigo))
                        setTrTiposIntervencao.add(tr)
                    })
                })
                
                let htmlTiposIntervencao = `
                    <html>
                        <head>
                            <title>Tipos Intervenção</title>
                            <meta charset="utf-8"/>
                        </head>
                        <body>
                            <table border="1">
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Nr Intervenções</th>
                                </tr>
                `

                setTrTiposIntervencao.forEach(tr => {
                    htmlTiposIntervencao += tr
                })

                htmlTiposIntervencao += `
                    </table>
                    </body>
                    </html>
                `

                res.writeHead(200, {'Content-type':'text/html; charset=utf8'})
                res.write(htmlTiposIntervencao)
                res.end()
            })
            break
        case '/viaturas':
            axios.get("http://localhost:3000/reparacoes")
            .then(resp => {
                let mapReparacoesViaturas = new Map()
                const data = resp.data

                data.forEach(d => {
                    const modeloMarca = d.viatura.marca + '_' + d.viatura.modelo
                    const quantReparacoes = d.nr_intervencoes

                    if(!mapReparacoesViaturas.has(modeloMarca)){
                        mapReparacoesViaturas.set(modeloMarca, 0)
                    }

                    const valorAtual = mapReparacoesViaturas.get(modeloMarca)
                    mapReparacoesViaturas.set(modeloMarca, valorAtual + quantReparacoes)
                })


                let htmlViaturas = `
                    <html>
                        <head>
                            <title>Viaturas</title>
                            <meta charset="utf-8"/>

                        </head>
                        <body>
                            <table border="1">
                                <tr>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Nr Intervenções</th>
                                </tr>
                `

                mapReparacoesViaturas.forEach((valor, chave) => {
                    const marcaModelo = chave.split("_");
                    htmlViaturas += `
                        <tr>
                            <td>${marcaModelo[0]}</td>
                            <td>${marcaModelo[1]}</td>
                            <td>${valor}</td>
                        </tr>    
                    `
                })

                htmlViaturas += `
                    </table>
                    </body>
                    </html>
                `

                res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                res.write(htmlViaturas)
                res.end()
            })


            break

        default:
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end("Página não encontrada")
            break
    }

}).listen(port);