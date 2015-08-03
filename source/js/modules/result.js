module.exports = (function() {

  'use strict';

  function Result() {

  }

  Result.prototype.hoganExample = function() {
    var output = require('../../templates/result.hogan').render({
      title: 'TEST',
      vicinity: 'VICIN',
      rating: '1',
      href: 'href'
    });
  };

  return Result;
}());
