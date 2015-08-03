module.exports = (function($) {

  'use strict';

  var Geolocation = require('../modules/geolocation.js');

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

  GeolocationLightbox.prototype.closeWindow = function() {
    this.elems.root.remove();
  }

  GeolocationLightbox.prototype.getLocation = function() {
    var self = this;
    WOL.app.geolocation = new Geolocation(function() {
      self.closeWindow();
    });
  };

  return GeolocationLightbox;
}(jQuery));
