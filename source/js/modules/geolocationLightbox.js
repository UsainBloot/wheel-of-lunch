module.exports = (function() {

  'use strict';

  var Geolocation = require('./geolocation.js');

  /* Constants */
  var HTML_OUTPUT = require('../../templates/localisation-loading.html');
  var ID = '#geolocation';

  function GeolocationLightbox() {

    this.elems = {
      id: ID,
      root: null
    }

    this.init();
  }

  GeolocationLightbox.prototype.init = function() {
    this.addWindow();
  }

  GeolocationLightbox.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT);
    this.elems.root = $(ID);
    this.getLocation();
  }

  GeolocationLightbox.prototype.closeWindow = function(self) {
    self.elems.root.remove();
  }

  GeolocationLightbox.prototype.getLocation = function() {
    WOL.app.geolocation = new Geolocation();
  };

  return GeolocationLightbox;
}());
