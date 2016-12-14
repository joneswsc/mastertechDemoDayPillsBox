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

app.use( bodyParser.json() );        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true

})); 

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/', express.static('public'));


// Configura e libera o acesso ao nosso srvidor por outros servidores
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


var Schema = mongoose.Schema;

var loginSchema = new Schema({
  nome:  String,
  email: String,
  celular:   String,
  password: String
});

var LoginModel = mongoose.model('Login', loginSchema);

// --------------------------------------------------------------------------------------------

// Criar método de cadastro de produto
// Cadastra uma nova pessoa
app.post('/login/cadastrar', function (req, res) {
	
  var prod = new LoginModel({
    nome:  req.body.nome,
    email: req.body.email,
    celular:  req.body.celular ,
    password: req.body.password,
    password2: req.body.confpassword
  });

  prod.save(function (err) {
    if (err) return handleError(err);
    res.send(
      {
        status: true,
        message: "Dados cadastrados sucesso."
      }
    );
  });
});

// Valida login
app.post('/login/validar', function (req, res) {
  
  var prod = new LoginModel({
    nome:  req.body.nome,
    password: req.body.password,
    password2: req.body.confpassword
  });

  prod.save(function (err) {
    if (err) return handleError(err);
    res.send(
      {
        status: true,
        message: "Dados cadastrados sucesso."
      }
    );
  });
});

// Lista todas as pessoas cadastradas
app.get('/login/lista', function (req, res) {
  console.log(req.query.teste1);

  LoginModel.find(function(err, dados){
    if (err) return console.error(err);

    res.send(
      dados
    );
  });
});


app.listen(3000, function (req,res) {
  console.log('Example app listening on port 3000!');
});