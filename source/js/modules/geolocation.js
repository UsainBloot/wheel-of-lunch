module.exports = (function() {

  'use strict';

  var ErrorLocationLightbox = require('../lightboxes/errorLocationLightbox.js');

  function Geolocation(callback) {

    this.callback = callback;
    this.position = {};

    this.options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };

    this.getLocation();
  }

  Geolocation.prototype.getLocation = function() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  };

  Geolocation.prototype.success = function(pos) {
    WOL.app.geolocation.position = pos.coords;
    WOL.app.geolocation.callback();
  };

  Geolocation.prototype.error = function(err) {
    WOL.app.geolocation.callback();
    WOL.app.lightbox.NoLocationLightbox = new ErrorLocationLightbox();
  };

  Geolocation.prototype.closeParentWindow = function() {
    this.elems.parentRoot.remove();
  };

  return Geolocation;
}());
