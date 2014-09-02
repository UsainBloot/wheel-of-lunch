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
		if(data.length < initialPlaces && rangeCounter < 11) {
			if(rangeCounter > 3) {
				radiusIncremental = 100;
			}
			if(rangeCounter > 8) {
				radiusIncremental = 500;
			}
			
			rangeCounter++;
			getPlacesAjax(latitude, longitude, parseInt(radius) + radiusIncremental, maxPlaces);
		} else {
			restaurants = data;
			initialPlaces = 0;
			$('#radius').val(radius);
			drawRouletteWheel();
			proceed();
		}
	});
};

function positionSuccess(pos) {
	crd = pos.coords;
	
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

function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if(hash.length == 2) {
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
    }
    return vars;
}

function initLocation() {
	drawRouletteWheel();
	
	if(params.length >= 0) {
		
		if(params['radius'] != undefined) {
			defaultRadius = params['radius'];
			initialPlaces = 0;
		}
		
		if(params['maxplaces'] != undefined) {
			defaultMaxPlaces = parseInt(params['maxplaces']);
			initialPlaces = 0;
		}
		
		if(params['lat'] == undefined || params['long'] == undefined) {
			navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
		} else {
			crd = { 'latitude': params['lat'], 'longitude': params['long']};
			
			$('#latitude').val(crd.latitude);
			$('#longitude').val(crd.longitude);
			$('#radius').val(defaultRadius);
			$('#maxPlaces').val(defaultMaxPlaces);
			
			getPlacesAjax(crd.latitude, crd.longitude, defaultRadius, defaultMaxPlaces);
		}
		
	} else {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
	}
}

var crd;
var rangeCounter = 0;
var defaultRadius = 300;
var radiusIncremental = 50;
var defaultMaxPlaces = 12;
var initialPlaces = 12;
var params = getUrlParams();

initLocation();


