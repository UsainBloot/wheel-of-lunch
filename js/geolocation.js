var restaurants = new Array(12);

function getPlacesAjax(latitude, longitude) {
	$.getJSON( "/wheel/api/getPlaces?" + 
				"latitude=" + latitude + "&" +
				"longitude=" + longitude + "&" +
				"radius=" + "1000" + "&" +
				"maxplaces=" + restaurants.length
				, function( data ) {
		console.log(data);
		restaurants = data;
		drawRouletteWheel();
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
	restaurants = ["Wendy's", "McDonalds", "Chick-fil-a", "Five Guys",
                   "Gold Star", "La Mexicana", "Chipotle", "Tazza Mia",
                   "Panera", "Just Crepes", "Arby's", "Indian"];
    
    drawRouletteWheel();
};

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);