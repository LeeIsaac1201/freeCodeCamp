# Data Visualization Certification Projects

This repository contains all the required projects to complete the [**Data Visualization Certification** from freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/).

[View my certification here.](https://www.freecodecamp.org/certification/-SirLancelot/data-visualization)

---

## Projects

### 1. Bar Chart
- **Description:** A D3.js–based bar chart that visualises the United States' gross-domestic product (GDP) data over time, with axes generated via D3’s axis helpers and interactive tooltips.  
- **Objective:** To practice D3.js bar‐chart creation by rendering GDP data with properly scaled axes and interactive tooltips.  
- **Features:**
  - Chart title element with `id="title"`.  
  - X-axis `<g>` element with `id="x-axis"`, created via `d3.axisBottom()`.  
  - Y-axis `<g>` element with `id="y-axis"`, created via `d3.axisLeft()`.  
  - Multiple tick labels on both axes, each with `class="tick"`.  
  - One `<rect>` per data point, each with `class="bar"`.  
  - Each `.bar` has `data-date` and `data-gdp` attributes matching its datum.  
  - Bar heights correspond accurately to GDP values.  
  - Bars aligned to their dates on the x-axis and values on the y-axis.  
  - Tooltip with `id="tooltip"` appears on hover, displaying year, quarter, and GDP.  
  - Tooltip carries a `data-date` attribute matching the hovered bar.

### 2. Scatterplot Graph
- **Description:** A D3.js–based scatterplot that visualises professional cycling times against years, with axes, legend, and tooltips.  
- **Objective:** To practice D3.js scatterplot implementation by plotting x/y data points, adding a legend, and enabling interactive tooltips.  
- **Features:**
  - Chart title element with `id="title"`.  
  - X-axis `<g>` element with `id="x-axis"`, created via `d3.axisBottom()`.  
  - Y-axis `<g>` element with `id="y-axis"`, created via `d3.axisLeft()`.  
  - Dots (`<circle>`) for each data point, each with `class="dot"`.  
  - Each `.dot` has `data-xvalue` (year) and `data-yvalue` (time) attributes matching its datum.  
  - X-axis tick labels show full years.  
  - Y-axis tick labels show minutes and seconds in `%M:%S` format.  
  - Dots aligned to their `data-xvalue` on the x-axis and `data-yvalue` on the y-axis.  
  - Legend element with `id="legend"` describing categories (e.g., doping allegations).  
  - Tooltip with `id="tooltip"` appears on hover, displaying cyclist name, year, time, and notes.  
  - Tooltip carries a `data-year` attribute matching the hovered dot’s `data-xvalue`.

### 3. Heat Map
- **Description:** A D3.js–based heat map that visualises monthly global temperature variances over years, with a colour‐coded grid, legend, and tooltips.  
- **Objective:** To practice D3.js heat‐map creation by encoding temperature variance data in a coloured grid with axes and interactivity.  
- **Features:**
  - Chart title element with `id="title"`.  
  - Description element with `id="description"`.  
  - X-axis `<g>` element with `id="x-axis"`.  
  - Y-axis `<g>` element with `id="y-axis"`.  
  - Cells (`<rect>`) for each month-year data point, each with `class="cell"`.  
  - At least four distinct fill colours representing temperature ranges.  
  - Each cell has `data-month`, `data-year`, and `data-temp` attributes matching its datum.  
  - Cells aligned by month on the y-axis and year on the x-axis.  
  - Y-axis tick labels show full month names.  
  - X-axis tick labels span years from 1754 through 2015.  
  - Legend element with `id="legend"`, containing `<rect>`s indicating the colour scale.  
  - Legend `<rect>`s utilise at least four different fill colours.  
  - Tooltip with `id="tooltip"` appears on hover, displaying year, month, and temperature.  
  - Tooltip carries a `data-year` attribute matching the hovered cell’s `data-year`.

### 4. Choropleth Map
- **Description:** A D3.js–based choropleth map that visualises the United States' county‐level education data, with geoJSON shapes, colour encoding, legend, and tooltips.  
- **Objective:** To practice D3.js geographic visualisation by colour‐coding county shapes according to education levels and adding interactivity.  
- **Features:**
  - Map title element with `id="title"`.  
  - Description element with `id="description"`.  
  - County shapes (`<path>`) for each data point, each with `class="county"`.  
  - At least four distinct fill colours representing education rate ranges.  
  - Each `.county` has `data-fips` and `data-education` attributes matching its datum.  
  - One county shape per provided data point.  
  - Legend element with `id="legend"`, containing `<rect>`s indicating the education colour scale.  
  - Legend `<rect>`s utilise at least four different fill colours.  
  - Tooltip with `id="tooltip"` appears on hover, displaying county name, state, and education percentage.  
  - Tooltip carries a `data-education` attribute matching the hovered county’s `data-education`.

### 5. Treemap Diagram
- **Description:** A D3.js–based treemap that visualises hierarchical data (e.g., Kickstarter, movie, or video‐game sales), with size‐encoded tiles, legend, and tooltips.  
- **Objective:** To practice D3.js hierarchical data visualisation by constructing a treemap with proportional tile areas, a legend, and interactive tooltips.  
- **Features:**
  - Chart title element with `id="title"`.  
  - Description element with `id="description"`.  
  - Tiles (`<rect>`) for each data point, each with `class="tile"`.  
  - At least two distinct fill colours used across tiles to represent categories.  
  - Each `.tile` has `data-name`, `data-category`, and `data-value` attributes matching its datum.  
  - Tile areas correspond proportionally to their `data-value`.  
  - Legend element with `id="legend"`.  
  - Legend `<rect>`s with `class="legend-item"`, utilising at least two distinct fill colours.  
  - Tooltip with `id="tooltip"` appears on hover, displaying name, category, and value.  
  - Tooltip carries a `data-value` attribute matching the hovered tile’s `data-value`.

---

## Getting Started

Each project is located in its respective directory within this repository.

---

## Technologies Used

- **Programming Languages:**
  - Hyper Text Markup Language (HTML)  
  - Cascading Style Sheets (CSS)  
  - JavaScript (JS)

- **Libraries:**
  - Data-Driven Documents (D3.js)  

- **Tools:**
  - Scalable vector graphics (SVG)  
  - JavaScript Object Notation (JSON)  

---

## Code Validators

- **HTML:** [https://validator.w3.org/](https://validator.w3.org/)  
- **CSS:** [https://validator.w3.org/](https://validator.w3.org/)  
- **JavaScript:** [https://validatejavascript.com/](https://validatejavascript.com/)

---

## Notes

- These projects make extensive use of D3.js to meet freeCodeCamp’s data visualisation standards.  
- Ensure all element IDs, classes, and data attributes match the requirements exactly for tests to pass.  
