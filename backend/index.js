'use strict'

//importacions i creació de constants per a la seva utiliutzació
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express();
const path = require('path');
const { connect } = require('http2');

// Port config
const port = process.env.PORT || 3000

//configuració del bodyParser perquè admeti entrades json i
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend')));

// Mysql Connection data
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'jocs',
	user: 'root',
	password: ''
});

app.post('/api/afegir', function (req, res) {
    console.log("estem a login");
	
	connection.connect(function (err) {
		if (err) {
			console.error('Error connecting: ' + err.stack);
		}
		console.log('Connected as id ' + connection.threadId);
	});

	let data = req.body;

	// Insert Data to Data Base
	let sql = `INSERT IGNORE INTO jocs (id, nom, preu, clase_preu, genere, data_llançament) VALUES ("${data.id}", "${data.nom}", "${data.preu}", "${data.clase_preu}", "${data.genere}", "${data.data}");`

	connection.query(sql, data, function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	})

	console.log(data)
	res.status(200).send(data)
})

// Get Data from DataBase
app.get('/api/jocs', function (req, res) {

	//provem de connectar-nos i capturar possibles errors
	connection.connect(function (err) {
		if (err) {
			console.error('Error connecting: ' + err.stack);
		}
		console.log('Connected as id ' + connection.threadId);
	});

    console.log("estem a login");

    connection.query('select * from jocs', function (err, results, field) {
        if (err) {
			// console.log(error);
            res.status(500).send(err)
        } else {
			let parsedResults = [];
			results.forEach(result => {
				parsedResults.push(JSON.parse(JSON.stringify(result)));
			});
            res.send(parsedResults);
        }
    });
	connection.end()
})

app.listen(port, () => {
    console.log(`Aquesta és la nostra API-REST que corre en http://localhost:${port}`)
})
