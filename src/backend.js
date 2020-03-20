const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

//conectando o banco
const mongo = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost/ufrj'
    mongo.connect(dbUrl, function (err, client) {
    if (err) return console.log(err)
    db = client.db('ufrj').collection("covid19")

    app.listen(3000, function () {
        console.log('Escutando porta 3000:');''
    })
    })

//roteamento

    app.get("/logoufrj", (req, res) => {
        res.sendFile(__dirname+"/assets/logoufrj.jpg");
      });
      app.get("/logocorona", (req, res) => {
        res.sendFile(__dirname+"/assets/logocorona.jpg");
      });
      app.get("/logolab", (req, res) => {
        res.sendFile(__dirname+"/assets/logolab.jpg");
      });
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/view/home.html');
        });

    app.get('/anamnese', function (req, res) {
        res.sendFile(__dirname + '/view/form.html');
        });

    app.get('/ocorrencias', function (req, res) {
        res.sendFile(__dirname + '/view/mapa.html')
        })

    //serviço de dados
    /**
     * situações possíveis:
     * resultado.SituacaoSaude = "Obito"
     * resultado.SituacaoSaude = "Cura"
     * resultado.SituacaoSaude = "Sintomatico"
     * resultado.SituacaoSaude = "Ignorado"
     * resultado.SituacaoSaude = "nPreenchido"
     */
    app.get('/ocorrencias/data', function (req, res) {
        situacao = req.query.situacao
        db.find({}, { projection: { endereco: 1, _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;
            var cont
            var enderecos = []
            for (cont = 0; cont < Object.keys(result).length; cont++) {
                console.log(result[cont].situacao)
                if(result[cont].endereco != null && (result[cont].situacao == 'todos' || result[cont].SituacaoSaude == situacao)){
                    enderecos.push(result[cont].endereco)
                }
            }
            console.log(situacao)
            res.json({ data: enderecos });
        });
    });

    app.post('/cadastrar', function (req, res) {
        obj = req.query.json
        obj = JSON.parse(obj.toString())
        db.insertOne(obj)
        res.send('200')
        })

  