# Data Analysis with Python Certification Projects

This repository contains all the required projects to complete the [**Data Analysis with Python Certification** from freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python).

[View my certification here.](https://www.freecodecamp.org/certification/leeminghuiisaac/data-analysis-with-python-v7)

---

## Projects

### 1. Mean-Variance-Standard Deviation Calculator

- **Description:**  Created a `calculate()` function in `mean_var_std.py` that uses NumPy to compute the mean, variance, standard deviation, maximum, minimum, and sum for the rows, columns, and flattened elements of a 3×3 matrix formed from a list of nine numbers.
- **Objective:**  Implemented a `calculate()` function that accepts a list of nine numbers, converts it into a 3×3 NumPy array, and returns a dictionary containing the mean, variance, standard deviation, max, min, and sum computed along the rows, columns, and for the flattened matrix; the function must raise `ValueError("List must contain nine numbers.")` for inputs shorter than nine elements and must return plain Python lists and scalars (not NumPy arrays) in the specified dictionary format.
- **Features:**  
  - `calculate(input_list)` implemented in `mean_var_std.py`.
  - Input validation: if the input list length ≠ 9 → raise `ValueError("List must contain nine numbers.")`.
  - Converts the input list into a NumPy array and reshapes to `(3, 3)`.
  - Computes these statistics for:
    - columns (axis 0),
    - rows (axis 1), and
    - the flattened array (all elements).
  - Returns a dictionary with this exact format:
    ```
    {
      'mean': [axis0 (columns), axis1 (rows), flattened],
      'variance': [axis0 (columns), axis1 (rows), flattened],
      'standard deviation': [axis0 (columns), axis1 (rows), flattened],
      'max': [axis0 (columns), axis1 (rows), flattened],
      'min': [axis0 (columns), axis1 (rows), flattened],
      'sum': [axis0 (columns), axis1 (rows), flattened]
    }
    ```
    (Values must be Python lists/scalars — use `.tolist()` where appropriate.)
  - Includes the exact error string and behaviour expected by the unit tests.
  - Development notes: write code in `mean_var_std.py`; use `main.py` for quick checks (`python3 main.py` in Gitpod). Unit tests are available in `test_module.py`.
- Example: 
  `calculate([0,1,2,3,4,5,6,7,8])` should return:
  ```
  {
    "mean": [[3.0, 4.0, 5.0], [1.0, 4.0, 7.0], 4.0],
    "variance": [[6.0, 6.0, 6.0], [0.6666666666666666, 0.6666666666666666, 0.6666666666666666], 6.666666666666667],
    "standard deviation": [[2.449489742783178, 2.449489742783178, 2.449489742783178], [0.816496580927726, 0.816496580927726, 0.816496580927726], 2.581988897471611],
    "max": [[6, 7, 8], [2, 5, 8], 8],
    "min": [[0, 1, 2], [0, 3, 6], 0],
    "sum": [[9, 12, 15], [3, 12, 21], 36]
  }
  ```

### 2. Demographic Data Analyzer

- **Description:**  Used Pandas to analyse a census-derived demographic dataset and compute a set of summary statistics and percentages about race, education, work hours, income, and occupations.
- **Objective:**  Implement the analysis in `demographic_data_analyzer.py` so that it reads the provided dataset and computes several demographic summaries (counts, averages, percentages, and the most-common occupations) required by the unit tests. All computed decimal values should be rounded to one decimal place. The script should fill in the starter variables (initially `None`) with the correct Pandas expressions or Python values and return the required results in the format expected by the test harness.
- **Features:**  
  - Uses the starter file `demographic_data_analyzer.py`; fill in the variables and/or functions that are initially set to `None`.
  - Loads the provided census dataset using pandas (the dataset included with the starter code).  
  - Computes these required statistics (each stored in the corresponding variable in the starter file and rounded to one decimal where applicable):
    - **Race counts**: a `pandas.Series` giving the number of entries per race (index = race names).
    - **Average age of men**: a single numeric value (float, rounded to 0.1).
    - **Percent with Bachelor's degree**: numeric percent (float, 0.1).
    - **Percent with advanced education (Bachelors, Masters, Doctorate) that earn >50K**: numeric percent (float, 0.1).
    - **Percent without advanced education that earn >50K**: numeric percent (float, 0.1).
    - **Minimum hours-per-week**: integer or numeric scalar representing the smallest `hours-per-week` value in the dataset.
    - **Percent of people working the minimum hours who earn >50K**: numeric percent (float, 0.1).
    - **Country with highest percentage of >50K earners**: country name (string) and that country’s percentage (float, 0.1).
    - **Most popular occupation for >50K earners in India**: occupation name (string).
  - Uses idiomatic pandas operations (e.g., boolean masks, `value_counts()`, `groupby()`, `mean()`, `sum()`, `value_counts()` / `idxmax()`) to compute each answer efficiently and clearly.
  - Ensures results are returned/stored in the exact variables and formats expected by the unit tests (use Python scalars and pandas objects as required by the tests).
  - All decimal results are rounded to one decimal place before being returned (use `round(..., 1)` or `.round(1)`).
  - Includes a short `main.py` entrypoint (provided in starter code) for manual development checks; unit tests are in `test_module.py` and are imported into `main.py` for convenience.
  - Percentages are returned as numeric percent values (0–100) and rounded to one decimal place (e.g., 12.3).
  - Race counts must be a pandas. Series indexed by race names.
  - String results (e.g., most popular occupation in India) must be returned as plain Python strings.

### 3. Medical Data Visualizer

- **Description:**  Visualise and compute summary relationships from a medical examination dataset (`medical_examination.csv`) using **pandas**, **matplotlib**, and **seaborn** to produce a categorical count plot and a correlation heatmap that explore links between cardiovascular disease, biomarkers, body measurements, and lifestyle factors.
- **Objective:** Implement the analysis in `medical_data_visualizer.py` to load the provided `medical_examination.csv`, add and normalise derived fields, and produce two visual outputs: a categorical plot that compares counts of selected binary/ordinal features (cholesterol, gluc, smoke, alco, active, overweight) for patients with and without cardiovascular disease, and a heatmap showing the correlation matrix for cleaned measurement data. The script must follow the starter-file function interfaces (`draw_cat_plot()` and `draw_heat_map()`), perform the specified cleaning and transformations, and return the Matplotlib `fig` objects expected by the unit tests.
- **Features:**  
  - Loads `medical_examination.csv` into `df`.
  - Adds an `overweight` column computed from BMI = weight(kg) / (height(m))²; set `1` if BMI > 25, else `0`.
  - Normalises `cholesterol` and `gluc` so that `0 = good` (original value `1`) and `1 = bad` (original > 1).
  - Implements `draw_cat_plot()`:
    - Creates `df_cat` via `pd.melt()` using the columns `['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight']` plus the `cardio` column.
    - Groups/reformats to get counts per `cardio`, `variable`, and `value` for plotting.
    - Draws a categorical plot with `sns.catplot()` that shows counts of `value` (0/1) for each variable separated by `cardio`.
    - Returns the Matplotlib `fig` object.
  - Implements `draw_heat_map()`:
    - Cleans the data into `df_heat` by removing rows where `ap_lo > ap_hi` and by excluding height and weight outliers outside the 2.5–97.5 percentile range.
    - Computes the correlation matrix `corr` from `df_heat`.
    - Builds an upper-triangle mask `mask` for the heatmap.
    - Plots the correlation matrix with `sns.heatmap()` on a properly sized Matplotlib figure and returns the `fig` object.
  - Uses idiomatic pandas and seaborn calls so the functions match the starter file signatures and the unit tests’ expectations.

### 4. Page View Time Series Visualizer

- **Description:**  Visualise daily page-view time series (2016-05-09 → 2019-12-03) for the freeCodeCamp forum using **pandas**, **Matplotlib**, and **Seaborn**, producing a line plot, a monthly/yearly bar chart, and box plots that highlight trends and seasonality.
- **Objective:**  Implement the analyses and plotting functions in `time_series_visualizer.py` so the script loads `fcc-forum-pageviews.csv` with the date column as the index, removes extreme outliers (top and bottom 2.5% of page views), and returns three Matplotlib `fig` objects: a daily line chart of page views, a grouped bar chart of average monthly page views per year, and a pair of box plots (year-wise and month-wise) that reveal trends and seasonality. Each plotting function should use a copy of the cleaned DataFrame and follow the specified axis labels and titles required by the unit tests.
- **Features:**  
  - Loads `fcc-forum-pageviews.csv` into a DataFrame and sets the date column as the index (parsed as datetime).
  - Cleans the data by removing values below the 2.5th percentile and above the 97.5th percentile of page views.
  - `draw_line_plot()`:
    - Uses a copy of the cleaned data to draw a line chart titled "**Daily freeCodeCamp Forum Page Views 5/2016-12/2019**".
    - X-axis label: **Date**; Y-axis label: **Page Views**.
    - Returns the Matplotlib `fig` object.
  - `draw_bar_plot()`:
    - Aggregates the cleaned data to compute average daily page views for each month grouped by year.
    - Draws a grouped bar chart with Years on the x-axis and Average Page Views on the y-axis.
    - Includes a legend of months with title **Months**.
    - Returns the Matplotlib `fig` object.
  - `draw_box_plot()`:
    - Prepares a copy of the cleaned data for box plotting (extracts year and month abbreviations).
    - Produces two side-by-side Seaborn box plots:
      - **Year-wise Box Plot (Trend)**: Shows distribution per year.
      - **Month-wise Box Plot (Seasonality)**: Shows distribution per month with months ordered Jan → Dec.
    - Labels axes and titles exactly as required and returns the Matplotlib `fig` object.
  - Uses idiomatic pandas for grouping/aggregation (`resample`, `groupby`, `pivot_table` or similar) and Seaborn/Matplotlib for plotting.
  - The plotting functions save and return the figure objects so unit tests can inspect them; development/testing via `main.py` and `test_module.py` (provided in the starter).

### 5. Sea Level Predictor

- **Description:**  Analyse historical global average sea level data and predict future sea level change through the year 2050 using **pandas**, **matplotlib**, and `scipy.stats.linregress`.
- **Objective:**  Load `epa-sea-level.csv` and create a scatter plot of `Year` versus `CSIRO Adjusted Sea Level`. Use linear regression to compute and plot two lines of best fit: one using the full dataset and a second using only data from the year 2000 onward. Extend both trend lines to the year **2050** to project sea level rise. The final plot must use the x label **Year**, the y label **Sea Level (inches)**, and the title **Rise in Sea Level**.
- **Features:**  
  - Loads the dataset `epa-sea-level.csv` with pandas.
  - Produces a scatter plot (x = `Year`, y = `CSIRO Adjusted Sea Level`).
  - Uses `scipy.stats.linregress` to compute slope and intercept for lines of best fit.
  - Draws two lines of best fit:
    - One fitted to the entire dataset and extended to year **2050**.
    - One fitted to data from **2000** to the most recent year and extended to **2050**.
  - Labels and title required by tests:
    - X axis: **Year**
    - Y axis: **Sea Level (inches)**
    - Title: **Rise in Sea Level**
  - Saves and returns the plotted figure (boilerplate in starter code handles saving/returning).

---

## Technologies Used

- **Programming Language:**
  - Python 3

- **Core Data & Numeric Libraries:**
  - `pandas` — Data loading, cleaning, reshaping, grouping.
  - `numpy` — Numeric arrays, vectorised operations.
  - `scipy` — `scipy.stats.linregress` for linear regression.

- **Visualisation**
  - `matplotlib` — Base plotting Application Programming Interface (API) (line, scatter, bar plots, and figure handling).
  - `seaborn` — Higher-level statistical plotting (categorical plots, heatmaps, and box plots).
---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/LeeIsaac1201/LeeIsaac1201.git
   cd freeCodeCamp/Data-Analysis-with-Python
   ```
2. Navigate to the project folder you want to run (e.g., mean-variance-standard-deviation-calculator):
   ```bash
   cd mean-variance-standard-deviation-calculator
   ```
3. Run the Python script:
   ```bash
   python3 main.py
   ```
4. (Optional) Run unit tests for the project:

   ```bash
   python3 test_module.py
   ```

---

## Notes
1. Gitpod links on freeCodeCamp will not work because the Gitpod projects were removed to free up space on the free plan, so those links are now inactive.
2. All Python code in this repository does **not** strictly follow PEP 8 style guidelines. These projects prioritise clarity of logic and alignment with the freeCodeCamp exercises over stylistic conformity.
