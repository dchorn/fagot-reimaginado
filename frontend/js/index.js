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
		url: 'http://localhost:3000/api/jocs',
		dataType: 'json',
		success: reqOk,
		error: reqError
	})
})


obj = {
	nom: "CSGO",
	preu: "12",
	data: "2012-04-23T18:25:43.511Z",
	genere: "Shooter"
}

$("submitBtn").click(function () {
        $.ajax({
			url: location.href,
            type: "POST",
            data: obj,
            success: function(data){
                console.log(data);
            }
        });
    });

