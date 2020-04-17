var myMap = new L.map("map", {
  center: new L.LatLng(37.0902, -95.7129),
  zoom: 4
});

// Adding tile layer
var tiles = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});
myMap.addLayer(tiles);

var apIcon = L.icon({
  iconUrl: 'ap_fire.png',
  shadowUrl: 'ap_fire_shadow.png',

  iconSize:     [60, 70], // size of the icon
  shadowSize:   [30, 35], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [50, 62],  // the same for the shadow
  popupAnchor:  [10, -76] // point from which the popup should open relative to the iconAnchor
});
var markers;
var data;
function buildMap(Country){
// d3.json("/data/data_json.json").then(function(response) {

  // console.log(response);

  if(markers !=undefined){
    myMap.removeLayer(markers)
  }

  markers = new L.markerClusterGroup();

  for (var i = 0; i < data.length; i++) {
    var location = data[i];
    
    if (location) {
      if (location.Country == Country) {
      
      markers.addLayer(L.marker([location.Latitude, location.Longitude], {icon: apIcon})
      .bindPopup("<h4 style='text-align:center;'>" + data[i].Location + 
      "</h4> <hr> <h4 style='text-align:center;'>" + data[i].Event_Date + "</h4>"))
      }
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
console.log(myMap)
// });
};

function init() {
  var selector = d3.select('#selDataset');

  d3.json("/data/data_json.json").then(function(response) {
    data = response
    console.log(response)
  
    var eventDate = [];
  
    for (var i = 0; i < data.length; i++) {
        var location = data[i];
    
        if (location) {
          eventDate.push(location.Country);
        }
    }
      console.log(eventDate)
      eventDateUnique = new Set(eventDate);
      eventDateUnique.forEach( name => {
          selector
              .append('option')
              .text(name)
              .property('value',name);
      });
      var Country = eventDateUnique[0];
      buildMap('United States');
  });
};

function optionChanged(newYear) {
buildMap(newYear);
//   buildMetadata(newSample);
}

init();

