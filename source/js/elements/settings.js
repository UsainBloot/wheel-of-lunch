module.exports = (function($) {

  'use strict';

  var Places = require('../modules/places.js');

  /* Constants */
  var HTML_OUTPUT = require('../../templates/settings.html');
  var ID = '#settings';

  /* Buttons & Inputs */
  var OPEN_CLOSE_BUTTON = '#settings a.settings';
  var CLICK_ME_TEXT = '#settings .clickme';
  var PLACE_TYPE_RADIO = '#settings .placetype';
  var LAT_INPUT = '#settings input.latitude';
  var LNG_INPUT = '#settings input.longitude';
  var RAD_INPUT = '#settings input.radius';
  var MAX_PLACES_INPUT = '#settings input.maxplaces';
  var SHARE_LINK_INPUT = '#settings input.sharelink';
  var SEARCH_BUTTON = '#settings-search';
  var DYNAMIC_SEARCH_INPUT = '#settings input.dynamic-search';

  function Settings() {

    this.elems = {
      id: ID,
      root: null
    };

    this.settings = {
      placeType: 'restaurant',
      latitude: '',
      longitude: '',
      radius: 300,
      maxPlaces: 12,
      shareLink: '',
      dynamicSearch: false
    };

    this.URLparams = WOL.app.utilities.getURLParams();

    this.init();
  }

  Settings.prototype.init = function() {
    if(typeof this.URLparams.lat !== 'undefined') { this.settings.latitude = this.URLparams.lat; }
    if(typeof this.URLparams.long !== 'undefined') { this.settings.longitude = this.URLparams.long; }
    if(typeof this.URLparams.radius !== 'undefined') { this.settings.radius = this.URLparams.radius; }
    if(typeof this.URLparams.type !== 'undefined') { this.settings.placeType = this.URLparams.type; }
    if(typeof this.URLparams.maxplaces !== 'undefined') { this.settings.maxPlaces = this.URLparams.maxplaces; }

    this.elems.root = $(ID);
    this.addWindow();
    this.populate();
    this.addEvents();
  };

  Settings.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT);
  };

  Settings.prototype.addEvents = function() {
    var self = this;

    $(OPEN_CLOSE_BUTTON).on('click', function() {
      $('.clickme').remove();
      $('.settings').toggleClass('settings-open');
    });

    $(SEARCH_BUTTON).on('click', function() {
      self.save();
      WOL.app.places = new Places(self.settings);
    });
  };

  Settings.prototype.populate = function() {
    $(PLACE_TYPE_RADIO + '.' + this.settings.placeType).prop('checked', true);
    $(LAT_INPUT).val(this.settings.latitude);
    $(LNG_INPUT).val(this.settings.longitude);
    $(RAD_INPUT).val(this.settings.radius);
    $(MAX_PLACES_INPUT).val(this.settings.maxPlaces);
    this.settings.shareLink = this.getShareLink();
    $(SHARE_LINK_INPUT).val(this.settings.shareLink);
  };

  Settings.prototype.save = function() {
    this.settings.placeType = $(PLACE_TYPE_RADIO + ':checked').val();
    this.settings.latitude = $(LAT_INPUT).val();
    this.settings.longitude = $(LNG_INPUT).val();
    this.settings.radius = $(RAD_INPUT).val();
    this.settings.maxPlaces = $(MAX_PLACES_INPUT).val();
    this.settings.shareLink = this.getShareLink();
    this.settings.dynamicSearch = $(DYNAMIC_SEARCH_INPUT).is(':checked');
    this.populate();
  };

  Settings.prototype.setLatLong = function(position) {
    this.settings.latitude = position.latitude;
    this.settings.longitude = position.longitude;
    this.populate();
  };

  Settings.prototype.setRadius = function(radius) {
    this.settings.radius = radius;
    this.populate();
  };

  Settings.prototype.getShareLink = function() {
    var url = window.location.origin + window.location.pathname;
  	var params = {
    			lat: this.settings.latitude,
    			long: this.settings.longitude,
    			radius: this.settings.radius,
    			type: this.settings.placeType,
    			maxplaces: this.settings.maxPlaces
  		};

  	return url + '?' + $.param(params);
  };

  return Settings;
}(jQuery));
