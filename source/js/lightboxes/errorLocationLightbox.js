module.exports = (function($) {

  'use strict';

  /* Constants */
  var HTML_OUTPUT = require('../../templates/localisation-error.html');
  var ID = '#localisation-error';

  /* Buttons */
  var CONTINUE_BUTTON = '#localisation-continue-button';

  function ErrorLocationLightbox() {

    this.elems = {
      id: ID,
      root: null
    }

    this.init();
  }

  ErrorLocationLightbox.prototype.init = function() {
    this.addWindow();
  };

  ErrorLocationLightbox.prototype.addWindow = function() {
    $('body').prepend(HTML_OUTPUT);
    this.elems.root = $(ID);
    this.addEvents();
  };

  ErrorLocationLightbox.prototype.closeWindow = function() {
    this.elems.root.remove();
  };

  ErrorLocationLightbox.prototype.addEvents = function() {
    var self = this;

    $(CONTINUE_BUTTON).on('click', function() {
      self.closeWindow();
    });
  };

  return ErrorLocationLightbox;
}(jQuery));
