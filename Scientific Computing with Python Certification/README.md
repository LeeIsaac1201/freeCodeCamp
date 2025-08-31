# Scientific Computing with Python Certification Projects

This repository contains all the required projects to complete the [**Scientific Computing with Python Certification** from freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python).

[View my certification here.](https://www.freecodecamp.org/certification/-sirlancelot/scientific-computing-with-python-v7)

---

## Projects

### 1. Arithmetic Formatter

- **Description:**  Implement `arithmetic_arranger(problems, display_answers=False)` — a function that takes a list of simple arithmetic problems (addition and subtraction) and returns those problems arranged vertically and side-by-side as a single multi-line string. Optionally show computed answers when `display_answers=True`.
- **Objective:**  Validate up to five arithmetic problems, enforce the freeCodeCamp formatting rules and error messages, and produce the exact arranged output (right-aligned operands, operator on the second line, dash lines, four spaces between problems).
- **Features:**  
  - Splits each problem into operands and operators, trimming whitespace.  
  - Validates input and returns exact error strings:  
    - `Error: Too many problems. (More than 5)`
    - `Error: Operator must be '+' or '-'.`
    - `Error: Numbers must only contain digits.`
    - `Error: Numbers cannot be more than four digits.`
  - Calculates block width `max(len(top), len(bottom)) + 2` and right-aligns numbers/results.
  - Produces four-space-separated problems arranged across up to four lines (top operands, operator + bottom operands, dash lines, optional answers).
  - Handles addition and subtraction and formats negative results correctly when answers are displayed.

### 2. Time Calculator

- **Description:**  Implement the `add_time(start, duration, starting_day=None)` function, which takes a start time in 12-hour format (with AM/PM), a duration (hours:minutes), and an optional starting day of the week (case-insensitive). The function returns the new time after adding the duration, formatted per freeCodeCamp requirements — including day of week (if given) and a note when the result is the next day or multiple days later.
- **Objective:**  Correctly compute and format the ending time after adding the duration to the start time. Handle minute and hour carry-over, AM/PM transitions, day counting, and (optionally) the resulting weekday. Follow the exact wording/spacing for phrases such as `(next day)` and `(<n> days later)`.
- **Features:**  
  - Parses the 12-hour `start` time (e.g., `"11:30 AM"` or `"3:00 PM"`) and the `duration` (e.g., `"2:32"`, `"205:12"`).
  - Adds minutes and hours correctly, handling carry from minutes to hours.  
  - Toggles AM/PM properly and converts the 12-hour rolls (note: 12 AM == 00:xx in 24-hour logic).  
  - Counts how many days pass and appends:  
    - `(next day)` when the result is the next day, or
    - `(<n> days later)` when more than one day later.
  - If `starting_day` is provided (case-insensitive), computes and includes the resulting weekday in the format `, Weekday` (e.g., `2:02 PM, Monday`).
  - Returns a single string — do **not** print.
  - **Do not import any Python libraries.** Use basic string and integer arithmetic.
  - Assumptions: start times are valid; duration minutes are whole numbers < 60; duration hours can be any non-negative integer.

### 3. Budget App

- **Description:**  Implement a `Category` class to model budget categories (e.g., Food, Clothing, Entertainment) with a transaction ledger, plus a standalone function `create_spend_chart(categories)` that returns a text bar chart of spending by category.
- **Objective:**   Complete the `Category` class with methods to deposit, withdraw, transfer funds, check balance, and print a formatted ledger. Also implement `create_spend_chart(categories)` which computes category spending percentages (based only on withdrawals) and returns the exact bar-chart string.
- **Features:**  
  - `Category(name)` constructor that sets `self.ledger` (a list).  
  - `deposit(amount, description='')` — appends `{'amount': amount, 'description': description}` to the ledger.
  - `withdraw(amount, description='')` — if funds are sufficient, appends `{'amount': -amount, 'description': description}` and returns `True`; otherwise returns `False` and does nothing.
  - `get_balance()` — returns the current balance (sum of ledger amounts).  
  - `transfer(amount, other_category)` — moves funds between categories by adding a withdrawal in the source with description `Transfer to [Destination]` and a deposit in the destination with description `Transfer from [Source]`; returns `True` if successful, `False` if insufficient funds.
  - `check_funds(amount)` — returns `True` if the balance is >= `amount`, else `False`; used by `withdraw` and `transfer`.
  - `__str__` formatting when printing a Category:
    
    - A title line of 30 characters with the category name centred and surrounded by `*` characters.
    - Each ledger entry on its own line: first 23 characters of the description (left-aligned) and the amount right-aligned to 7 characters with two decimal places.
    - Final line `Total: <balance>` showing the category total.
  - `create_spend_chart(categories)`:
    - Computes total withdrawals for each category (ignore deposits).
    - Calculates each category's percentage of total spending, rounded down to the nearest 10.
    - Builds a vertical bar chart titled `Percentage spent by category` with labels from `100` down to `0` in steps of 10.
    - Uses the character `o` to mark bars; there are two spaces between the bars and the chart's left labels.
    - Draws a horizontal separator line that extends two spaces past the final bar.
    - Writes category names vertically below the bars, aligned exactly as in the example.
    - Works for up to four categories and matches the spacing/punctuation of the reference output exactly.

### 4. Polygon Area Calculator

- **Description:**  Implement object-oriented classes `Rectangle` and `Square` (where `Square` is a subclass of `Rectangle`) to compute geometric properties and produce simple ASCII art representations.
- **Objective:**  Build a `Rectangle` class with width and height plus methods for area, perimeter, diagonal, ASCII picture rendering, containment counting, and string representation. Create a `Square` subclass that inherits from `Rectangle`, stores side length in both width and height, and provides a `set_side` method while keeping `set_width` and `set_height` synchronised.
- **Features:**  
  - `Rectangle(width, height)` initialiser storing `width` and `height`.  
  - `set_width(width)` and `set_height(height)` — update dimensions.  
  - `get_area()` — returns `width * height`.  
  - `get_perimeter()` — returns `2 * width + 2 * height`.  
  - `get_diagonal()` — returns `(width**2 + height**2) ** 0.5`.  
  - `get_picture()` — returns a string drawing the shape using `'*'` characters with `height` lines of `width` stars and a trailing `\n` on each line; returns `'Too big for picture.'` if `width > 50` or `height > 50`.  
  - `get_amount_inside(other)` — returns how many times the `other` shape (Rectangle or Square) fits inside this rectangle without rotation (integer division of widths and heights multiplied).  
  - `__repr__` / `__str__` for `Rectangle` should be:  
    ```
    Rectangle(width=5, height=10)
    ```
  - `Square(side)` subclass:
    - `__init__` sets both `width` and `height` to `side`.  
    - `set_side(side)` updates both `width` and `height`.  
    - `set_width` and `set_height` overridden to update both dimensions.  
    - `__repr__` / `__str__` for `Square` should be:  
    ```
    Square(side=9)
    ```  

### 5. Probability Calculator

- **Description:**  A simulation-based probability estimator using repeated random experiments to determine the likelihood of drawing specified balls from a hat.
- **Objective:**  Build a `Hat` class that models an urn of coloured balls and a global `experiment` function that runs Monte Carlo trials to approximate probabilities for drawing certain combinations of balls.
- **Features:**  
  - `Hat(**kwargs)` constructor:  
    - Accepts keyword arguments where the key is the ball colour and the value is the count.  
    - Builds a `contents` list with one string entry per ball.  
    - Example: `Hat(red=2, blue=1)` → `['red', 'red', 'blue']`.  
  - `draw(num_balls)` method:  
    - Removes `num_balls` random elements from `contents` without replacement.  
    - Returns a list of drawn ball colours.  
    - If `num_balls > len(contents)`, returns all balls.  
  - `experiment(hat, expected_balls, num_balls_drawn, num_experiments)` function:  
    - Copies the hat for each experiment.  
    - Performs `num_experiments` independent trials.  
    - In each trial: draws `num_balls_drawn` balls, counts the result, and checks whether it meets or exceeds the `expected_balls` requirement.  
    - Returns the probability estimate = `successful_trials / num_experiments`.

---

## Technologies Used

- **Programming Language:**
  - Python 3

- **Core Concepts & Tools:**
  - Object-Oriented Programming (OOP)
  - String and list manipulation
  - Control flow and loops
  - Functions with optional arguments
  - Basic probability and simulation (Monte Carlo experiments)

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/LeeIsaac1201/LeeIsaac1201.git
   cd freeCodeCamp/Scientific-Computing-with-Python

2. Navigate to the project folder you want to run (e.g., time-calculator):

   ```bash
   cd time-calculator
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

## Code Style Notice

All Python code in this repository does **not** strictly follow PEP 8 style guidelines.  
These projects prioritise clarity of logic and alignment with the freeCodeCamp exercises over stylistic conformity.

If you prefer PEP 8 compliant code, you can format and lint the files locally (for example with `black` and `flake8`) or submit a pull request with style improvements.
