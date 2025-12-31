# College Algebra with Python Projects

This repository contains projects completed for the [**College Algebra with Python** certification from freeCodeCamp](https://www.freecodecamp.org/learn/college-algebra-with-python/).

View my certification here: [https://www.freecodecamp.org/certification/leeminghuiisaac/college-algebra-with-python-v8](https://www.freecodecamp.org/certification/leeminghuiisaac/college-algebra-with-python-v8)

---

## Projects
### 1. Multi-Function Calculator
- **Description:** A multi-purpose calculator that performs algebraic conversions and basic symbolic manipulations commonly used in college algebra.
- **Objectives:** Provide tools to:
    - Solve proportions (e.g., `a/b = c/x` → `x`).
    - Solve for `x` in single-variable linear equations.
    - Factor and simplify square roots.
    - Convert between decimals, fractions, and percents.
- **Features:**  
    - **Proportion solver and linear-equation solver.**
    - **Exact-fraction arithmetic and simplification (uses `sympy`/`fractions`).**
    - **Conversion utilities:**
        - decimal → fraction/percent
        - fraction → decimal/percent
        - percent → decimal/fraction
    - **Example cells and small unit tests for typical and edge cases (negative numbers, repeating decimals).**
- **Development hints:**
    - Use `sympy` for robust symbolic solving and `sympy.Rational` (or Python's `fractions.Fraction`) for exact ratios.
    - Normalise inputs (strip `%`, detect `/`, handle negatives) before computation.
- **Example usage:**
    ```
    solve_proportion(3, 4, 9)     # -> 12
    decimal_to_fraction(0.75)     # -> Fraction(3, 4)
    percent_to_decimal("12.5%")   # -> 0.125
    ```

### 2. Graphing Calculator
- **Description:** A notebook-based graphing calculator to plot functions, generate tables, shade inequalities, and visualise solutions to systems.
- **Objectives:** Implement functionality to:
  - Graph one or more functions.
  - Create tables of `(x, y)` values for a given range.
  - Shade regions above or below a curve (inequalities).
  - Solve and plot systems of linear equations.
  - Zoom in/out and solve quadratics.
- **Features:**  
    - Safe expression parsing to convert user strings into numerical functions (uses `sympy.lambdify` or similar).
    - Plotting with `matplotlib` (multiple functions, legends, axis controls).
    - Table generator for x/y pairs and shading using `fill_between`.
    - Numeric/algebraic solver for systems (intersection points highlighted).
    - Quadratic solver with roots and vertex displayed.
- **Development hints/example usage:**
    - Use `numpy` for vectorised evaluations and `sympy.lambdify` to avoid unsafe `eval`.
    - Provide sliders or range variables for zooming (Google Colaboratory-friendly widgets are optional).
- **Example notebook output:**
    ```
    Roots of x^2 - 5x + 6: [2.0, 3.0]
    Intersection of y=2x+1 and y=-x+4: (x=1.0, y=3.0)
    ```

### 3. Three Math Games
- **Description:** Three interactive mini-games to practice coordinate reading, algebraic manipulation, and projectile motion intuition.
- **Objectives:**
  1. **Scatter Plot Game:**
    - Randomly generate points on a grid. Player inputs (x, y) to match the hidden point.
    - Optional difficulty: larger grids, smaller tolerances.
  2. **Algebra Practice Game:**
    - Auto-generate one-step and two-step algebra problems (including negatives).
    - Player inputs answers; score tracked across rounds.
  3. **Projectile Game:**
    - Random wall (height and location) appears. Player adjusts a parabola via sliders (or inputs `a`, `b`, `c`) to clear the wall.
    - Hard mode: no sliders, numeric input only.
- **Features:**  
    - Interactive widgets (works in Colab with `ipywidgets`) or text prompts for local Jupyter.
    - Score tracking and configurable difficulty levels.
    - Visualisation of plots and trajectories using `matplotlib`.
- **Development hints:**
    - For the Scatter Plot Game, accept answers within a small Euclidean-distance tolerance.
    - For projectile checks, evaluate the parabola at wall `x` positions and ensure `y` exceeds wall height.
- **Example interaction:**
    ```
    Algebra question: Solve 2x - 3 = 9
    Player answer: 6  -> Correct!
    ```

### 4. Financial Calculator
- **Description:** Financial calculators covering annuities, mortgages, retirement projections, doubling time, logarithmic solving, and scientific notation conversions.
- **Objectives:** Implement functions to:
  - Compute annuity future/present values (monthly & continuous compounding).
  - Estimate monthly mortgage payments.
  - Simulate retirement balances with fixed monthly contributions.
  - Compute doubling time (exact via logs and rule-of-72 estimate).
  - Solve simple logarithmic equations and convert numbers to/from scientific notation.
- **Features:**  
    - `annuity_future_value` and `annuity_present_value` (monthly & continuous).
    - `mortgage_payment(principal, annual_rate, years)` returning monthly payment.
    - `retirement_projection(contribution, rate, years)` returning final balance.
    - `doubling_time(rate)` returning exact years and rule-of-72 estimate.
    - Helpers for scientific notation formatting.
- **Development hints:**
    - Use `numpy` math (`np.log`, `np.exp`) for numerical stability in continuous compounding formulas.
    - Accept rates either as decimals (0.06) or percent strings (`"6%"`) and normalise early.
- **Example output:**
    ```
    Monthly mortgage payment for $200,000 @ 4% over 30 years: $954.83
    Retirement balance for $500 monthly at 6% for 30 years: $510,000 (approx)
    ```

### 5. Data Graph Explorer
- **Description:** A data ingestion and plotting notebook that lets users load comma-separated values (CSVs) files (multiple ways), inspect them, and plot chosen column combinations.
- **Objectives:** Provide a workflow to:
  - Load a CSV by local upload, user uniform resource location (URL) input, or hard-coded URL.
  - Save the CSV to a pandas DataFrame, print headings and the first two rows.
  - Store column names as a list and convert selected column(s) to NumPy arrays.
  - Plot scatter or line graphs for different column combinations.
- **Features:**  
  - Three CSV loading methods suitable for Colab.
  - `df.head(2)` preview and `list(df.columns)` capturing column names.
  - Conversion helpers to `numpy` using `.to_numpy()`.
  - Plotting utilities for scatter and line charts and simple guidance for interpretation.
- **Development hints:**
  - Use `pd.read_csv` for URL/local reads and `pandas` with `numpy` for conversions; use `dropna()` for selected columns before plotting.
- **Example usage:**
    ```
    df.head(2)
    # Column list: ['Year', 'Population', 'GDP']
    x = df['Year'].to_numpy()
    y = df['Population'].to_numpy()
    plot_scatter(x, y)
    ```
    
---

## Technologies Used
- **Programming Languages**
  - Python 3.14.2

- **Libraries & Frameworks**
  - `numpy`, `pandas` and `matplotlib`
  - `sympy` (symbolic algebra/exact rational arithmetic)
  - `ipywidgets` (interactive sliders and controls for Colab)
  - `scipy` (numerical utilities)
 
- **Recommended Environment**
  - Google Colaboratory (recommended for easy sharing) or local Jupyter Notebook.
 
---

## How to Run Locally
1. **Clone the repository**
    ```bash
    git clone https://github.com/LeeIsaac1201/LeeIsaac1201.git
    cd freeCodeCamp/College-Algebra-with-Python
    ```

2. **Open in Google Colaboratory**
  - Upload the notebook to your Google Drive and open it with Google Colaboratory, or
  - In Google Colaboratory: File → Upload notebook → select the .ipynb file.

3. **Install dependencies (local)**
    ```
    pip install numpy pandas matplotlib sympy ipywidgets
    ```
  - Or, if provided, use a requirements file:
    ```
    pip install -r requirements.txt
    ```

4. **Run the notebooks**
  - Start Jupyter locally:
    ```
    jupyter notebook
    ```
  - Open any `.ipynb` file and run cells top-to-bottom.
  - In Google Colaboratory, run the cells directly; enable widgets if the notebook uses them.
---

## Notes
1. Google Colaboratory links on my freeCodeCamp profile will **not work** because they were removed to free up space on the free plan, so those links are now inactive.
2. **Datasets:** Notebooks that require external CSVs include instructions inside the first cells for uploading or fetching them. Large datasets are not included in this repo.
3. **Widgets:** `ipywidgets` works in Google Colaboratory, but some widget features/appearance may differ from local Jupyter. The notebooks include fallback input prompts where appropriate.
4. **Performance:** Graphing and plotting are CPU-bound; interactive widgets and rendering may be slower on CPU-only machines.
5. **Customisation:** The notebooks are written to be readable and instructional. You can extract helper functions into .py modules if you prefer a script-based workflow.
