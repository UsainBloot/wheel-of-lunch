var GooglePlaces = require('googleplaces');
var config = require('../config.js');

module.exports = function(parameters, callback) {
  var responseBody = [];
  var googlePlaces = new GooglePlaces(config.apiKey, config.format);

  googlePlaces.nearBySearch(parameters, function (error, response) {
    if (error) throw error;

    if(response.results.length < parameters.maxPlaces) {
      parameters.maxPlaces = response.results.length;
    }

    var index = 0;
    var responseBody = [];

    while(index < parameters.maxPlaces) {
      console.log(response.results);
      var place = {
        'name': response.results[index]['name'],
        'lat': response.results[index]['geometry']['location']['lat'],
        'lng': response.results[index]['geometry']['location']['lng'],
        'vicinity': response.results[index]['vicinity'],
        'rating': null
      };

      if(response.results[index]['rating'] != undefined) {
        place.rating = response.results[index]['rating'];
      }

      responseBody.push(place);
      index++;
    }

    callback(responseBody);
  });

}
