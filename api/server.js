var express = require('express');
var https = require('https');
var app = express();
var qs = require('querystring');
var getPlaceType = require('./validation/placeType.js');
var getGooglePlaces = require('./requests/getGooglePlaces.js');

app.get('/api/places', function (req, res) {
  req.query.type = getPlaceType(req.query.type);

  var parameters = {
    location: [req.query.latitude, req.query.longitude],
    type: req.query.type,
    radius: req.query.radius,
    minprice: req.query.minPrice,
    maxprice: req.query.maxPrice,
    maxPlaces: req.query.maxPlaces
  };

  getGooglePlaces(parameters, function(response) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  });
});

app.listen(8080, function () {
  console.log('API listening on port 8080');
});
