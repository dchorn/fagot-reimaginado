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

// configuració del bodyParser perquè admeti entrades json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use '../frontend' for the main folder
app.use(express.static(path.join(__dirname, '../frontend')));



// Get Data from DataBase
app.get('/api/jocs', function (req, res) {

// Mysql Connection data
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'jocs',
	user: 'root',
	password: ''
});

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

// Insert Data to Data Base
app.post('/api/afegir', function (req, res) {
	console.log("estem a login");


// Mysql Connection data
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'jocs',
	user: 'root',
	password: ''
});
	connection.connect(function (err) {
		if (err) {
			console.error('Error connecting: ' + err.stack);
		}
		console.log('Connected as id ' + connection.threadId);
	});

	let data = req.body;
	console.log('req:', req.body)
	console.log('data:', data)

	let sql = `INSERT IGNORE INTO jocs (id, nom, preu, clase_preu, genere, data_llançament) VALUES ("${data.id}", "${data.nom}", "${data.preu}", "${data.clase_preu}", "${data.genere}", "${data.data}");`

	connection.query(sql, data, function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	})

	console.log(data)
	res.status(200).send(data)
})


// Insert Data to Data Base
app.post('/api/update', function (req, res) {
	console.log("estem a update");

// Mysql Connection data
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'jocs',
	user: 'root',
	password: ''
});
	connection.connect(function (err) {
		if (err) {
			console.error('Error connecting: ' + err.stack);
		}
		console.log('Connected as id ' + connection.threadId);
	});

	let data_obj = req.body;


	data_obj.forEach(data => {
		let sql = `update jocs set (nom, preu, clase_preu, genere, data_llançament) VALUES ("${data.nom}", "${data.preu}", "${data.clase_preu}", "${data.genere}", "${data.data}") where id="${data.id}";`
	
		connection.query(sql, data, function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	})
	})


	console.log(data)
	res.status(200).send(data)
})


app.listen(port, () => {
	console.log(`Aquesta és la nostra API-REST que corre en http://localhost:${port}`)
})
