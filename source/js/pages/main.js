module.exports = (function() {

  'use strict';

  var Utilities = require('../modules/utilities');
  var Wheel = require('../modules/wheel.js');
  var Settings = require('../elements/settings.js');
  var LocalisationLightbox = require('../lightboxes/localisationLightbox.js');
  var Places = require('../modules/places.js');

  WOL.app.utilities = new Utilities();
  WOL.app.wheel = new Wheel('wheel');
  WOL.app.settings = new Settings();

  var showLocalisationOptions = typeof WOL.app.settings.URLparams.lat === 'undefined' || typeof WOL.app.settings.URLparams.long === 'undefined';

  if(showLocalisationOptions) {
    WOL.app.lightbox.Localisation = new LocalisationLightbox();
  } else {
    WOL.app.places = new Places();
  }

  $('#new-location').on('click', function(){
    if(typeof WOL.app.lightbox.Localisation !== 'undefined' && !WOL.app.lightbox.Localisation.isCurrentlyOpen) {
      for(var key in WOL.app.lightbox) {
        WOL.app.lightbox[key].closeWindow();
      }
      WOL.app.lightbox.Localisation = new LocalisationLightbox();
    }
  });

}());
