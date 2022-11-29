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
		url: 'localhost:3000/api/jocs',
		dataType: 'json',
		success: reqOk,
		error: reqError
	})
})
