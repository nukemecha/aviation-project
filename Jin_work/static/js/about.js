// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// renderMap(aviationData);

// function renderMap(aviationData){

  var url="http://127.0.0.1:5000/"
  // d3.json(url, function(error, data) { 
  //   if (error) throw error;
  //   console.log(data);
  // });
  d3.json(url,function(data){
    console.log(data)
  
  // createFeatures(aviationData);
  });

//   function createFeatures(aviationData){
//     function accidentLayer(feature,layer){
//       return new L.circleMarker([aviationData.Latitude,aviationData.Longitude],{
//         fillOpacity:1,
//         color:chooseColor(aviationData.Damage_Rating),
//         fillColor:chooseColor(aviationData.Damage_Rating),
//         radius: markerSize(aviationData.Damage_Rating)
//       });
//     }
//   }
// }


