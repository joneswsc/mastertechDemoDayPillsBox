// Biblioteca que gera o servidor
var express = require('express');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/produtos');
//mongoose.connect('mongodb://mastertech:masterPass@ds031915.mlab.com:31915/mastertech');

mongoose.connect('mongodb://dbuser:dbuser@ds119728.mlab.com:19728/inolvcx');

// Biblioteca de manipulação de array/vetor
var _ = require('lodash');

// Biblioteca que faz com que consigamos enxergar todos os parâmetros enviados por json
var bodyParser = require('body-parser');
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Configura e libera o acesso ao nosso srvidor por outros servidores
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


var Schema = mongoose.Schema;
var produtoSchema = new Schema({
  titulo:  String,
  preco: Number,
  descricao:   String,
  sku: String
});
var ProdutoModel = mongoose.model('Produto', produtoSchema);


// Criar método de cadastro de produto
// Cadastra uma nova pessoa
app.post('/produtos/cadastrar', jsonParser, function (req, res) {
  var prod = new ProdutoModel({
    titulo:  req.body.titulo,
    preco: parseInt(req.body.preco),
    descricao:   req.body.descricao,
    sku: req.body.sku
  });

  prod.save(function (err) {
    if (err) return handleError(err);
    res.send(
      {
        status: true,
        message: "Dados cadastrados com sucesso."
      }
    );
  });
});
// Criar método de cadastro de produto


// Criar método de cadastro de produto
// Cadastra uma nova pessoa
app.put('/produtos/editar/:id', jsonParser, function (req, res) {
  ProdutoModel.findById(req.params.id, function(err, prod){
    if (err) return console.error(err);

    prod.titulo =  req.body.titulo;
    prod.preco = parseInt(req.body.preco);
    prod.descricao =   req.body.descricao;
    prod.sku = req.body.sku;

    prod.save(function (err) {
      if (err) return handleError(err);
      res.send(
        {
          status: true,
          message: "Dados atualizados com sucesso."
        }
      );
    });
  })
  
});
// Criar método de cadastro de produto


// Lista todas as pessoas cadastradas
app.get('/produtos/lista', function (req, res) {
  console.log(req.query.teste1);

  ProdutoModel.find(function(err, dados){
    if (err) return console.error(err);

    res.send(
      dados
    );
  });
});


// Criar método de edição de produto
//...
// Criar método de edição de produto


// Criar método de exclusão de produto
//...
// Criar método de exclusão de produto


// Criar método para selecionar um produto especifico pelo id
//...
// Criar método para selecionar um produto especifico pelo id


// Criar método para selecionar um produto especifico por qualquer outra propriedade (titulo, descricao, valor...)
//...
// Criar método para selecionar um produto especifico por qualquer outra propriedade (titulo, descricao, valor...)


// Inicia e configura uma porta do servidor
//var port = process.env.PORT_BOOK;
var port = 8000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});