var selector=d3.select("#selDataset")
var chartselector=d3.select("#injury_lineChart")

function plotChart(country){
  // chartselector.html("");
  d3.csv("/static/data/location_final.csv").then(function(aviationData) {
  
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
    text: aviationData.map(d => d.romanName),
    name:"Minor Injury",
    type: "scatter",
    mode:"lines+markers"
  };

  var data=[trace1,trace2,trace3];
  var layout={
    title:`${country} Injuries by Year`
  }

  Plotly.newPlot("injury_lineChart",data,layout)
  });
}

function init() {
  // Grab a reference to the dropdown select element

  // Use the list of sample names to populate the select options
  d3.csv("/static/data/location_final.csv").then(function(aviationData) {
    var countries=aviationData.map(d=>d.Country);
    countryUnique = new Set(countries);
    countryUnique=Array.from(countryUnique);
    console.log(countryUnique)

    countryUnique.forEach((country) => {
      selector
        .append("option")
        .text(country)
        .property("value", country);
    });

    // Use the first sample from the list to build the initial plots
    // var firstCountry = "United States";
    plotChart("United States");
    
  });
}

selector.on("change",optionChanged);
function optionChanged() {
  let newSample=this.value;
  // Fetch new data each time a new sample is selected
  plotChart(newSample);
  
}

// Initialize the dashboard
init();