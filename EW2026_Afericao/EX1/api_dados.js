const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Logger
app.use((req, res, next) => {
    const d = new Date().toISOString().substring(0, 19);
    console.log(`${req.method} ${req.url} ${d}`);
    next();
});

// 1. Ligação ao MongoDB
const nomeBD = "autoRepair";
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`;

mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: ligado à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro na ligação ao MongoDB:', err));

// 2. Schema flexível para a coleção reparacoes
const reparacaoSchema = new mongoose.Schema(
    {},
    {
        strict: false,
        collection: 'repairs',
        versionKey: false
    }
);

const Reparacao = mongoose.model('Reparacao', reparacaoSchema);


// 3. Rotas
// GET repairs
app.get('/repairs', async (req, res) => {
    try {
        let queryObj = { ...req.query }

        const ano = queryObj.ano
        const marca = queryObj.marca
        const fields = queryObj._select
        const sortField = queryObj._sort
        const order = queryObj._order === 'desc' ? -1 : 1

        delete queryObj.ano
        delete queryObj.marca
        delete queryObj._select
        delete queryObj._sort
        delete queryObj._order

        let mongoQuery = {}
        let projection = {}

        // filtro por ano
        if (ano) {
            mongoQuery.$expr = {
                $eq: [
                    { $year: { $toDate: "$data" } },
                    Number(ano)
                ]
            }
        }

        // filtro por marca
        if (marca) {
            mongoQuery["viatura.marca"] = marca
        }

        // se não houver filtros
        if (!ano && !marca) {
            mongoQuery = queryObj
        }

        if (fields) {
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1
            })
        }

        let execQuery = Reparacao.find(mongoQuery, projection)

        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order })
        }

        const reparacoes = await execQuery.exec()
        res.json(reparacoes)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET /repairs/matriculas
app.get('/repairs/matrículas', async (req, res) => {
    try {
        const matriculas = await Reparacao.distinct("viatura.matricula")

        matriculas.sort()

        res.json(matriculas)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET /repairs/interv
app.get('/repairs/interv', async (req, res) => {
    try {
        const interv = await Reparacao.aggregate([
            { $unwind: "$intervencoes" },
            {
                $group: {
                    _id: {
                        codigo: "$intervencoes.codigo",
                        nome: "$intervencoes.nome",
                        descricao: "$intervencoes.descricao"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    codigo: "$_id.codigo",
                    nome: "$_id.nome",
                    descricao: "$_id.descricao"
                }
            },
            { $sort: { codigo: 1 } }
        ])

        res.json(interv)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET /repairs/:id
app.get('/repairs/:id', async (req, res) => {
    try {
        const reparacao = await Reparacao.findById(req.params.id);

        if (!reparacao) {
            return res.status(404).json({ error: "Registo não encontrado" });
        }

        res.json(reparacao);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro no pedido" });
    }
});


// POST /repairs
app.post('/repairs', async (req, res) => {
    try {
        const novaReparacao = new Reparacao(req.body)
        const reparacaoGuardada = await novaReparacao.save()
        res.status(201).json(reparacaoGuardada)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE /repairs/:id
app.delete('/repairs/:id', async (req, res) => {
    try {
        const id = req.params.id

        const apagado = await Reparacao.findByIdAndDelete(id)

        if (!apagado) {
            return res.status(404).json({ error: "Registo não encontrado" })
        }

        res.json({ mensagem: "Registo eliminado com sucesso" })
    }
    catch (err) {
        res.status(400).json({ error: "ID inválido ou erro no pedido" })
    }
})

// Servidor
app.listen(16025, () => {
    console.log('API de dados disponível em http://localhost:16025');
});