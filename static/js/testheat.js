var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
  });
  
  var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json("/data/damage_rating.json", function(response) {

    console.log(response)

    var heatArray = [];

    for (var i = 0; i < response.length; i++) {
        var location = response[i];
    
        if (location) {
          heatArray.push({lat: location.Latitude, lng: location.Longitude, value: location.Damage_Rating});
        }
      }
      console.log(heatArray)

      var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 2,
        "maxOpacity": .8,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'Latitude',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'Longitude',
        // which field name in your data represents the data value - default "value"
        valueField: 'Damage_Rating'
      };
      
      
      var heat = L.heatLayer(heatArray, {
        radius: 80,
        "useLocalExtrema": true,
        "maxOpacity": .8,
        // scaleRadius: true,
        blur: 10
      }).addTo(myMap);

    });
