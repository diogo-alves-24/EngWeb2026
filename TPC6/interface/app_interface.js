const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:7789/cinema";

app.get('/filmes', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    axios.get("http://api_dados:7789/filmes")
    .then(resp => {
        const filmesData = resp.data;

        res.render('index_filmes', {
            filmes: filmesData,
            date: d
        });
    })
    .catch(err => {
        res.render('error', {
            error: err,
            message: "Erro ao obter filmes da API"
        });
    });
});

app.get('/filmes/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    axios.get("http://api_dados:7789/filmes/" + req.params.id)
    .then(resp => {
        const filmeData = resp.data;

        res.render('filme', {
            filme: filmeData,
            date: d
        });
    })
    .catch(err => {
        res.render('error', {
            error: err,
            message: "Erro ao obter filmes da API"
        });
    });
});

app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    Promise.all([
        axios.get("http://api_dados:7789/atores"),
        axios.get("http://api_dados:7789/filmes")
    ])
    .then(([atoresResp, filmesResp]) => {

        const atores = atoresResp.data;
        const filmes = filmesResp.data;

        const atoresComTotal = atores.map(a => {
            const totalFilmes = filmes.filter(f => (f.cast || []).includes(a.id)).length;
            return {
                ...a,
                totalFilmes: totalFilmes
            };
        });

        res.render('index_atores', {
            atores: atoresComTotal,
            date: d
        });
    })
    .catch(err => {
        res.render('error', {
            error: err,
            message: "Erro ao obter dados da API"
        });
    });
});

app.get('/atores/:id', async (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    try {
        const id = Number(req.params.id);

        const [atorResp, filmesResp] = await Promise.all([
            axios.get("http://api_dados:7789/atores/" + req.params.id),
            axios.get("http://api_dados:7789/filmes")
        ]);

        const atorData = atorResp.data;
        const filmesDoAtor = filmesResp.data.filter(f => (f.cast || []).includes(id));

        res.render('ator', {
            ator: atorData,
            filmes: filmesDoAtor,
            nfilmes: filmesDoAtor.length,
            date: d
        });
    } catch (err) {
        res.render('error', {
            error: err,
            message: "Erro ao obter dados da API"
        });
    }
});

app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    Promise.all([
        axios.get("http://api_dados:7789/generos"),
        axios.get("http://api_dados:7789/filmes")
    ])
    .then(([generosResp, filmesResp]) => {

        const generos = generosResp.data;
        const filmes = filmesResp.data;

        const generosComTotal = generos.map(g => {
            const totalFilmes = filmes.filter(f => (f.cast || []).includes(g.id)).length;
            return {
                ...g,
                totalFilmes: totalFilmes
            };
        });

        res.render('index_generos', {
            generos: generosComTotal,
            date: d
        });
    })
    .catch(err => {
        res.render('error', {
            error: err,
            message: "Erro ao obter dados da API"
        });
    });
});

const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/publicacoes`);
});