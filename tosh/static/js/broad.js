const url = 'http://127.0.0.1:5000';

// const f = "data/cleaned_final.csv";

// d3.csv(f).then(function(data) { 

//     grouped = _.countBy(data, "Broad_Phase_of_Flight");

//     console.log(grouped);

//     my_order = []

// });

var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select(".waterfall")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(url).then(function (data) {

    // console.log(data.result)

    var grouped = _.countBy(data.result, "Broad_Phase_of_Flight");

    //console.log(grouped);

    var my_order = ["STANDING", "GO-AROUND", "TAXI", "TAKEOFF", "CLIMB",
        "CRUISE", "MANEUVERING", "DESCENT", "APPROACH", "LANDING"];

    var my_count = [];
    
    //console.log(my_order);

    my_order.forEach(function (d) { 
       // console.log(grouped[d]);
        my_count.push(grouped[d]);
    });

    // console.log(my_count);

    var obj = _.zip(my_order, my_count).map(function(pair) { 
        return _.object(["phase","count"],pair); 
    });

    

    // get our heights for each phase of flight
    var previous_y1 = 0;

    obj.forEach( (d, i) => {

    // if i != 0 y0 = previous y1, y1 = y0 + count
        if (i != 0) {
            d.y0 = previous_y1;
            d.y1 = d.y0 + d.count;
            previous_y1 = d.y1;
        } else {
    // if i == 0 then height = 0 + count
            d.y0 = 0;
            d.y1 = d.y0 + d.count;

            previous_y1 = d.y1;
        }
    });

    console.log(obj);

    // now let's do some graphing 
    var xBandScale = d3.scaleBand()
        .domain(obj.map(d => d.phase))
        .range([0, width])
        .padding(0.1);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(obj, d => d.y1)])
        .range([height, 0]);

    var xAxis = d3.axisBottom(xBandScale);

    var yAxis = d3.axisLeft(yLinearScale)
        .tickFormat(d3.format(".2s"));


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-5, 0)")
        .call(yAxis);

    var chart = svg.selectAll(".waterfall")
        .data(obj)
        .enter().append("g")
        .attr("class", "g");
        
    chart.selectAll("rect")
        .data(obj)
        .enter().append("rect")
        .attr("width", xBandScale.bandwidth())
        .attr("x", d => xBandScale(d.phase))
        .attr("y", d => yLinearScale(d.y1))
        .attr("height", d => height - yLinearScale(d.y0));
              
});



