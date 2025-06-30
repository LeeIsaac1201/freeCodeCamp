# Back End Development and APIs Certification Projects

This repository contains all the required projects to complete the **Back End Development and APIs Certification** from [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

[View my certification here.](https://www.freecodecamp.org/certification/-SirLancelot/back-end-development-and-apis)

---

## Projects

### 1. Timestamp Microservice

- **Description:**  
  A microservice that returns a JSON object with a UNIX timestamp and a UTC string based on the input date.
- **Objective:**  
  Build an API endpoint `/api/:date?` that handles both UNIX timestamps and ISO date strings. If no date is provided, it returns the current time.
- **Features:**
  - Accepts a date string or UNIX timestamp
  - Returns `{ unix: <timestamp>, utc: <date string> }`
  - Handles invalid dates with `{ error: "Invalid Date" }`

### 2. Request Header Parser Microservice

- **Description:**  
  A simple API that parses and returns information from the request headers.
- **Objective:**  
  Create an endpoint `/api/whoami` that returns the user's IP address, preferred language, and software.
- **Features:**
  - Returns a JSON object with:
    - `ipaddress`
    - `language`
    - `software`

### 3. URL Shortener Microservice

- **Description:**  
  A service that shortens URLs and redirects users to the original link.
- **Objective:**  
  Build an API with endpoints to POST a URL and GET a shortened version, and redirect when accessed.
- **Features:**
  - POST `/api/shorturl` with a valid URL
  - Returns `{ original_url, short_url }`
  - GET `/api/shorturl/:short_url` redirects to the original URL
  - Validates URLs using DNS lookup

### 4. Exercise Tracker

- **Description:**  
  A full-featured API for tracking user-submitted exercises.
- **Objective:**  
  Create a RESTful API that allows users to register, log exercises, and retrieve logs with optional filters.
- **Features:**
  - POST `/api/users` to create a new user
  - POST `/api/users/:_id/exercises` to add an exercise
  - GET `/api/users` to list all users
  - GET `/api/users/:_id/logs?[from][&to][&limit]` to retrieve logs with optional date range and limit

### 5. File Metadata Microservice

- **Description:**  
  A microservice that accepts file uploads and returns metadata.
- **Objective:**  
  Build an endpoint `/api/fileanalyse` that accepts a file and returns its name, type, and size.
- **Features:**
  - Uses `multer` for file handling
    - Returns:
      - `name`
      - `type`
      - `size`

---

## Programming Languages Used
- Hypertext Markup Language (HTML)
- Cascading Style Sheets (CSS)
- JavaScript (JS)

---

## Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer
- dotenv
- body-parser
- Cross-Origin Resource Sharing (CORS)

---

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/LeeIsaac1201/freeCodeCamp.git
   cd freeCodeCamp/Back\ End\ Development\ and\ APIs
2. Install dependencies:   
   ```bash
   npm install
3. Create a .env file:
   ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
4. Start the server:
   ```bash
   npm start

---

## Code Validators Used

- **Hyper Text Markup Language (HTML)**: [https://validator.w3.org/](https://validator.w3.org/)
- **Cascading Style Sheets (CSS)**: [https://validator.w3.org/](https://validator.w3.org/)
- **JavaScript (JS)**: [https://validatejavascript.com/](https://validatejavascript.com/)
