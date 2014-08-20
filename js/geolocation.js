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
};

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);