var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Import data from an external CSV file
d3.csv("../Data/Data.csv", function(error, Data) {
  if (error) throw error;
  console.log(Data);
  console.log([Data]);
  // Create a function to parse date and time
  var parseTime = d3.timeParse("%d-%b-%Y");

  // Format the data
  mojoData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.dow_index = +data.dow_index;
    data.smurf_sightings = +data.smurf_sightings;
  });

  // Set the ranges with scaling functions
  var xTimeScale = d3.scaleTime()
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xTimeScale)
    // Specify the number of tick marks (approximately).
    .ticks(15);
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Scale the domain
  xTimeScale.domain(d3.extent(Data, function(data) {
    return data.date;
  }));
  yLinearScale1.domain([d3.min(Data, function(data) {
    return data.dow_index;
  }), d3.max(Data, function(data) {
    return data.dow_index;
  })]);
  yLinearScale2.domain([d3.min(Data, function(data) {
    return data.smurf_sightings;
  }), d3.max(Data, function(data) {
    return data.smurf_sightings;
  })]);

  // Line generators for each line
  var line1 = d3.line()
    .x(function(data) {
      return xTimeScale(data.date);
    })
    .y(function(data) {
      return yLinearScale1(data.dow_index);
    });

  var line2 = d3.line()
    .x(function(data) {
      return xTimeScale(data.date);
    })
    .y(function(data) {
      return yLinearScale2(data.smurf_sightings);
    });

  // Append a path for line1
  svg.append("path")
    .data([mojoData])
    .attr("d", line1)
    .attr("class", "line green");

  // Append a path for line2
  svg.append("path")
    .data([Data])
    .attr("d", line2)
    .attr("class", "line blue");

  // Add x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(bottomAxis);

  // Add y-axis to the left side of the display
  svg.append("g")
    // Define the color of the axis text
    .attr("class", "dow-axis")
    .call(leftAxis);

  // Add y1-axis to the right side of the display
  svg.append("g")
    // Define the color of the axis text
    .attr("class", "blue text")
    .attr("transform", "translate(" + width + ",0)")
    .call(rightAxis);

  svg.append("text")
    // Position the text
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 35) + ")")
    .attr("class", "blue text")
    // Center the text (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .text("Smurf Sightings");

  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 20) + ")")
    .attr("class", "green text")
    .text("Dow Index");
});
