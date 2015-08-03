module.exports = (function($) {

  'use strict';

  var colours = require('../data/colours.js');
  var defaultRestaurants = require('../data/restaurants.js');

  function Wheel(canvas) {

    if(!canvas.length) {
      return;
    }

    this.elems = {
      canvas: canvas,
      restaurants: defaultRestaurants
    }

    this.init();
  }

  Wheel.prototype.init = function() {
    this.addEvents();
  }

  Wheel.prototype.addEvents = function() {

  };

  return Wheel;
}(jQuery));
