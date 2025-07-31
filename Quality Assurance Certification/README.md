# Quality Assurance Certification Projects

This repository contains all the required projects to complete the [**Quality Assurance Certification** from freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/).

[View my certification here.](https://www.freecodecamp.org/certification/-SirLancelot/quality-assurance-v7)

---

## Projects

### 1. Metric-Imperial Converter

- **Description:**  A microservice Application Programming Interface (API) that converts values between metric and imperial measurement units.
- **Objective:**  Build an endpoint `/api/convert` that accepts a query parameter `input` and returns both unit systems.
- **Features:**  
  - Parses numeric values and unit identifiers from the query string.  
  - Returns JSON `{ initNum, initUnit, returnNum, returnUnit, string }`.  
  - Handles invalid number or unit errors with descriptive messages.

### 2. Issue Tracker

- **Description:**  A full CRUD issue tracking API for different projects.
- **Objective:**  Create endpoint `/api/issues/{project}` supporting GET, POST, PUT, and DELETE operations.
- **Features:**  
  - Create new issues with title, text, creator, and optional assignee and status.  
  - Retrieve and filter issues by query parameters.  
  - Update issue fields and `updated_on` timestamp.  
  - Delete issues by ID.  
  - Error handling for missing or invalid fields.

### 3. Personal Library

- **Description:**  A book management API that allows users to add, comment on, and retrieve books.
- **Objective:**  Implement `/api/books` endpoints for creating, listing, and commenting on books.
- **Features:**  
  - POST to add a new book with a `title`.  
  - GET to list all books with comment counts.  
  - GET by `_id` to retrieve a single book and its comments.  
  - POST a `comment` to a book.  
  - Responds with "no book exists" for invalid IDs.

### 4. Sudoku Solver

- **Description:**  A Sudoku solving service with both front-end validation and back-end solving logic.
- **Objective:**  Build `/api/solve` to solve puzzles and `/api/check` to validate placements.
- **Features:**  
  - Validates puzzle string length and characters.  
  - Checks row, column, and region placement validity.  
  - Solves valid puzzles and returns the solution string.  
  - Front-end UI for user input and result display.

### 5. American British Translator

- **Description:**  A text translation API switching between American and British English spellings.
- **Objective:**  Implement `/api/translate` accepting `text` and `locale` parameters.
- **Features:**  
  - Translates words and phrases based on locale direction.  
  - Highlights translated terms in the response.  
  - Error handling for missing fields or invalid locale.

---

## Technologies Used

- **Programming Languages:**
  - Hyper Text Markup Language (HTML)
  - Cascading Style Sheets (CSS)
  - JavaScript (JS)

- **Runtime & Frameworks:**
  - Node.js
  - Express.js

- **Databases & ORMs:**
  - MongoDB + Mongoose

- **Templating & Real-time:**
  - Pug (template engine)
  - Socket.io (real-time communication)

- **Authentication:**
  - Passport.js

- **Testing Frameworks & Tools:**
  - Mocha (test runner)
  - Chai (assertion library)
  - chai-http (HTTP integration testing)
  - Zombie.js or Puppeteer (headless browser testing)

- **Utilities & Middleware:**
  - dotenv
  - body-parser

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/freeCodeCamp.git
   cd freeCodeCamp/Quality\ Assurance

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:

   ```bash
   npm start
   ```
5. Run tests:

   ```bash
   npm test
   ```

---

## Code Validators Used

* **HTML & CSS:** W3C Validators ([validator.w3.org](https://validator.w3.org/))
* **JavaScript:** ESLint with recommended configuration
* **Shell scripts:** ShellCheck ([shellcheck.net](https://www.shellcheck.net/))
* **API Testing:** Mocha and Chai test suites
