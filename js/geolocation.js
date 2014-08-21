function getPlacesAjax(latitude, longitude) {
	$.getJSON( "/wheel/api/getPlaces/?" + 
				"latitude=" + latitude + "&" +
				"longitude=" + longitude + "&" +
				"radius=" + "1000" + "&" +
				"maxplaces=" + restaurants.length
				, function( data ) {
		console.log(data);
		restaurants = data;
		drawRouletteWheel();
		proceed();
	});
};

function positionSuccess(pos) {
	var crd = pos.coords;
	$('#latitude').val(crd.latitude);
	$('#longitude').val(crd.longitude);
	getPlacesAjax(crd.latitude, crd.longitude)
};

function positionError(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
	
	$('.localisation').hide();
	$('.localisation.alert-danger').show();
	
	restaurants = ["Wendy's", "McDonalds", "Chick-fil-a", "Five Guys",
	                   "Gold Star", "La Mexicana", "Chipotle", "Tazza Mia",
	                   "Panera", "Just Crepes", "Arby's", "Indian"];
	drawRouletteWheel();
};

drawRouletteWheel();
navigator.geolocation.getCurrentPosition(positionSuccess, positionError);