/*
* Validates whether the place type requested is able to be used with the
* Google Places API
*/
var VALID_PLACES = ['restaurant', 'food', 'bar'];

module.exports = function(type) {

  if(VALID_PLACES.indexOf(type) === -1) {
    type = VALID_PLACES[0];
  }

  return type;
}
