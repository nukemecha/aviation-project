var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

url = new URL('http://127.0.0.1:5000/')

var map;
var heatmapLayer;
var datas;
function buildMap(Year){

  if(heatmapLayer != undefined){
    map.removeLayer(heatmapLayer)
  }

  var container = L.DomUtil.get('heatmap');

  if(container != null){

  container._leaflet_id = null;

  }

  var data = [];

  for (var i = 0; i < datas.result.length; i++) {
      var location = datas.result[i];
  
      if (location) {
        Event_Date = new Date(location.Event_Date);
        rowYear = Event_Date.getFullYear();
        rowYear = String(rowYear);
        if (rowYear == Year) {
          data.push({lat: location.Latitude, lng: location.Longitude, count: location.Damage_Rating});
        }
      }
  }
    // console.log(data)

var testData = {
  max: 3,
  data
};
// console.log(testData)
var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 1,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": false,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};

heatmapLayer = new HeatmapOverlay(cfg);

  map = new L.map("heatmap", {
  center: new L.LatLng(37.0902, -95.7129),
  zoom: 4,
  layers: [baseLayer, heatmapLayer]
}); 

heatmapLayer.setData(testData);

};
  function init() {
    var selector = d3.select('#selData');

    d3.json(url).then(function(response) {
      datas = response
      // console.log(response)
    
      var eventDate = [];
    
      for (var i = 0; i < datas.result.length; i++) {
          var location = datas.result[i];
      
          if (location) {
            Event_Date = new Date(location.Event_Date);
            Year = Event_Date.getFullYear();
            Year = String(Year);
            eventDate.push(Year);
          }
      }
        // console.log(eventDate)
        eventDateUnique = new Set(eventDate);
        eventDateUnique.forEach( name => {
            selector
                .append('option')
                .text(name)
                .property('value',name);
        });
        var Year = eventDateUnique[0];
        buildMap(Year);
    });
};

function optionChanged(newYear) {
  buildMap(newYear);
}

init();
