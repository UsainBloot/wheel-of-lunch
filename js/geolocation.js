var crd;
var rangeCounter = 0;
var defaultRadius = 300;
var radiusIncremental = 50;
var defaultPlaceType = "restaurant";
var defaultMaxPlaces = 12;
var initialPlaces = 12;
var params = getUrlParams();

function getPlacesAjax(latitude, longitude, radius, placeType, maxPlaces) {
	restaurants = new Array(maxPlaces);
	
	$.getJSON( "/wheel/api/getPlaces/?" + 
				"latitude=" + latitude + "&" +
				"longitude=" + longitude + "&" + 
				"radius=" + radius + "&" +
				"type=" + placeType + "&" +
				"maxplaces=" + restaurants.length + "&" + 
				"minPrice=" + "0" + "&" +
				"maxPrice=" + "4",
	function( data ) {
		console.log(data);
		if(data.length < initialPlaces && rangeCounter < 11) {
			if(rangeCounter > 3) {
				radiusIncremental = 100;
			}
			if(rangeCounter > 8) {
				radiusIncremental = 500;
			}
			
			rangeCounter++;
			getPlacesAjax(latitude, longitude, parseInt(radius) + radiusIncremental, placeType, maxPlaces);
		} else {
			restaurants = data;
			initialPlaces = 0;
			$('#radius').val(radius);
			drawRouletteWheel();
			proceed();
			$('#search').html('<span class="glyphicon glyphicon-search"></span>  Search');
		}
	});
}

function positionSuccess(pos) {
	crd = pos.coords;
	
	$('#type-' + defaultPlaceType).prop('checked', true);
	$('#latitude').val(crd.latitude);
	$('#longitude').val(crd.longitude);
	$('#radius').val(defaultRadius);
	$('#maxPlaces').val(defaultMaxPlaces);
	
	getPlacesAjax(crd.latitude, crd.longitude, defaultRadius, defaultPlaceType, defaultMaxPlaces);
}

function positionError(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
	
	$('.localisation').hide();
	$('.localisation.alert-danger').show();
	
	restaurants = [{name:"Pizza Express", lat:"", lng:"", vicinity:""}, {name:"McDonalds", lat:"", lng:"", vicinity:""},
					{name:"Nandos", lat:"", lng:"", vicinity:""}, {name:"Subway", lat:"", lng:"", vicinity:""},
	                {name:"Pret A Manger", lat:"", lng:"", vicinity:""}, {name:"Eat", lat:"", lng:"", vicinity:""}, 
	                {name:"Marks & Spencer", lat:"", lng:"", vicinity:""}, {name:"Waitrose", lat:"", lng:"", vicinity:""},
	                {name:"Strada", lat:"", lng:"", vicinity:""}, {name:"Zizzi's", lat:"", lng:"", vicinity:""}, 
	                {name:"Las Iguanas", lat:"", lng:"", vicinity:""}, {name:"Byron", lat:"", lng:"", vicinity:""}];
	drawRouletteWheel();
}

function searchUserDefined() {
	$('#search').html('<i class="fa fa-refresh fa-spin"></i>');
	getPlacesAjax(
					$('#latitude').val(), 
					$('#longitude').val(), 
					$('#radius').val(), 
					$('.settings input[type=radio]:checked').val(), 
					parseInt($('#maxPlaces').val())
				);
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
		
		if(params.radius !== undefined) {
			defaultRadius = params.radius;
			initialPlaces = 0;
		}
		
		if(params.maxplaces !== undefined) {
			defaultMaxPlaces = parseInt(params.maxplaces);
			initialPlaces = 0;
		}
		
		if(params.type !== undefined) {
			defaultPlaceType = params.type;
			initialPlaces = 0;
		}
		
		if(params.lat === undefined || params.long === undefined) {
			navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
		} else {
			crd = { 'latitude': params.lat, 'longitude': params.long};
			
			$('#type-' + defaultPlaceType).prop('checked', true);
			$('#latitude').val(crd.latitude);
			$('#longitude').val(crd.longitude);
			$('#radius').val(defaultRadius);
			$('#maxPlaces').val(defaultMaxPlaces);
			
			getPlacesAjax(crd.latitude, crd.longitude, defaultRadius, defaultPlaceType, defaultMaxPlaces);
		}
		
	} else {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
	}
}