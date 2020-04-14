var f = "data/cleaned_final.csv"

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select(".waterfall")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv(f).then(function(data) {

    // extract the year from the date and make it a string
    
    data.forEach(function(d) {
        d.Event_Date = new Date(d.Event_Date);
        d.Event_Date = d.Event_Date.getFullYear();
        d.Event_Date = String(d.Event_Date);
      //  console.log(d.Event_Date);
    });

    // group by year and count the accidents
    // using underscore.js countBy

    grouped = _.countBy(data, "Event_Date");
    
    // console.log(grouped);

    gk = Object.keys(grouped);
    gv = Object.values(grouped);
        
    // console.log(gk);
    // console.log(gv);
    
    // turn our grouped count into an array of objects for D3
    // using underscore.js zip and map
    
    obj = _.zip(gk,gv).map(function(pair) { 
        return _.object(["year","count"],pair); 
    });

    obj.year = +obj.year;
    obj.count = +obj.count;
    
    console.log(obj);

    var x = d3.scaleBand()        
        .padding(0.2)
        .domain(obj.map( d => d.year ))
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(obj.map( d => d.count ))]);
       
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Accidents");

    svg.selectAll("rect")
        .data(obj)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", x(d => d.year))
        .attr("y", y(d => d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d => (height - y(d.count))));
    
    
});