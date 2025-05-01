/* global d3, console */

// Dimensions and margins for the Scalable Vector Graphics (SVG) and heatmap
const svgWidth = 1300
const svgHeight = 600
const margin = { top: 60, right: 40, bottom: 120, left: 100 }
const width = svgWidth - margin.left - margin.right
const height = svgHeight - margin.top - margin.bottom

// Array for month names
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// SVG setup: Create the main SVG container
const svg = d3.select('#heatmap')
  .attr('width', svgWidth)
  .attr('height', svgHeight)

// Groups for the heatmap, axes, and tooltips
const cellsGroup = svg.select('#cells')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = svg.select('#x-axis')
  .attr('transform', `translate(${margin.left}, ${svgHeight - margin.bottom})`)
const yAxisGroup = svg.select('#y-axis')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const tooltip = d3.select('#tooltip')

// Load and process the temperature data
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(data => {
    const baseTemp = data.baseTemperature
    const monthlyData = data.monthlyVariance.map(d => ({
      year: d.year,
      month: d.month - 1,
      temperature: baseTemp + d.variance,
      variance: d.variance
    }))

    const years = monthlyData.map(d => d.year)
    const minYear = d3.min(years)
    const maxYear = d3.max(years)

    // Scales for the axes
    const xScale = d3.scaleBand()
      .domain(d3.range(minYear, maxYear + 1))
      .range([0, width])
      .padding(0.01)

    const yScale = d3.scaleBand()
      .domain(d3.range(0, 12))
      .range([0, height])
      .padding(0.01)

    /* eslint-disable-next-line no-unused-vars */
    const temps = monthlyData.map(d => d.temperature)
    /* eslint-disable-next-line no-unused-vars */
    const minTemp = d3.min(temps)
    /* eslint-disable-next-line no-unused-vars */
    const maxTemp = d3.max(temps)

    // Colourbrewer legend palette for temperature
    const colorbrewer = {
      RdYlBu: {
        11: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf',
          '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'].reverse()
      }
    }

    const legendColors = colorbrewer.RdYlBu[11]

    // Recompute minimum and maximum temperatures from the data's variance
    const varianceArray = data.monthlyVariance.map(val => val.variance)
    const minTempSample = baseTemp + Math.min(...varianceArray)
    const maxTempSample = baseTemp + Math.max(...varianceArray)

    // Updated colour scale for temperature
    const colorScale = d3.scaleThreshold()
      .domain(
        (function (min, max, count) {
          const array = []
          const step = (max - min) / count
          for (let i = 1; i < count; i++) {
            array.push(min + i * step)
          }
          return array
        })(minTempSample, maxTempSample, legendColors.length)
      )
      .range(legendColors)

    // Create and render x and y axes
    const xAxis = d3.axisBottom(xScale)
      .tickValues(xScale.domain().filter(year => year % 10 === 0))
      .tickFormat(d3.format('d'))
    xAxisGroup.call(xAxis)

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(monthIndex => months[monthIndex])
    yAxisGroup.call(yAxis)

    // Append labels for the axes
    svg.append('text')
      .attr('class', 'x axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', margin.left + width / 2)
      .attr('y', svgHeight - 60)
      .text('Years')

    svg.append('text')
      .attr('class', 'y axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${margin.left - 60}, ${margin.top + height / 2}) rotate(-90)`)
      .text('Months')

    // Create and render the heatmap cells
    cellsGroup.selectAll('.cell')
      .data(monthlyData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('data-year', d => d.year)
      .attr('data-month', d => d.month)
      .attr('data-temp', d => d.temperature)
      .attr('x', d => xScale(d.year))
      .attr('y', d => yScale(d.month))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', d => colorScale(d.temperature))
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 0.9)
          .html(
            `Year: ${d.year}<br>
             Month: ${months[d.month]}<br>
             Temp: ${d.temperature.toFixed(2)}℃<br>
             Variance: ${d.variance.toFixed(2)}℃`
          )
          .attr('data-year', d.year)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    // Create and render the colour legend
    const legendWidth = 400
    const legendHeight = 30

    const legendThreshold = d3.scaleThreshold()
      .domain(
        (function (min, max, count) {
          const array = []
          const step = (max - min) / count
          for (let i = 1; i < count; i++) {
            array.push(min + i * step)
          }
          return array
        })(minTempSample, maxTempSample, legendColors.length)
      )
      .range(legendColors)

    const legendX = d3.scaleLinear()
      .domain([minTempSample, maxTempSample])
      .range([0, legendWidth])

    const legendXAxis = d3.axisBottom(legendX)
      .tickSize(10, 0)
      .tickValues(legendThreshold.domain())
      .tickFormat(d3.format('.2f'))

    // Positioning the legend slightly lower (by 68 pixels)
    const legend = svg.append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${margin.left + (width - legendWidth) / 2}, ${margin.top + height + 68})`)

    legend.append('g')
      .selectAll('rect')
      .data(legendThreshold.range().map(color => {
        const d = legendThreshold.invertExtent(color)
        if (d[0] == null) d[0] = legendX.domain()[0]
        if (d[1] == null) d[1] = legendX.domain()[1]
        return d
      }))
      .enter()
      .append('rect')
      .style('fill', d => legendThreshold(d[0]))
      .attr('x', d => legendX(d[0]))
      .attr('y', 0)
      .attr('width', d => legendX(d[1]) - legendX(d[0]))
      .attr('height', legendHeight)

    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendXAxis)
  })
  .catch(error => {
    console.error('Data load error:', error)
  })
