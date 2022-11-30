function humanize(str) {
  let i, frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

function reqOk(data) {
	console.log('data:', data);
	$('#buttons').css('display', 'none');
	let table = '<table class="table"><thead><tr>';
	let headers = Object.keys(data[0]);
	let printableHeaders = [];
	let date_regex = /\d{4}-\d{2}-\d{2}/;
	const price_regex = /\d+\.\d+/;
	headers.forEach(header => {
		printableHeaders.push(humanize(header));
	});
	// console.log('headers:', printableHeaders)
	printableHeaders.forEach(header => {
		table += '<th>' + header + '</th>';
	})
	table += '</thead><tbody>';

	data.forEach(game => {
		table += '<tr>';
		for (const game_key in game) {
			if (game.hasOwnProperty(game_key)) {
				table += '<td>';
				if (date_regex.test(game[game_key])) {
					table += `<input type="text" id="date" value="${game[game_key]}">`;
				} else if (price_regex.test(game[game_key])) {
					table += `<input type="number" value="${game[game_key]}">`;
				} else {
					table += `<input type="text" value="${game[game_key]}">`
				}
				table += '</td>';
			}
		}
		table += '</tr>';
	});
	table += '</tbody></table>';
	$('#table').append(table);
	$('#date').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'dd-mm-yy',
		dayNames: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
	});
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


$.ajax({
	type: 'POST',
	url: 'http://localhost:3000/api/afegir',
	contentType: 'application/json',
	data: JSON.stringify({
		id: 12,
		nom: "CSGO",
		preu: 12.0,
		clase_preu: "gratis",
		data: "2012-04-23T18:25:43.511Z",
		genere: "Shooter"
	})
})

