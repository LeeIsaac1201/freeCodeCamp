/* global d3, topojson, Promise, Map */

// Data Uniform Resource Locators (URLs) for the education and counties data
const educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countiesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

// Dimensions for the Scalable Vector Graphics (SVG) map
const width = 960;
const height = 600;

// SVG container setup
const svg = d3.select("#choropleth")
  .attr("width", width)
  .attr("height", height);

// Tooltip setup
const tooltip = d3.select("#tooltip");

// Load the education and counties data
Promise.all([
  d3.json(countiesURL),
  d3.json(educationURL)
]).then(([us, education]) => {
  // Create a map of education data keyed by Federal Information Processing Standards (FIPS) code
  const educationMap = new Map(education.map(d => [d.fips, d]));

  // GeoPath generator for rendering the geographic shapes
  const path = d3.geoPath();

  // Colour scale for the choropleth map based on education levels
  const colorScale = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50])
    .range(d3.schemeBlues[6]);

  // Create the map paths (counties) and colour them according to education levels
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("fill", d => {
      const county = educationMap.get(d.id);
      return county ? colorScale(county.bachelorsOrHigher) : "#ccc";
    })
    .attr("data-fips", d => d.id)
    .attr("data-education", d => educationMap.get(d.id)?.bachelorsOrHigher || 0)
    .on("mouseover", function(event, d) {
      const county = educationMap.get(d.id);
      tooltip
        .style("visibility", "visible")
        .attr("data-education", county?.bachelorsOrHigher || 0)
        .html(`${county.area_name}, ${county.state}<br>${county.bachelorsOrHigher}%`);
    })
    .on("mousemove", function(event) {
      const [xPos, yPos] = d3.pointer(event, d3.select("#map-container").node());
      tooltip
        .style("left", (xPos + 10) + "px")
        .style("top", yPos + "px");
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"));

  // Setup the legend for education levels
  const legendWidth = 300;
  const legendSvg = d3.select("#legend");
  const x = d3.scaleLinear().domain([10, 60]).range([0, legendWidth]);

  const legendThreshold = d3.scaleThreshold()
    .domain(colorScale.domain())
    .range(colorScale.range());

  const legendGroup = legendSvg.append("g")
    .attr("transform", "translate(0,10)");

  // Draw the colour rectangles for the legend
  legendGroup.selectAll("rect")
    .data(legendThreshold.range().map(color => {
      const d = legendThreshold.invertExtent(color);
      if (!d[0]) d[0] = x.domain()[0];
      if (!d[1]) d[1] = x.domain()[1];
      return d;
    }))
    .enter().append("rect")
    .attr("x", d => x(d[0]))
    .attr("y", 10)
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("height", 10)
    .attr("fill", d => colorScale(d[0]));

  // Add ticks for the legend
  const tickValues = [10, 20, 30, 40, 50, 60];

  // Custom tick labels for the legend
  legendGroup.selectAll("text")
    .data(tickValues)
    .enter()
    .append("text")
    .attr("x", d => x(d))
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(d => d);

  // Add custom dividing lines (below the colour bars)
  legendGroup.selectAll("line")
    .data(tickValues)
    .enter()
    .append("line")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", 10)
    .attr("y2", 25)
    .attr("stroke", "#000")
    .attr("stroke-width", 1);
});
