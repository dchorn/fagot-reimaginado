function reqOk(data) {
	console.log('data:', data);
	// $('main').empty();
}

function reqError(err) {
	console.error(err);
	$('#fetchAll').attr('disabled', false);
}

$('#fetchAll').click(function () {
	$('#fetchAll').attr('disabled', true);
	$.ajax({
		url: 'http://localhost:3000/api/jocs',
		type: "GET",
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
		nom: "CSGO",
		preu: "12",
		data: "2012-04-23T18:25:43.511Z",
		genere: "Shooter"
	})
})

