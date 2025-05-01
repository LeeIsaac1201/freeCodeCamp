/* global d3 */

// Set up graph dimensions and constants
const width = 800;
const height = 500;
const padding = 60;
const svg = d3.select('svg');
const datasetUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

// Load the dataset and parse time and year
d3.json(datasetUrl).then((data) => {
  const timeParse = d3.timeParse('%M:%S');
  data.forEach((d) => {
    /* eslint-disable-next-line no-param-reassign */
    d.TimeParsed = timeParse(d.Time);
    /* eslint-disable-next-line no-param-reassign */
    d.YearParsed = new Date(d.Year, 0, 1);
  });

  // Set up scales for x and y axes
  const minYear = d3.min(data, (d) => d.YearParsed);
  const maxYear = d3.max(data, (d) => d.YearParsed);
  const bufferYears = 1;

  const xScale = d3.scaleTime()
    .domain([
      d3.timeYear.offset(minYear, -bufferYears),
      maxYear,
    ])
    .range([padding, width - padding]);

  const yScale = d3.scaleTime()
    .domain([
      d3.max(data, (d) => d.TimeParsed),
      d3.min(data, (d) => d.TimeParsed),
    ])
    .range([padding, height - padding]);

  // Create axes
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y'));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  // Axis labels
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .style('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Year');

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Time (mm:ss)');

  // Tooltip setup
  const tooltip = d3.select('#tooltip');

  // Draw dots
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', (d) => xScale(d.YearParsed))
    .attr('cy', (d) => yScale(d.TimeParsed))
    .attr('r', 6)
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => d.TimeParsed.toISOString())
    .attr('fill', (d) => (d.Doping ? 'orange' : 'green'))
    .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip
        .html(
          `${`${d.Name}: ${d.Nationality}<br/>`
          + `Year: ${d.Year}, Time: ${d.Time}`}${
            d.Doping ? `<br/><br/>${d.Doping}` : ''}`,
        )
        .attr('data-year', d.Year);

      const svgRect = svg.node().getBoundingClientRect();
      const tooltipWidth = 250;
      let left = event.clientX - svgRect.left + 10;
      if (left + tooltipWidth > svgRect.width) {
        left = event.clientX - svgRect.left - tooltipWidth - 10;
      }
      tooltip
        .style('left', `${left}px`)
        .style('top', `${event.clientY - svgRect.top - 30}px`);
    })
    .on('mouseout', () => {
      tooltip.transition().duration(500).style('opacity', 0);
    });

  // Legend position constants
  const legendX = width - padding - 250;
  const legendY = padding + 80;

  // Add legend
  const legend = svg.append('g')
    .attr('id', 'legend')
    .attr('transform',
      `translate(${legendX}, ${legendY})`);

  legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 250)
    .attr('height', 60)
    .attr('fill', 'none')
    .attr('stroke', 'black');

  legend.append('circle')
    .attr('cx', 15)
    .attr('cy', 20)
    .attr('r', 6)
    .attr('fill', 'orange');

  legend.append('text')
    .attr('x', 30)
    .attr('y', 25)
    .text('Riders with doping allegations')
    .style('font-size', '12px');

  legend.append('circle')
    .attr('cx', 15)
    .attr('cy', 45)
    .attr('r', 6)
    .attr('fill', 'green');

  legend.append('text')
    .attr('x', 30)
    .attr('y', 50)
    .text('No doping allegations')
    .style('font-size', '12px');
});
