var selector=d3.select("#selDataset")

var markers;
var data;

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
  iconUrl: '../images/ap_fire.png',
  shadowUrl: '../images/ap_fire_shadow.png',

  iconSize:     [60, 70], // size of the icon
  shadowSize:   [30, 35], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [50, 62],  // the same for the shadow
  popupAnchor:  [10, -76] // point from which the popup should open relative to the iconAnchor
});

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

function plotChart(country){
  // chartselector.html("");
  d3.json("http://127.0.0.1:5000/jin").then(function(aviationData) {
  
  aviationData=aviationData.filter(d =>d.Country===country);
    
  var trace1 = {
    x: aviationData.map(d => +d.Year),
    y: aviationData.map(d => +d.Total_Fatal_Injuries),
    text: aviationData.map(d => d.fatalInjury),
    name: "Fatal Injury",
    type: "scatter",
    mode:"lines+markers"

  };

  // Trace 2 for the Roman Data
  var trace2 = {
    x: aviationData.map(d => +d.Year),
    y: aviationData.map(d => +d.Total_Serious_Injuries),
    text: aviationData.map(d => d.seriousInjury),
    name:"Serious Injury",
    type: "scatter",
    mode:"lines+markers"
  };

  var trace3 = {
    x: aviationData.map(d => +d.Year),
    y: aviationData.map(d => +d.Total_Minor_Injuries),
    text: aviationData.map(d => d.minorInjury),
    name:"Minor Injury",
    type: "scatter",
    mode:"lines+markers"
  };

  var data=[trace1,trace2,trace3];
  var layout={
    showlegend: true,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1.15
    },
    title:{
      text:`${country} Injuries by Year`,
      font:{
        family:"Times",
        Size:24,
      }
    },
    xaxis: {
      title: {
        text: 'Year',
        font: {
          family: 'Times',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis:{
      title: {
        text: 'Injuries',
        font: {
          family: 'Times',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
  };

  Plotly.newPlot("injury_lineChart",data,layout)
  });
}


function init() {

  d3.json("/static/data/data_json.json").then(function(response) {
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
  plotChart("United States")
};

selector.on("change",optionChanged);
function optionChanged() {
  let newSample=this.value;
  // Fetch new data each time a new sample is selected
  plotChart(newSample);
  buildMap(newSample);
}

// Initialize the dashboard
init();
