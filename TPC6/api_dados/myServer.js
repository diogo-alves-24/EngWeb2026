const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

// 1. Conexão ao MongoDB
const nomeBD = "cinema"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));


// 2. Esquema flexível (strict: false permite campos variados do dataset jcrpubs.json)
//      - Mas assume alguns pressupostos... como o tipo do _id
//      - versionKey: false, faz com que o atributo _v não seja adicionado ao documento
const filmesSchema = new mongoose.Schema({}, {strict : false, collection : 'filmes', versionKey : false})
const Filmes = mongoose.model('Filmes', filmesSchema)

const atoresSchema = new mongoose.Schema({}, {strict: false, collection: 'atores', versionKey: false})
const Atores = mongoose.model('Atores', atoresSchema)

const generosSchema = new mongoose.Schema({}, {strict: false, collection: 'generos', versionKey: false})
const Generos = mongoose.model('Generos', generosSchema)



// 3. Rotas CRUD focadas em _id
app.get("/filmes", async (req, res) => {
    try{
        let queryObj = { ...req.query}

        const searchTerm = queryObj.q;
        const fields = queryObj._select;
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        if(searchTerm){
            mongoQuery = {$text: {$search: searchTerm}}
            projection.score = {$meta: "textScore"}
            mongoSort = {$meta: "textScore"}
        }
        else{
            mongoQuery = queryObj
        }

        if(fields){
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1
            })
        }

        let execQuery = Filmes.find(mongoQuery, projection)

        if(sortField){
            execQuery = execQuery.sort({[sortField]: order})
        }
        else if(searchTerm){
            execQuery = execQuery.sort(mongoSort);
        }

        const filmes = await execQuery.exec()
        res.json(filmes)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})


// GET /filmes/:id - Procurar apenas por _id
app.get('/filmes/:id', async (req, res) => {
    try {
        const filme = await Filmes.findById(req.params.id);
        if (!filme) return res.status(404).json({ error: "Não encontrado" });
        res.json(filme);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

app.get("/atores", async (req, res) => {
    try{
        let queryObj = { ...req.query}

        const searchTerm = queryObj.q;
        const fields = queryObj._select;
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        if(searchTerm){
            mongoQuery = {$text: {$search: searchTerm}}
            projection.score = {$meta: "textScore"}
            mongoSort = {$meta: "textScore"}
        }
        else{
            mongoQuery = queryObj
        }

        if(fields){
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1
            })
        }

        let execQuery = Atores.find(mongoQuery, projection)

        if(sortField){
            execQuery = execQuery.sort({[sortField]: order})
        }
        else if(searchTerm){
            execQuery = execQuery.sort(mongoSort);
        }

        const atores = await execQuery.exec()
        res.json(atores)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})

app.get('/atores/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const ator = await Atores.findOne({ id: id })

        if (!ator) {
            return res.status(404).json({ error: "Não encontrado" })
        }

        res.json(ator)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


app.get("/generos", async (req, res) => {
    try{
        let queryObj = { ...req.query}

        const searchTerm = queryObj.q;
        const fields = queryObj._select;
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        if(searchTerm){
            mongoQuery = {$text: {$search: searchTerm}}
            projection.score = {$meta: "textScore"}
            mongoSort = {$meta: "textScore"}
        }
        else{
            mongoQuery = queryObj
        }

        if(fields){
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1
            })
        }

        let execQuery = Generos.find(mongoQuery, projection)

        if(sortField){
            execQuery = execQuery.sort({[sortField]: order})
        }
        else if(searchTerm){
            execQuery = execQuery.sort(mongoSort);
        }

        const generos = await execQuery.exec()
        res.json(generos)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})

app.get('/generos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const genero = await Generos.findOne({ id: id })

        if (!genero) {
            return res.status(404).json({ error: "Não encontrado" })
        }

        res.json(genero)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


app.listen(7789, () => console.log('API minimalista em http://localhost:7789/emd'));