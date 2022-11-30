function reqOk(data) {
	console.log('data:', data);
	$('#buttons').display('none');
	let table = '<table><thead>';
	
	$('main').append('<table>')
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
