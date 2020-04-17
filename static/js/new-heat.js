

var baseLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

url = new URL('http://127.0.0.1:5000/')

function buildMap(Year){
d3.json(url, function(response) {


    // d.Event_Date = new Date(d.Event_Date);
    // d.Event_Date = d.Event_Date.getFullYear();
    // d.Event_Date = String(d.Event_Date);

// });

  console.log(response)

  var container = L.DomUtil.get('map');

  if(container != null){

  container._leaflet_id = null;

  }

  var data = [];

  for (var i = 0; i < response.result.length; i++) {
      var location = response.result[i];
  
      if (location) {
        Event_Date = new Date(location.Event_Date);
        rowYear = Event_Date.getFullYear();
        rowYear = String(rowYear);
        if (rowYear == Year) {
          data.push({lat: location.Latitude, lng: location.Longitude, count: location.Damage_Rating});
        }
      }
  }
    console.log(data)

var testData = {
  max: 3,
  data
};
console.log(testData)
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

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.map("map", {
  center: new L.LatLng(37.0902, -95.7129),
  zoom: 3,
  layers: [baseLayer, heatmapLayer]
}); 

heatmapLayer.setData(testData);
// heatmapLayer.off();
// heatmapLayer.update();

});
};
  function init() {
    var selector = d3.select('#selDataset');

    d3.json(url, function(response) {

      console.log(response)
    
      var eventDate = [];
    
      for (var i = 0; i < response.result.length; i++) {
          var location = response.result[i];
      
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
  // heatmapLayer.remove()
  buildMap(newYear);
//   buildMetadata(newSample);
}

init();

/*  start legend code */
// we want to display the gradient, so we have to draw it
var legendCanvas = document.createElement('canvas');
legendCanvas.width = 100;
legendCanvas.height = 10;
var min = document.querySelector('#min');
var max = document.querySelector('#max');
var gradientImg = document.querySelector('#gradient');
var legendCtx = legendCanvas.getContext('2d');
var gradientCfg = {};
function updateLegend(data) {
  // the onExtremaChange callback gives us min, max, and the gradientConfig
  // so we can update the legend
  min.innerHTML = data.min;
  max.innerHTML = data.max;
  // regenerate gradient image
  if (data.gradient != gradientCfg) {
    gradientCfg = data.gradient;
    var gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
    for (var key in gradientCfg) {
      gradient.addColorStop(key, gradientCfg[key]);
    }
    legendCtx.fillStyle = gradient;
    legendCtx.fillRect(0, 0, 100, 10);
    gradientImg.src = legendCanvas.toDataURL();
  }
};
/* legend code end */

// myMap.off();
// myMap.removeLayer();
