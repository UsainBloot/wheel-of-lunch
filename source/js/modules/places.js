module.exports = (function() {

  'use strict';

  var API_URL = 'http://www.jack-palmer.co.uk/wheel/api/getPlaces/';

  function Places(userOptions) {

    this.options = {
        radius: 300,
        radiusIncrement: 50,
        placeType: 'restaurant',
        maxPlaces: 12,
        initialPlaces: 12
    };

    this.userOptions = userOptions;

    this.restaurants = {};

    this.init();
    this.getPlaces(this.options);
  }

  Places.prototype.init = function() {
    if(typeof this.userOptions.latitude !== 'undefined') { this.options.latitude = this.userOptions.latitude; }
    if(typeof this.userOptions.longitude !== 'undefined') { this.options.longitude = this.userOptions.longitude; }
    if(typeof this.userOptions.radius !== 'undefined') { this.options.radius = this.userOptions.radius; }
    if(typeof this.userOptions.placeType !== 'undefined') { this.options.placeType = this.userOptions.placeType; }
    if(typeof this.userOptions.maxPlaces !== 'undefined') { this.options.maxPlaces = this.userOptions.maxPlaces; }
  };

  Places.prototype.getPlaces = function(options) {
    var self = this;

    $.getJSON( API_URL + this.buildQueryParams(),
    function( data ) {

      if(data.length === 0) {
        self.error();
        return;
      }

      if(data.length < options.initialPlaces && options.radius < 3000) {
        self.expandSearchRadius(data, options);
      } else {
        self.success(data);
      }

    });
  };

  Places.prototype.buildQueryParams = function() {
    return '?' +
           'latitude=' + this.options.latitude + '&' +
           'longitude=' + this.options.longitude + '&' +
           'radius=' + this.options.radius + '&' +
           'type=' + this.options.placeType + '&' +
           'maxplaces=' + this.options.maxPlaces + '&' +
           'minPrice=' + '0' + '&' +
           'maxPrice=' + '4';
  };

  Places.prototype.expandSearchRadius = function(data, options) {
    if(options.radius > 300) {
      options.radiusIncrement = 100;
    }
    if(options.radius > 1000) {
      options.radiusIncrement = 500;
    }

    self.getPlaces(
      {
        latitude: options.latitude,
        longitude: options.longitude,
        radius: parseInt(options.radius) + options.radiusIncrement,
        placeType: options.placeType,
        maxPlaces: options.maxPlaces
      }
    );
  };

  Places.prototype.success = function(data) {
    this.restaurants = data;
    this.options.initialPlaces = 0;
    WOL.app.wheel.setRestaurants(data);
    WOL.app.wheel.draw();
  };

  Places.prototype.error = function(data) {
    //TODO FIX ERROR HANDLING OF PLACES API
    WOL.app.lightbox.NoLocationLightbox = new ErrorLocationLightbox();
  };

  return Places;
}());
