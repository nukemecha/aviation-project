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

  var apIcon = L.icon({
    iconUrl: 'ap_fire.png',
    shadowUrl: 'ap_fire_shadow.png',

    iconSize:     [60, 70], // size of the icon
    shadowSize:   [30, 35], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [50, 62],  // the same for the shadow
    popupAnchor:  [10, -76] // point from which the popup should open relative to the iconAnchor
});
  
  d3.json("/data/new_cut.json", function(response) {
  
    console.log(response);

    var markers = L.markerClusterGroup();
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
      
      if (location) {
        
        markers.addLayer(L.marker([location.Latitude, location.Longitude], {icon: apIcon})
        .bindPopup("<h4 style='text-align:center;'>" + response[i].Location + 
        "</h4> <hr> <h4 style='text-align:center;'>" + response[i].Event_Date + "</h4>"))
      }

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

  });
  