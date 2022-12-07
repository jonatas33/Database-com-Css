const express = require("express");
const app = express();
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const Equipe = require('./models/jgo')
const Sequelize = require('sequelize');
const { helpers } = require("handlebars");
const { format } = require("mysql2");
const moment = require("moment/moment");


//Template engine // existem muitos templates para o node
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

/*helpers:{
    formatDate:(date) =>{
        return moment(date).format('DD/MM/YYYY');
    }
}*/

app.use('/public', express.static(__dirname + '/public'));

//BODY PARSER - config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())//JSON é basicamente um formato leve de troca de inforações/dados entre sistemas. Mas JSON significa JavaScript Object Notation

//ROTAS
app.get('/', function(req, res){
    res.render('home')
})

app.get('/cad', function(req, res){
    res.render('formulario')
})

//Envia dados de formulário para o banco de dados
app.post('/add', function(req, res){
    Equipe.create({
        nome: req.body.nome,
        atividade: req.body.atividade,
        prazo: req.body.prazo
    })
    .then(function(){
        //res.send("Post criado com sucesso")
        res.redirect('/')
    })
    .catch(function(erro){
        res.send("Houve um erro:" + erro)
    })
    })

    app.listen(8094, function(){
        console.log("servidor rodando na url http:localhost:8094")
    });



