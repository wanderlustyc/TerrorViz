/********************************************************************************************\
Description: Function to draw the header bar chart displaying total attacks for each year.
/*******************************************************************************************/

function drawTotalAttacks(){

    var margin = {top: 10, right: 20, bottom: 10, left: 40},
    width = 910 - margin.left - margin.right,
    height = 120 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
    .domain([1970, 2015])
    .range([0, width-margin.left-margin.right-40]);


    var y = d3.scaleLog()
    .domain([470, 16840])
    .range([5, height]);

    var svg = d3.select(".page-header").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    // var textbox = svg
    //     .append("text")
    //     .text("Attack")
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", "20px")
    //     .attr("fill", "red");

    var totalCanvas = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/totals.csv", function(error, data) {


    totalCanvas.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .style("fill", "#242478")
    .attr("x", function(d) { return x(d.Year) + 90; })
    .attr("width", 10)
    .attr("y", function(d) { return height - y(d.Totals - 40); })
    .attr("height", function(d) { return y(d.Totals); })
    .on("mouseover", function(d) {
      
          var coordinates = [0, 0];
          coordinates = d3.mouse(this);   // Get the mouse positions to show tooltip at.
          // console.log(coordinates);
          var xPosition = coordinates[0];
          var yPosition = coordinates[1];
           
          d3.select("#tooltip4")
                .style('left', xPosition + 'px')
                .style('top', yPosition + 'px')
                .text("Total Attacks: " + d.Totals + " | Year: " + d.Year);
            
  
          d3.select("#tooltip4").classed("hidden", false);
    })
  
    .on("mouseout", function() {
            d3.select("#tooltip4").classed("hidden", true);
    });

  
  }); 


}