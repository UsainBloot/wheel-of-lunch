module.exports = (function() {

  'use strict';

  /* Constants */
  var HTML_OUTPUT = require('../../templates/result.mustache');
  var ID = '#result';

  /* Buttons */
  var CLOSE_BUTTON = '#result .close';

  function ResultLightbox(restaurant) {

    this.elems = {
      id: ID,
      root: null
    };
    this.restaurant = restaurant;

    this.init();
  }

  ResultLightbox.prototype.init = function() {
    if(typeof this.restaurant.rating === 'undefined'){ this.restaurant.rating = 'Unavailable'; }
    this.restaurant.href = this.buildHref();
    this.addWindow();
  };

  ResultLightbox.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT.render( {
      title: this.restaurant.name,
      vicinity: this.restaurant.vicinity,
      rating: this.restaurant.rating,
      href: this.restaurant.href
    }));
    this.elems.root = $(ID);
    this.addEvents();
  };

  ResultLightbox.prototype.closeWindow = function() {
    this.elems.root.remove();
  };

  ResultLightbox.prototype.addEvents = function() {
    var self = this;
    
    $(CLOSE_BUTTON).on('click', function() {
      self.closeWindow();
    });
  };

  ResultLightbox.prototype.buildHref = function() {
    var resultName = this.restaurant.name.split(' ').join('+');
    var mapURL = "http://maps.google.com/maps/dir/";
		var originCoords = WOL.app.geolocation.position.latitude + "," + WOL.app.geolocation.position.longitude;

    return mapURL + originCoords + '/' + resultName + ',' + this.restaurant.vicinity + '/@' + this.restaurant.lat + ',' + this.restaurant.lng;
  };

  return ResultLightbox;
}());
