module.exports = (function($) {

  'use strict';

  var Map = require('../modules/map.js');
  var Places = require('../modules/places.js');

  /* Constants */
  var HTML_OUTPUT = require('../../templates/map.html');
  var ID = '#map';

  /* Inputs and Buttons */
  var MAP_CANVAS = 'map-canvas';
  var SEARCH_BOX_INPUT = 'map-search';
  var SELECT_LOCATION_BUTTON = '#map .select-location';

  function MapLightbox() {

    this.elems = {
      id: ID,
      root: null
    };

    this.init();
  }

  MapLightbox.prototype.init = function() {
    this.addWindow();
    WOL.app.Map = new Map(MAP_CANVAS, SEARCH_BOX_INPUT);
  };

  MapLightbox.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT);
    this.elems.root = $(ID);
    this.addEvents();
  };

  MapLightbox.prototype.closeWindow = function() {
    this.elems.root.remove();
  };

  MapLightbox.prototype.addEvents = function() {
    var self = this;

    $(SELECT_LOCATION_BUTTON).on('click', function() {
      WOL.app.settings.setLatLong(WOL.app.Map.position);
      WOL.app.places = new Places(
        {
          latitude: WOL.app.Map.position.latitude,
          longitude: WOL.app.Map.position.longitude,
          dynamicSearch: true
        }
      );
      self.closeWindow();
    });
  };

  return MapLightbox;
}(jQuery));
