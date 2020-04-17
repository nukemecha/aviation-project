// Define SVG area dimensions
var svgWidth = 500;
var svgHeight = 260;

// Define the chart's margins as an object
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3
  .select("#injury_lineChart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var formatYear = d3.timeFormat("%Y");
function lineChart(injuries){
  d3.csv("static/data/cleaned_final.csv").then(function(avaiationData) {


    // Print the forceData
  console.log(avaiationData);

  // avaiationData.forEach(function(data) {
  //   data.date=formatYear(new Date (data.Event_Date));
  //   data.fatalInjuries= +data.Total_Fatal_Injuries;
  //   data.seriousInjuries= +data.Total_Serious_Injuries;
  //   data.minorInjuries = +data.Total_Minor_Injuries;
  //   console.log(data.date);
  //   console.log(data.fatalInjuries);
  //   console.log(data.seriousInjuries);
  //   console.log(data.minorInjuries);
  // });
  var date=formatYear(new Date (data.Event_Date));
  var fatalInjuries= +data.Total_Fatal_Injuries;
  var seriousInjuries= +data.Total_Serious_Injuries;
  var minorInjuries = +data.Total_Minor_Injuries;
  console.log(data.date);
  console.log(data.fatalInjuries);
  console.log(data.seriousInjuries);
  console.log(data.minorInjuries);

  var allLines=["Total_Fatal_Injuries","Total_Serious_Injuries","Total_Minor_Injuries"]
  var dataReady=allLines.map(function(lineinfo){
    return{
      name: lineinfo,
      values:avaiationData.map(function(d){
        return {year:date,value:+d.[lineinfo]};
      })
    };
  });
  var lineColor=d3.scaleOrdinal()
    .domain(allLines)
    .range(d3.schemeSet2);

  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(avaiationData, data => data.date))
    .range([0, chartWidth]);
  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(avaiationData, data => data.fatalInjuries)])
    .range([chartHeight, 0]);
  
  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

    // Configure three line function which will plot the x and y coordinates using our scales
  // var fatalLine = d3.line()
  //   .x(data => xTimeScale(data.date))
  //   .y(data => yLinearScale(data.fatalInjuries));
  // var seriousLine = d3.line()
  //   .x(data => xTimeScale(data.date))
  //   .y(data => yLinearScale(data.seriousInjuries));
  //   var minorLine = d3.line()
  //   .x(data => xTimeScale(data.date))
  //   .y(data => yLinearScale(data.minorInjuries));
  var line=d3.line()
    .xTimeScale(function(d){return xTimeScale(d.year)})
    .yLinearScale(function(d){return yLinearScale(d.value)})
  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", fatalLine(avaiationData))
    .classed("line", true);
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", seriousLine(avaiationData))
    .classed("line", true);
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", minorLine(avaiationData))
    .classed("line", true);
  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});
};

function optionChanged(idInput){
  lineChart(idInput);
};

function init(){
  var dropdown=d3.select("#selDataset");
  // read the json data 
  d3.csv("static/data/cleaned_final.csv").then((data)=> {
    console.log(data);
    // get the country from dataset for the dropdown menu
    data.names.forEach(function(country){
      dropdown.append("option").text(country).property("value");
    });
  // call function to display graphics and info 
  lineChart(data.country[0]);

  });
};

init();