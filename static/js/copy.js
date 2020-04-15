var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 3
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
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
          heatArray.push([location.Latitude, location.Longitude]);
        }
      }
      console.log(heatArray)
      var heat = L.heatLayer(heatArray, {
        radius: 60,
        blur: 35
      }).addTo(myMap);

    });
  