function getPlacesAjax(latitude, longitude, radius, maxPlaces) {
	restaurants = new Array(maxPlaces);
	
	$.getJSON( "/wheel/api/getPlaces/?" + 
				"latitude=" + latitude + "&" +
				"longitude=" + longitude + "&" + 
				"radius=" + radius + "&" +
				"maxplaces=" + restaurants.length + "&" + 
				"minPrice=" + "0" + "&" +
				"maxPrice=" + "4"
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
	
	restaurants = [{name:"Wendy's", lat:"", lng:"", vicinity:""}, {name:"McDonalds", lat:"", lng:"", vicinity:""},
					{name:"Chick-fil-a", lat:"", lng:"", vicinity:""}, {name:"Five Guys", lat:"", lng:"", vicinity:""},
	                {name:"Gold Star", lat:"", lng:"", vicinity:""}, {name:"La Mexicana", lat:"", lng:"", vicinity:""}, 
	                {name:"Chipotle", lat:"", lng:"", vicinity:""}, {name:"Tazza Mia", lat:"", lng:"", vicinity:""},
	                {name:"Panera", lat:"", lng:"", vicinity:""}, {name:"Just Crepes", lat:"", lng:"", vicinity:""}, 
	                {name:"Arby's", lat:"", lng:"", vicinity:""}, {name:"Indian", lat:"", lng:"", vicinity:""}];
	drawRouletteWheel();
};

function searchUserDefined() {
	getPlacesAjax($('#latitude').val(), $('#longitude').val(), $('#radius').val(), parseInt($('#maxPlaces').val()));
}

drawRouletteWheel();
navigator.geolocation.getCurrentPosition(positionSuccess, positionError);