var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
//   var newtry = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=1000";
  
  d3.json("/data/new_cut.json", function(response) {
  
    console.log(response);
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
  
      if (location) {
        L.marker([location.Latitude, location.Longitude]).addTo(myMap);
      }
    }
  
  });
  