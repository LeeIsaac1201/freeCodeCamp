/* global d3, document, Set, console */

// Set Scalable Vector Graphics (SVG) canvas dimensions
const width = 1000;
const height = 600;

// Create SVG container
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define colour scale for categories
const colorScale = d3
  .scaleOrdinal()
  .range(d3.schemeTableau10.concat(d3.schemeSet3));

// Remove previous chart and legend elements
function clearChart() {
  svg.selectAll("*").remove();
  d3.select("#legend").selectAll("*").remove();
}

// Wrap long text labels within available width using <tspan>
function wrap(textSelection, availableWidth) {
  textSelection.each(function () {
    let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1,
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 0,
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");

    if (availableWidth > 0) {
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (
          tspan.node().getComputedTextLength() > availableWidth &&
          line.length > 1
        ) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + "em")
            .text(word);
        }
      }
    }
  });
}

// Load and display the selected dataset
function loadData(type) {
  clearChart();

  let dataURL = "";
  let title = "";
  let description = "";

  // Choose data source and labels based on type
  switch (type) {
    case "video":
      dataURL =
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
      title = "Video Game Sales";
      description =
        "Top 100 Most Sold Video Games Grouped by Platform";
      break;
    case "movies":
      dataURL =
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
      title = "Movie Sales";
      description =
        "Top 100 Highest Grossing Movies Grouped By Genre";
      break;
    case "kickstarter":
      dataURL =
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
      title = "Kickstarter Pledges";
      description =
        "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category";
      break;
  }

  // Update page title and description
  document.getElementById("title").textContent = title;
  document.getElementById("description").textContent = description;

  // Fetch and render data
  d3.json(dataURL)
    .then((data) => {
      // Convert data to hierarchy and compute layout
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value || 0)
        .sort((a, b) => b.value - a.value);

      d3.treemap().size([width, height - 40]).paddingInner(1)(root);

      // Draw each tile group
      const tiles = svg
        .selectAll("g.tile-group")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "tile-group")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      // Draw rectangles for tiles
      tiles
        .append("rect")
        .attr("class", "tile")
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => colorScale(d.data.category))
        .on("mousemove", function (event, d) {
          d3.select("#tooltip")
            .style("opacity", 0.9)
            .html(
              "Name: " +
                d.data.name +
                "<br>Category: " +
                d.data.category +
                "<br>Value: " +
                d.data.value
            )
            .attr("data-value", d.data.value)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => d3.select("#tooltip").style("opacity", 0));

      // Add text labels to tiles
      tiles
        .append("text")
        .attr("class", "tile-text")
        .attr("x", 4)
        .attr("y", 14)
        .style("font-size", "9px")
        .style("fill", "black")
        .style("pointer-events", "none")
        .text((d) => d.data.name)
        .each(function (d) {
          const tileWidth = d.x1 - d.x0 - 8;
          wrap(d3.select(this), tileWidth);
        });

      // Create legend from unique categories
      const categories = Array.from(
        new Set(root.leaves().map((d) => d.data.category))
      );

      const legendItemSize = 20;
      const rowGap = 20;
      const columnSpacing = 180;
      const colCount = Math.min(3, categories.length);
      const itemsPerColumn = Math.ceil(categories.length / colCount);
      const legendRowHeight = legendItemSize + rowGap;

      const totalLegendWidth = colCount * columnSpacing;
      const colOffset = (width - totalLegendWidth) / 2;
      const legendSvgHeight =
        itemsPerColumn * legendRowHeight + (itemsPerColumn - 1) * rowGap + 10;

      // Create legend SVG
      const legendSvg = d3
        .select("#legend")
        .append("svg")
        .attr("width", width)
        .attr("height", legendSvgHeight);

      // Draw legend items
      const legendItems = legendSvg
        .selectAll("g.legend-item-group")
        .data(categories)
        .enter()
        .append("g")
        .attr("class", "legend-item-group")
        .attr("transform", (d, i) => {
          const col = Math.floor(i / itemsPerColumn);
          const row = i % itemsPerColumn;
          const x = colOffset + col * columnSpacing;
          const y = row * legendRowHeight;
          return `translate(${x}, ${y})`;
        });

      legendItems
        .append("rect")
        .attr("class", "legend-item")
        .attr("width", legendItemSize)
        .attr("height", legendItemSize)
        .attr("fill", (d) => colorScale(d));

      legendItems
        .append("text")
        .attr("x", legendItemSize + 8)
        .attr("y", legendItemSize / 2 + 4)
        .attr("text-anchor", "start")
        .style("font-size", "13px")
        .text((d) => d);
    })
    .catch((error) => console.error("Error loading data:", error));
}

// Load default dataset on page load
loadData("video");
