function humanize(str) {
	let i, frags = str.split('_');
	for (i = 0; i < frags.length; i++) {
		frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	}
	return frags.join(' ');
}

function reqOk(data) {
	const headers = Object.keys(data[0]);
	// Regexes
	const date_regex = /\d{4}-\d{2}-\d{2}/;
	const price_regex = /\d+\.\d+/;

	// Prices and genres
	const gameGenres = Object.keys(Genere);
	const gamePrices = Object.keys(ClasePreu);

	console.log('data:', data);
	$('#buttons').css('display', 'none');
	// Clear headers
	let printableHeaders = [];
	headers.forEach(header => {
		printableHeaders.push(humanize(header));
	});

	let table = '<form id="updateF"><table class="table"><thead><tr>';
	printableHeaders.forEach(header => {
		table += '<th>' + header + '</th>';
	})
	table += '</thead><tbody>';

	let gameData = [];

	data.forEach(game => {
		let curGame = new Game(game.id, game.nom, game.preu, game.clase_preu, game.genere, game["data_llançament"])
		gameData.push(curGame);
	});

	console.log('gameData:', gameData)
	gameData.forEach(game => {
		table += '<tr>';
		for (const game_key in game) {
			if (game.hasOwnProperty(game_key)) {
				table += '<td>';
				if (game[game_key] instanceof Date) {
					table += `<input type="text" id="${game.nom}Date" name="date" value="${game[game_key].getDate()}-${game[game_key].getMonth() + 1}-${game[game_key].getFullYear()}">`;
				} else if (price_regex.test(game[game_key])) {
					table += `<input type="number" name="${game.nom}Price" value="${game[game_key]}">`;
				} else {
					table += `<input type="text" name="${game.nom}${game_key}" value="${game[game_key]}">`
				}
				table += '</td>';
			}
		}
		table += `<td><button id="${game.nom}Update" disabled>Update</button></td></tr>`;
	});
	table += '</tbody></table></form>';
	// console.log('table:', table)
	$('#table').append(table);

	// Datepicker stuff
	$.datepicker.setDefaults(
		$.datepicker.regional['ca'],
	)

	$('input[name=date]').each(function (_, elem) {
		$(elem).datepicker(
			{
				changeMonth: true,
				changeYear: true,
				dateFormat: 'dd-mm-yy',
				dayNames: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
			}
		)
		// console.log('$(elem):', $(elem).val())
		$(elem).datepicker('setDate', $(elem).val())
	})

	$('input').on('change', function () {
		if ($('#update').is(':disabled')) {
			$('#update').attr('disabled', false)
		}
	})
}

function sendUpdate() {
	const updatedData = new FormData
}

function reqError(err) {
	console.error(err);
	$('#fetchAll').attr('disabled', false);
}

$('#fetchAll').click(function () {
	$('#fetchAll').attr('disabled', true);
	$.ajax({
		url: 'http://localhost:3000/api/jocs',
		dataType: 'json',
		success: reqOk,
		error: reqError
	})
})


$('#update').click(function () {
	$('#update').attr('disabled', true);
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/api/update',
		dataType: 'json',
		data: JSON.stringify(game),
		success: reqOk,
		error: reqError
	})
})
// $.ajax({
	// type: 'POST',
	// url: 'http://localhost:3000/api/afegir',
	// contentType: 'application/json',
	// data: JSON.stringify({
		// id: 12,
		// nom: "CSGO",
		// preu: 12.0,
		// clase_preu: "gratis",
		// data: "2012-04-23T18:25:43.511Z",
		// genere: "Shooter"
	// })
// })

