// Creating map object
var myMap = L.map("map", {
    center: [10, -40.2437],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var jsonData;

  d3.json('http://127.0.0.1:5000/').then(data => {
    
    jsonData = data;

    data.result.forEach(obj => {
        Event_Date = new Date(obj.Event_Date);
        rowYear = String(Event_Date.getFullYear());
        d3.select('select').append('option').text(rowYear)
    });
  });

//   jsonData.result[100].Latitude
// 35.145277
// jsonData.result[100].Longitude
// -106.795277
// jsonData.result[100].Event_Date
// "10/29/2019"
// jsonData.result[100].Damage_Rating