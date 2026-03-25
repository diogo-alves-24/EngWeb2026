const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API
const API_URL = process.env.API_URL || "http://api:16025";

// Logger
app.use((req, res, next) => {
    const d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);
    next();
});

// Página principal
app.get('/', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);

    axios.get(`${API_URL}/repairs`)
        .then(resp => {
            res.render('index_repairs', {
                repairs: resp.data,
                date: d
            });
        })
        .catch(err => {
            res.render('error', {
                error: err,
                message: "Erro ao obter reparações da API"
            });
        });
});


// :id
// :marca
app.get('/:param', async (req, res) => {
    const d = new Date().toISOString().substring(0, 16)
    const p = req.params.param

    try {
        if (/^[0-9a-fA-F]{24}$/.test(p)) {
            const resp = await axios.get(`${API_URL}/repairs/${p}`)
            return res.render('repair', {
                repair: resp.data,
                date: d
            })
        }

        const resp = await axios.get(`${API_URL}/repairs?marca=${encodeURIComponent(p)}`)
        const repairs = resp.data
        const modelos = [...new Set(
            repairs.map(r => r.viatura?.modelo).filter(Boolean)
        )].sort()

        return res.render('marca', {
            marca: p,
            repairs,
            modelos,
            date: d
        })
    } catch (err) {
        res.render('error', {
            error: err,
            message: "Erro ao obter dados da API"
        })
    }
})

const PORT = 16026;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}`);
});