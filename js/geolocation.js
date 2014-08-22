function getPlacesAjax(latitude, longitude, radius, maxPlaces) {
	restaurants = new Array(maxPlaces);
	
	$.getJSON( "/wheel/api/getPlaces/?" + 
				"latitude=" + latitude + "&" +
				"longitude=" + longitude + "&" +
				"radius=" + radius + "&" +
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
	var defaultRadius = 2000;
	var defaultMaxPlaces = 12;
	
	$('#latitude').val(crd.latitude);
	$('#longitude').val(crd.longitude);
	$('#radius').val(defaultRadius);
	$('#maxPlaces').val(defaultMaxPlaces);
	
	getPlacesAjax(crd.latitude, crd.longitude, defaultRadius, defaultMaxPlaces);
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

function searchUserDefined() {
	getPlacesAjax($('#latitude').val(), $('#longitude').val(), $('#radius').val(), parseInt($('#maxPlaces').val()));
}

drawRouletteWheel();
navigator.geolocation.getCurrentPosition(positionSuccess, positionError);