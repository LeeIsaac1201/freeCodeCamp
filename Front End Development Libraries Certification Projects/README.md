# Front End Development Libraries Certification Projects

This repository contains all the required projects to complete the **Front End Development Libraries Certification** from freeCodeCamp.

[View my certification here.](https://www.freecodecamp.org/certification/-SirLancelot/front-end-development-libraries)

--------------------------------------------------------------------------------------------------------------------------

## Projects

### 1. Random Quote Machine

- **Description:** A web application that displays random quotes and allows users to share them on X (previously Twitter).
- **Objective:** Build an application functionally similar to the example provided by freeCodeCamp: [Random Quote Machine](https://random-quote-machine.freecodecamp.rocks/).
- **Features:**
  - Displays a random quote and its author on the initial load.
  - Includes a "New Quote" button to fetch and display a new random quote.
  - Provides a "Tweet Quote" button to share the current quote on Twitter.
  - Ensures the quote machine is horizontally centred on the page.

### 2. Markdown Previewer

- **Description:** A web application that allows users to write GitHub-flavored Markdown in a text editor and preview the rendered HTML in real-time.
- **Objective:** Build an application functionally similar to the example provided by freeCodeCamp: [Markdown Previewer](https://markdown-previewer.freecodecamp.rocks/).
- **Features:**
  - Includes a `textarea` element with an id of `editor` for entering Markdown text.
  - Displays the rendered HTML in an element with an id of `preview`.
  - Updates the `#preview` element in real-time as the user types in the `#editor` element.
  - Supports GitHub-flavored Markdown using the Marked library.
  - Loads with default Markdown text in the `#editor` that includes examples of:
    - A heading (H1)
    - A subheading (H2)
    - A link
    - Inline code
    - A code block
    - A list item
    - A blockquote
    - An image
    - Bolded text
  - Renders the default Markdown as HTML in the `#preview` element on the initial load.

### 3. Drum Machine

- **Description:** A web application that simulates a drum machine, allowing users to play audio clips by clicking buttons or pressing corresponding keys.
- **Objective:** Build an application functionally similar to the example provided by freeCodeCamp: [Drum Machine](https://drum-machine.freecodecamp.rocks/).
- **Features:**
  - Includes an outer container with an id of `drum-machine` that contains all other elements.
  - Displays a `#display` element to show the name of the audio clip being played.
  - Contains 9 clickable drum pad elements with:
    - A class name of `drum-pad`.
    - A unique id describing the audio clip the drum pad triggers.
    - Inner text corresponding to one of the following keys: Q, W, E, A, S, D, Z, X, C.
  - Each drum pad contains an HTML5 `<audio>` element with:
    - A `src` attribute pointing to an audio clip.
    - A class name of `clip`.
    - An id matching the inner text of its parent drum pad.
  - Plays the audio clip when a drum pad is clicked or its corresponding key is pressed.
  - Displays the name of the audio clip in the `#display` element when a drum pad is triggered.

### 4. JavaScript Calculator

- **Description:** A web application that functions as a basic calculator for performing arithmetic operations.
- **Objective:** Build an application functionally similar to the example provided by freeCodeCamp: [JavaScript Calculator](https://javascript-calculator.freecodecamp.rocks/).
- **Features:**
  - Contains a clickable element with an id of `equals` for calculating results.
  - Includes 10 clickable number elements with IDs ranging from `zero` to `nine`.
  - Provides 4 clickable operator elements with IDs: `add`, `subtract`, `multiply`, and `divide`.
  - Contains a clickable element with an id of `decimal` for decimal point input.
  - Includes a clear button with an id of `clear` to reset the calculator.
  - Displays input and results in an element with an id of `display`.
  - Supports chained operations and ensures proper order of operations.
  - Handles edge cases such as multiple zeros, consecutive operators, and decimal precision.

### 5. 25 + 5 Clock

- **Description:** A web application that functions as a Pomodoro-style timer with customisable session and break lengths.
- **Objective:** Build an application functionally similar to the example provided by freeCodeCamp: [25 + 5 Clock](https://25--5-clock.freecodecamp.rocks/).
- **Features:**
  - Displays session and break lengths with corresponding labels (`#session-label` and `#break-label`).
  - Includes increment and decrement buttons for session and break lengths.
  - Displays the timer with an id of `time-left` in `mm:ss` format.
  - Includes a `start_stop` button to start or pause the timer.
  - Includes a `reset` button to reset the timer and all settings to default values.
  - Switches between session and break timers automatically when the countdown reaches `00:00`.
  - Plays a sound when the timer reaches `00:00` and switches to the next phase.
  - Ensures session and break lengths are within the range of one to sixty minutes.

--------------------------------------------------------------------------------------------------------------------------

## Getting Started

Each project is located in its respective directory within this repository. Follow the instructions in each project’s `README.md` file for reference, setup, and usage details.

--------------------------------------------------------------------------------------------------------------------------

## Technologies Used

- **Programming Languages:**
  - Hyper Text Markup Language (HTML)
  - Cascading Style Sheets (CSS)
  - JavaScript (JS)

- **Libraries:**
  - Bootstrap
  - React
  - Redux
  - Sass
  - Marked.js (for Markdown parsing)
  - Prism.js (for syntax highlighting)

--------------------------------------------------------------------------------------------------------------------------

## Notes

- React 18 has known incompatibilities with the tests for these projects. Refer to the [issue](https://github.com/freeCodeCamp/freeCodeCamp/issues) for more details.
- Use the following script in your `index.html` file to include the freeCodeCamp test suite:
  ```html
  <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
