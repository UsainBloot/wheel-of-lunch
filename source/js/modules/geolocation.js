module.exports = (function() {

  'use strict';

  function Geolocation() {
    this.getLocation();
    this.position = {};

    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }

  Geolocation.prototype.getLocation = function() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  };

  Geolocation.prototype.success = function(pos) {
    this.position = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + this.position.latitude);
    console.log('Longitude: ' + this.position.longitude);
    console.log('More or less ' + this.position.accuracy + ' meters.');
  };

  Geolocation.prototype.error = function(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  return Geolocation;
}());
