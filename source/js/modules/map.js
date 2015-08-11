module.exports = (function() {

  'use strict';

  function Map(canvasID, searchButtonID) {
    this.position = {
      latitude: 0,
      longitude: 0
    };

    this.map = new google.maps.Map(document.getElementById(canvasID), {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.383639452689664, -17.39866406249996),
        new google.maps.LatLng(59.53530451232491, 8.968523437500039));
    this.map.fitBounds(this.defaultBounds);

    this.input = document.getElementById(searchButtonID);

    this.searchBox = new google.maps.places.SearchBox((this.input));

    this.init();
  }

  Map.prototype.init = function() {
    this.addEvents();
  };

  Map.prototype.addEvents = function() {
    this.placesChanged();
    this.boundsChanged();
    this.centerChanged();
  };

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  Map.prototype.placesChanged = function() {
    var self = this;
    google.maps.event.addListener(this.searchBox, 'places_changed', function() {
      var places = self.searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      for (var j = 0, place; j < places.length; j++) {
        place = places[j];
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        bounds.extend(place.geometry.location);
      }

      self.map.fitBounds(bounds);
      if(places.length == 1){
        self.map.setZoom(16);
      }
    });
  };

  Map.prototype.boundsChanged = function() {
    var self = this;

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(this.map, 'bounds_changed', function() {
      var bounds = self.map.getBounds();
      self.searchBox.setBounds(bounds);
    });
  };

  Map.prototype.centerChanged = function() {
    var self = this;

    google.maps.event.addListener(this.map, 'center_changed', function() {
      self.position.latitude = self.map.getCenter().lat();
      self.position.longitude = self.map.getCenter().lng();
    });
  };

  return Map;
}());
