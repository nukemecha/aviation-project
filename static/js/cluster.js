url = 'http://127.0.0.1:5000/'

var myMap = new L.map("clustermap", {
  center: new L.LatLng(37.0902, -95.7129),
  zoom: 2
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
  iconUrl: '../images/ap_fire.png',
  shadowUrl: '../images/ap_fire_shadow.png',

  iconSize:     [60, 70], // size of the icon
  shadowSize:   [30, 35], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [50, 62],  // the same for the shadow
  popupAnchor:  [10, -76] // point from which the popup should open relative to the iconAnchor
});
var markers;
var data;
function buildClusterMap(Country){
// d3.json("/data/data_json.json").then(function(response) {

  // console.log(response);

  if(markers != undefined){
    myMap.removeLayer(markers)
  }

  markers = new L.markerClusterGroup();

  for (var i = 0; i < data.result.length; i++) {
    var location = data.result[i];
    
    if (location) {
      if (location.Country == Country) {
      
      markers.addLayer(L.marker([location.Latitude, location.Longitude], {icon: apIcon})
      .bindPopup("<h4 style='text-align:center;'>" + data.result[i].Location + 
      "</h4> <hr> <h4 style='text-align:center;'>" + data.result[i].Event_Date + "</h4>"))
      }
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
// });
};


function init() {
  var selector = d3.select('#selDataset');

  d3.json(url).then(function(response) {
    data = response
    console.log(response)
  
    var country = [];
  
    for (var i = 0; i < data.result.length; i++) {
        var location = data.result[i];
    
        if (location) {
          country.push(location.Country);
        }
    };
    country = country.sort();
      countryUnique = new Set(country);
      countryUnique.forEach( name => {
          selector
              .append('option')
              .text(name)
              .property('value',name);
      });
      // var Country = countryUnique[0];
      buildClusterMap('Afghanistan');
  });
};

function optionChanges(newCountry) {
buildClusterMap(newCountry);
}

init();

