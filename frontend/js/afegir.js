function checkPriceRange() {
	let preu = $(this).val()
	const objk = Object.keys(ClasePreu);
	for (const gt in objk) {
		if (ClasePreu[objk[gt]].range.to >= preu && ClasePreu[objk[gt]].range.from <= preu) {
			cPreu = ClasePreu[objk[gt]];
		}
	}
	console.log('$(this), cPreu:', $(this), cPreu)
	$('#select').val(cPreu);
}

function pSucces() {
	console.log('success!');
}

function pError(err) {
	console.error(err);
}

$(document).ready(function () {
	$('input[name=preu]').change(checkPriceRange);
	let fData = new FormData($('#insertForm')[0]);
	$('#insert').click(function () {
		$.ajax({
			url: 'http://localhost:3000/api/afegir',
			type: 'POST',
			processData: false,
			contentType: false,
			// contentType: 'application/json',
			data: fData,
			success: pSucces,
			error: pError
		})
	})
})
