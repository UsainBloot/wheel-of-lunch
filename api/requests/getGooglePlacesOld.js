var baseURL = "maps.googleapis.com/maps/api/place/nearbysearch/json";
var apiKey = "AIzaSyDnM4OGSqM7nNwL5YXIjJikowkI9fEwXp8";

var options = {
  host: baseURL,
  path: '?' + qs.stringify({
    type: req.query.type,
    location: req.query.latitude + "," + req.query.longitude,
    radius: req.query.radius,
    minprice: req.query.minPrice,
    maxprice: req.query.maxPrice,
    key: apiKey
  }),
  method: 'GET'
};

var callback = function(response) {

  // Continuously update stream with data
  var body = '';
  var results = [];
  response.on('data', function(data) {
    responseBody = JSON.parse(data);
  });
  response.on('end', function() {
    // Data reception is done, do whatever with it!
    var places = [];

    $i = 0;

    if(responseBody.length < req.query.maxPlaces) {
      req.query.maxPlaces = responseBody.length;
    }

    var i = 0;
    var body = [];

    while(i < req.query.maxPlaces) {
      var place = {
        'name': responseBody[i]['name'],
        'lat': responseBody[i]['geometry']['location']['lat'],
        'lng': responseBody[i]['geometry']['location']['lng'],
        'vicinity': responseBody[i]['geometry']['location']['vicinity'],
        'rating': null
      };

      if(responseBody[i]['rating'] != undefined) {
        place.rating = responseBody[i]['rating'];
      }

      body.push(place);
      i++;
    }
    res.send(body);
  });
}

https.request(options, callback).end();
