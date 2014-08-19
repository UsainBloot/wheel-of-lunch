var latitude, longitude;

function positionSuccess(pos) {
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
};

function positionError(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);