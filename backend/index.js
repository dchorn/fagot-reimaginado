'use strict'

//importacions i creació de constants per a la seva utiliutzació
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express();
const path = require('path');

//configuració del bodyParser perquè admeti entrades json i
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend')));

//////AIXÒ ÉS NOU I SERIA PER TREBALLAR AMB MYSQL
//COMPTE: hem d'instal·lar mysql per a Node Express amb npm i -S mysql
//importem mysql
//declarem els paràmetres de connexió (millor si l’usuari de connexió no és root sinó un usuari específic per aquesta BBDD
// i amb permissos restringits
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'jocs',
    user: 'root',
    password: ''
});

//fem servir la BBDD que tenim
app.get('/api/jocs', function (req, res) {
    console.log("estem a login");

    //provem de connectar-nos i capturar possibles errors
    connection.connect(function (err) {
        console.log(err);
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected as id ' + connection.threadId);
    });
    connection.query('select * from jocs', function (error, results, field) {
        if (error) {
            res.status(400).send({ resultats: null })
        } else {
            /*COMPROVACIÓ DE DADES PER CONSOLA DE NODE*/
            // console.log(results);
            // results.forEach(result => {
            // console.log(result.user);
            // })
            res.status(200).send({ resultats: results })
        }
    });
    connection.end();
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Aquesta és la nostra API-REST que corre en http://localhost:${port}`)
})
