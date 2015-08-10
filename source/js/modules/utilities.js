module.exports = (function($) {

  'use strict';

  function Utilities() {

  }

  Utilities.prototype.getURLParams = function() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          if(hash.length == 2) {
  	        vars.push(hash[0]);
  	        vars[hash[0]] = hash[1];
  	    }
      }
      return vars;
  };

  return Utilities;
}(jQuery));
