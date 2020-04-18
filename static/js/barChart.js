/***************************************************************
javascript library Chart.js
**************************************************************/
// Design horizontal bar chart using chart.js to represent the Type of Injuries by year
// https://www.chartjs.org/samples/latest/scriptable/bubble.html
//
// LINE TO ADD HTML
//  First, we need to have a canvas in our page.
//  <canvas id="myChart"></canvas> 
//   Now that we have a canvas we can use, we need to include Chart.js in our page.
//  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
//
// EStablich conection to the data in the csv file

/***************************************************************
BRING THE DATA
**************************************************************/
// I TRIED TO BRING THE DATA

// // basic settings for svg container
// var svgWidth = 800;
// var svgHeight = 500;

// // define the margin
// var margin = {
//     top: 20,
//    right: 40,
//    bottom: 80,
//    left: 100
// };

// // chart area minus margin
// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 800 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // Create an SVG wrapper, 	
// var svg = d3.select(".horizontalBar")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
// 		.attr("height", height + margin.top + margin.bottom)
// 	// Append an SVG group that hold the chart and shift the chart to the left and top margins	
//     .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	

// d3.csv("../static/data/cleaned_final_2.csv").then(function (metadata) {
//     // console.log(metadata);
//     // extract the year from the date and make it a string
//     metadata.forEach(function(d) {
//         // make event_date a proper date object
//         d.Event_Date = new Date(d.Event_Date);
        
//         // cut event_date down to the year only
//         d.Event_Date = d.Event_Date.getFullYear();
        
//         // group by year and using underscore
//         var grouped_by_year = _.groupBy(metadata, "Event_Date");

//         // console.log(grouped_by_year);

//         // our fatal injuries counter
//         var fatalCount = {};
//         var seriousCount = {};
//         var minorCount = {};

//         // iterate over each year in the grouped_by_year OBJECT
//         // which contain arrays
//         for (y in grouped_by_year) {
//             var i = 0;
//             var j = 0;
//             var k = 0;
//             // iterate over the array and add up fatalities
//             grouped_by_year[y].forEach(function (d){
//                 i += d["Total_Fatal_Injuries"];
//                 j += d["Total_Serious_Injuries"];
//                 k += d["Total_Minor_Injuries"];
//             });
//             // add the total to our count object
//             fatalCount[y] = i;
//             seriousCount[y] = j;
//             minorCount[y] = k;
//         };
//         // console.log(fatalCount);
//         // console.log(seriousCount);
//         // console.log(minorCount);  
//     });
// });


/*******************************************************************************
CREATE THE CHART.JS
********************************************************************************/


var YEARS = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010','2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
		var color = Chart.helpers.color;
		var horizontalBarChartData = {
			labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
			datasets: [{
				label: 'Fatal Injuries',
				backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
				borderColor: window.chartColors.red,
				borderWidth: 1,
				data: [48, 535, 666, 1074, 740, 864, 799, 785, 854, 1068, 695, 687, 713, 659, 597, 575, 614, 547, 532, 552

				]
			}, {
				label: 'Serious Injuries',
				backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
				borderColor: window.chartColors.blue,
				data: [40, 198, 342, 442, 416, 365, 324, 328, 339, 312, 280, 392, 277, 335, 291, 333, 273, 256, 289, 260
	
				]
			},{
				label: 'Minor Injuries',
				backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
				borderColor: window.chartColors.yellow,
				borderWidth: 1,
				data: [66, 226, 533, 724, 544, 538, 436, 511, 679, 488, 427, 441, 407, 585, 426, 405, 418, 388, 392, 308

				]
			}]

		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myHorizontalBar = new Chart(ctx, {
				type: 'horizontalBar',
				data: horizontalBarChartData,
				options: {
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					elements: {
						rectangle: {
							borderWidth: 2,
						}
					},
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Horizontal Bar Chart Chart.js'
					}
				}
			});

		};

		document.getElementById('randomizeData').addEventListener('click', function() {
			var zero = Math.random() < 0.2 ? true : false;
			horizontalBarChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return zero ? 0.0 : randomScalingFactor();
				});

			});
			window.myHorizontalBar.update();
		});

		var colorNames = Object.keys(window.chartColors);

		document.getElementById('addDataset').addEventListener('click', function() {
			var colorName = colorNames[horizontalBarChartData.datasets.length % colorNames.length];
			var dsColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Injuries ' + (horizontalBarChartData.datasets.length + 1),
				backgroundColor: color(dsColor).alpha(0.5).rgbString(),
				borderColor: dsColor,
				data: []
			};

			for (var index = 0; index < horizontalBarChartData.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			horizontalBarChartData.datasets.push(newDataset);
			window.myHorizontalBar.update();
		});

		document.getElementById('addData').addEventListener('click', function() {
			if (horizontalBarChartData.datasets.length > 0) {
				var years = YEARS[horizontalBarChartData.labels.length % YEARS.length];
				horizontalBarChartData.labels.push(years);

				for (var index = 0; index < horizontalBarChartData.datasets.length; ++index) {
					horizontalBarChartData.datasets[index].data.push(randomScalingFactor());
				}

				window.myHorizontalBar.update();
			}
		});

		document.getElementById('removeDataset').addEventListener('click', function() {
			horizontalBarChartData.datasets.pop();
			window.myHorizontalBar.update();
		});

		document.getElementById('removeData').addEventListener('click', function() {
			horizontalBarChartData.labels.splice(-1, 1); // remove the label first

			horizontalBarChartData.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});

			window.myHorizontalBar.update();
		});