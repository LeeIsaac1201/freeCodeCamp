/* global d3 */

// Set up Scalable Vector Graphics (SVG) dimensions and margins
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = {
  top: 20, right: 20, bottom: 70, left: 80,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Tooltip selection
const tooltip = d3.select('#tooltip');

// Fetch the dataset
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then((data) => {
    // Data processing
    const dataset = data.data;
    const parseDate = d3.timeParse('%Y-%m-%d');
    dataset.forEach((item) => {
      const newItem = { ...item };
      newItem.date = parseDate(item[0]);
      newItem.gdp = +item[1];
      Object.assign(item, newItem);
    });

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain([d3.min(dataset, (d) => d.date), d3.max(dataset, (d) => d.date)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.gdp)])
      .range([innerHeight, 0]);

    // Create chart container
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    g.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    g.append('g').attr('id', 'y-axis').call(yAxis);

    // Append axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text('Time (Quarters)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text('GDP (Billions of Dollars)');

    // Create bars
    const barWidth = innerWidth / dataset.length;
    g.selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.date))
      .attr('y', (d) => yScale(d.gdp))
      .attr('width', barWidth)
      .attr('height', (d) => innerHeight - yScale(d.gdp))
      .attr('data-date', (d) => d3.timeFormat('%Y-%m-%d')(d.date))
      .attr('data-gdp', (d) => d.gdp)
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 0.9)
          .html(
            `Date: ${
              d3.timeFormat('%Y-%m-%d')(d.date)
            }<br>GDP: ${
              d.gdp
            } Billion`,
          )
          .attr('data-date', d3.timeFormat('%Y-%m-%d')(d.date))
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Append informational text
    svg
      .append('text')
      .attr('x', width - margin.right - 10)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
      .text(
        'For more information, visit http://www.bea.gov/national/pdf/nipaguid.pdf.',
      );
  })
  .catch((error) => {
    throw new Error(`Error loading the dataset: ${error.message}`);
  });
