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

  

// function lineChart(country){
var country="United States"
var parseTime = d3.timeParse("%Y");
d3.csv("/static/data/location_final.csv").then(function(aviationData) {
  console.log(aviationData);
  // console.log([aviationData]);
  aviationData=aviationData.filter(d =>d.Country===country);
  console.log(aviationData);

  aviationData.forEach(function(data) {
    data.Year = +data.Year;
    data.fatalInjuries=+data.Total_Fatal_Injuries;
    data.seriousInjuries= +data.Total_Serious_Injuries;
    data.minorInjuries = +data.Total_Minor_Injuries;
  //   data.date=formatYear(new Date (data.Event_Date));
  //   data.fatalInjuries= +data.Total_Fatal_Injuries;
  //   data.seriousInjuries= +data.Total_Serious_Injuries;
  //   data.minorInjuries = +data.Total_Minor_Injuries;
    console.log(data.Year);
    
  //   // console.log(fatalInjuries);
  //   // console.log(seriousInjuries);
  //   // console.log(minorInjuries);
  // });
    // var year=formatYear(new Date(aviationData.Event_Date));
    // var groupedCountry = _.groupBy(aviationData, "Country");
    // // var groupedfinal=_.groupBy(groupedCountry,data.date);
    // // console.log(year);
    // console.log(groupedCountry);
 
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(aviationData, d => d.Year))
    .range([0, chartWidth]);
  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(aviationData, d =>d.fatalInjuries)])
    .range([chartHeight, 0]);
  
  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure three line function which will plot the x and y coordinates using our scales
  var fatalLine = d3.line()
    .x(d => xTimeScale(d.Year))
    .y(d => yLinearScale(d.fatalInjuries));
  // var seriousLine = d3.line()
  //   .x(d => xTimeScale(d.Year))
  //   .y(d => yLinearScale(d.seriousInjuries));
  //   var minorLine = d3.line()
  //   .x(d => xTimeScale(d.Year))
  //   .y(d => yLinearScale(d.minorInjuries));
 
  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", fatalLine(aviationData))
    .classed("line", true)
    .style("stroke","red");
  // chartGroup.append("path")
  //   // The drawLine function returns the instructions for creating the line for forceData
  //   .attr("d", seriousLine(aviationData))
  //   .classed("line", true)
  //   .style("stroke","yellow");
  // chartGroup.append("path")
  //   // The drawLine function returns the instructions for creating the line for forceData
  //   .attr("d", minorLine(aviationData))
  //   .classed("line", true)
  //   .style("stroke","green");
    // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${chartWidth/ 2}, ${chartHeight + margin.top + 10})`)
    .classed("dow-text text", true)
    .text("Year");

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
});
// }


