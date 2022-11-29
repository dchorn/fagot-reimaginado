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
