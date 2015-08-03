module.exports = (function() {

  'use strict';

  var HTML_OUTPUT = require('../../templates/localisation.html');

  function LocalisationLightbox() {
    this.init.apply();
  }

  LocalisationLightbox.prototype.init = function() {
    this.addEvents();
  }

  LocalisationLightbox.prototype.addEvents = function() {

  };

  return LocalisationLightbox;
}());
