//  Define SVG area dimensions
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
var url="http://127.0.0.1:5000/"

d3.json(url).then(function (data) { 
  data.result.forEach(function (d) { 
      // make event_date a proper date object
      d.Event_Date = new Date(d.Event_Date);
      // cut event_date down to the year only
      d.Event_Date = d.Event_Date.getFullYear();
  });
  // group by year
  var grouped_by_year = _.groupBy(data.result, "Event_Date");
  console.log(grouped_by_year);
  var final_grouped=_.groupBy(grouped_by_year,"Country");
  console.log(final_grouped);
  // our fatality counter
  var fcount = {};
  // iterate over each year & country in the grouped_by_year OBJECT
  // which contain arrays
  for (y in grouped_by_year) {
      var i = 0;
      // iterate over the array and add up fatalities
      grouped_by_year[y].forEach(function (d){
          i += d["Total_Fatal_Injuries"];
      });
      fcount[y] = i;
    }
    console.log(fcount);
});

  // var query = Enumerable.From(data)
  //   .Where("$.Country != null")
  //   .GroupBy(
  //       "{ PL1: $.Country , PL2: $.eventYear }",
  //       "$.fatalInjuries | 0",
  //       "{ Name: $.PL2, ParentName: $.PL1, fatalInjuries: $$.Sum() }",
  //       "$.PL1 + ' ' + $.PL2") // this must be included
  //   .ToArray();
  // console.log(query);

// });
// });
 
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(data.result, data => data.Event_Date))
    .range([0, chartWidth]);
  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(grouped_by_year, data =>data.fatalInjuries)])
    .range([chartHeight, 0]);
  
  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure three line function which will plot the x and y coordinates using our scales
  var fatalLine = d3.line()
    .x(data => xTimeScale(grouped_by_year.Event_Date))
    .y(data => yLinearScale(grouped_by_year.Total_Fatal_Injuries));
  var seriousLine = d3.line()
    .x(data => xTimeScale(data.date))
    .y(data => yLinearScale(data.seriousInjuries));
    var minorLine = d3.line()
    .x(data => xTimeScale(data.date))
    .y(data => yLinearScale(data.minorInjuries));
 
//   // Append an SVG path and plot its points using the line function
//   chartGroup.append("path")
//     // The drawLine function returns the instructions for creating the line for forceData
//     .attr("d", fatalLine(aviationData))
//     .classed("line", true)
//     .style("stroke","red");
//   chartGroup.append("path")
//     // The drawLine function returns the instructions for creating the line for forceData
//     .attr("d", seriousLine(aviationData))
//     .classed("line", true)
//     .style("stroke","yellow");
//   chartGroup.append("path")
//     // The drawLine function returns the instructions for creating the line for forceData
//     .attr("d", minorLine(aviationData))
//     .classed("line", true)
//     .style("stroke","green");
//     // Append axes titles
//   chartGroup.append("text")
//   .attr("transform", `translate(${chartWidth/ 2}, ${chartHeight + margin.top + 20})`)
//     .classed("dow-text text", true)
//     .text("Year");

//   // Append an SVG group element to the chartGroup, create the left axis inside of it
//   chartGroup.append("g")
//     .classed("axis", true)
//     .call(leftAxis);

//   // Append an SVG group element to the chartGroup, create the bottom axis inside of it
//   // Translate the bottom axis to the bottom of the page
//   chartGroup.append("g")
//     .classed("axis", true)
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);
// }).catch(function(error) {
//   console.log(error);
// });
