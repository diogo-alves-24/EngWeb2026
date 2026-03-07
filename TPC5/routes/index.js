var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get(['/', '/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data
    res.render('index', {filmes, d})
  })
});

router.get('/filmes/:id', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/filmes/" + req.params.id)
  .then(resp => {
    var filme = resp.data
    res.render('filme', {filme, d})
  })
});

router.get('/atores', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data
    var atores = new Map()
    filmes.forEach(f => {
      f.cast.forEach(a => {
        if(atores.get(a) >= 1)
          atores.set(a, atores.get(a) + 1)
        else
          atores.set(a, 1)
      })
    });
    res.render('atores', { atores: Array.from(atores.entries()), d })
  })
})

router.get('/atores/:nome', function(req, res, next){
  var d = new Date().toISOString().substring(0,16)
  const nome = req.params.nome

  axios.get("http://localhost:3000/filmes")
    .then(resp => {
      var data = resp.data
      var filmes = []

      console.log("ATOR:", nome)

      data.forEach(filme => {
        console.log(filme.title, filme.cast)

        if (filme.cast.includes(nome)) {
          filmes.push(filme)
        }
      })

      res.render('ator', { nome, filmes, d })
    })
    .catch(err => next(err))
})

router.get('/generos', function(req, res, next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data
    var generos = new Map()
    filmes.forEach(f => {
      f.genres.forEach(a => {
        if(generos.get(a) >= 1)
          generos.set(a, generos.get(a) + 1)
        else
          generos.set(a, 1)
      })
    });
    res.render('generos', { generos: Array.from(generos.entries()), d })
  })
})


router.get('/generos/:nome', function(req, res, next){
  var d = new Date().toISOString().substring(0,16)
  const nome = req.params.nome

  axios.get("http://localhost:3000/filmes")
    .then(resp => {
      var data = resp.data
      var filmes = []

      data.forEach(filme => {
        console.log(filme.title, filme.genres)

        if (filme.genres.includes(nome)) {
          filmes.push(filme)
        }
      })

      res.render('genero', { nome, filmes, d })
    })
    .catch(err => next(err))
})

module.exports = router;
