module.exports = (function($) {

  'use strict';

  var GeolocationLightbox = require('./geolocationLightbox.js');
  var MapLightbox = require('./mapLightbox.js');

  /* Constants */
  var HTML_OUTPUT = require('../../templates/localisation.html');
  var ID = '#localisation';

  /* Buttons */
  var CURRENT_LOCATION_BUTTON = '#location-option-current';
  var FIND_LOCATION_BUTTON = '#location-option-find';

  function LocalisationLightbox() {

    this.elems = {
      id: ID,
      root: null
    }

    this.init();
  }

  LocalisationLightbox.prototype.init = function() {
    this.addWindow();
  }

  LocalisationLightbox.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT);
    this.elems.root = $(ID);
    this.addEvents();
  }

  LocalisationLightbox.prototype.closeWindow = function() {
    this.elems.root.remove();
  }

  LocalisationLightbox.prototype.addEvents = function() {
    var self = this;

    $(CURRENT_LOCATION_BUTTON).on('click', function() {
      self.showCurrentLocationLightbox();
      self.closeWindow();
    });

    $(FIND_LOCATION_BUTTON).on('click', function() {
      self.showFindLocationLightbox();
      self.closeWindow();
    });
  };

  LocalisationLightbox.prototype.showCurrentLocationLightbox = function() {
    WOL.app.lightbox.Geolocation = new GeolocationLightbox();
  };

  LocalisationLightbox.prototype.showFindLocationLightbox = function() {
    WOL.app.lightbox.Map = new MapLightbox();
  };

  return LocalisationLightbox;
}(jQuery));
