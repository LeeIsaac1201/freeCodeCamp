# Information Security Certification Projects

This repository contains all the required projects to complete the [**Information Security Certification** from freeCodeCamp](https://www.freecodecamp.org/learn/information-security/).

View my certification here: [https://www.freecodecamp.org/certification/leeminghuiisaac/information-security-v7](https://www.freecodecamp.org/certification/leeminghuiisaac/information-security-v7)

---

## Projects

### 1. Stock Price Checker
- **Description:**  Built a full-stack JavaScript application that fetches real-time stock prices from NASDAQ using the freeCodeCamp stock price proxy application programming interface (API), allows users to like stocks (one like per Internet Protocol (IP) address), and compares relative popularity between two stocks while implementing security measures and functional tests.
- **Objective:**  Create a RESTful API endpoint (`/api/stock-prices`) that accepts stock symbols via query parameters, returns stock data (symbol, price, likes), handles user likes with IP anonymisation for privacy compliance, implements content security policies to restrict script and Cascading Style Sheets (CSS) loading, and supports comparing two stocks with relative likes instead of absolute counts.
- **Features:**  
    - API endpoint (`/api/stock-prices/`) implemented in `routes/api.js`:
        - **Accepts** `stock` query parameter with NASDAQ stock symbol(s).
        - **Accepts** an optional `like` query parameter (boolean) to register a like from the user's IP address.
        - **Returns** JavaScript Object Notation (JSON) object with stockData containing:
            - `stock`: stock symbol (string)
            - `price`: current stock price (number)
            - `likes`: total number of likes (number) for single stock queries
    - **For two-stock queries**: returns an array with `rel_likes` (difference between likes) instead of absolute `likes`.
    - **IP address anonymisation**:
        - Stores anonymised IP addresses (hashed, truncated, or partially zeroed) before saving to the database.
        - Ensures only one like per IP address per stock.
        - Compliant with data privacy regulations.
    - **Security features implemented in `server.js`**: Content Security Policy (CSP) configured to only allow loading scripts and CSS from the server.
    - **Stock price fetching**: Uses freeCodeCamp proxy API (`https://stock-price-checker-proxy.freecodecamp.rocks/`) to retrieve up-to-date stock prices without requiring personal API keys.
    - **Environment configuration**: `NODE_ENV` set to `test` for testing environment.
- **Example single stock response**:
    ```
    {
            "stockData": {
            "stock": "GOOG",
            "price": 150.25,
            "likes": 3
        }
    }
    ```
- **Example two-stock comparison response**:
    ```
    {
        "stockData": [
            {
            "stock": "GOOG",
            "price": 150.25,
            "rel_likes": 2
            },
            {
                "stock": "MSFT",
                "price": 380.50,
                "rel_likes": -2
            }
        ]
    }
    ```

### 2. Anonymous Message Board
- **Description:**  Built a full-stack JavaScript application that implements an anonymous message board system where users can create boards, post threads, reply to threads, report content, and delete their own posts using passwords, while implementing security headers to prevent clickjacking, Domain Name System (DNS) prefetching, and referrer leakage.
- **Objective:**  Create a RESTful API with endpoints for thread and reply management (`/api/threads/{board}` and `/api/replies/{board}`) that supports creating, viewing, reporting, and deleting content with password protection. Implement database storage with proper field structures (including timestamps, reported flags, and nested replies), return only the ten most recent threads with three replies each, exclude sensitive fields (`reported`, `delete_password`) from client responses, and configure security headers to restrict iFrame embedding, DNS prefetching, and referrer information.
- **Features:**  
    - Thread API endpoints (`/api/threads/{board}`):
        - **POST**: Create new thread with `text` and `delete_password` form data - Saves to database with fields: `_id`, `text`, `created_on`, `bumped_on` (initially same as `created_on`), `reported` (boolean), `delete_password`, `replies` (array).
        - **GET**: Retrieve ten most recent bumped threads with only the three most recent replies each - Excludes `reported` and `delete_password` fields from response.
        - **DELETE**: Delete thread by passing `thread_id` and `delete_password` - Returns `"success"` or `"incorrect password"`.
        - **PUT**: Report thread by passing `thread_id` - Sets `reported` to `true` and returns `"reported"`.
    - Reply API endpoints (`/api/replies/{board}`):
        - **POST**: Create new reply with `text`, `delete_password`, and `thread_id` form data:
            - Updates thread's `bumped_on` date to reply's creation date. 
            - Adds reply object to thread's `replies` array with fields: `_id`, `text`, `created_on`, `delete_password`, `reported`.
        - **GET**: Retrieve entire thread with all replies using ?thread_id={thread_id} query parameter:
            - Excludes `reported` and `delete_password` fields from response.
        - **DELETE**: Delete reply by passing thread_id, reply_id, and delete_password:
            - Returns `"success"` or `"incorrect password"`.
            - On success, changes reply text to `"[deleted]"` (does not remove from database).
        - **PUT**: Report reply by passing `thread_id` and `reply_id`:
            - Sets reply's `reported` to `true` and returns `"reported"`.
    - Security features implemented in `server.js`:
        - **X-Frame-Options**: Configured to only allow the site to be loaded in iFrame on its own pages (prevents clickjacking).
        - **X-DNS-Prefetch-Control**: Disabled DNS prefetching.
        - **Referrer-Policy**: Configured to only send referrer for own pages.

### 3. Port Scanner
- **Description:**  Created a Python-based port scanner that checks for open ports on a given target (uniform resource locator (URL) or IP address) within a specified port range, with an optional verbose mode that provides formatted output including service names for common ports.
- **Objective:** Implement a `get_open_ports()` function in `port_scanner.py` that accepts a target (URL or IP address), a port range (list of two numbers: start and end), and an optional verbose flag. The function should scan the specified port range, return a list of open ports in normal mode, or return a formatted string with service names in verbose mode. The function must validate inputs and return appropriate error messages for invalid hostnames or IP addresses.
- **Features:**  
    - `get_open_ports(target, port_range, verbose=False)` function implemented in `port_scanner.py`:
        - **Parameters**:
            - `target`: URL (e.g., `www.stackoverflow.com`) or IP address (e.g., `209.216.230.240`).
            - `port_range`: List of two integers `[start_port, end_port]` defining the range to scan.
            - `verbose` (optional): Boolean flag; if `True`, returns formatted string instead of list.
        - **Normal mode (verbose=False)**:
            - Returns a Python list of open ports within the specified range.
            - Example: `get_open_ports("209.216.230.240", [440, 445])` → `[443, 445]`
        - **Verbose mode (verbose=True)**:
            - Returns a formatted string with:
                - Target URL and resolved IP address
                - Column headers: `PORT` and `SERVICE`
                - Each open port with its corresponding service name (from `common_ports.py`)
            - Format:
                ```
                Open ports for {URL} ({IP address})
                PORT     SERVICE
                {port}   {service name}
                {port}   {service name}
                ```
            - Example:
                ```
                Open ports for scanme.nmap.org (45.33.32.156)
                PORT     SERVICE
                22       ssh
                80       http
                ```
            - Includes proper spacing and newline characters as specified.
    - **Input validation**:
        - Invalid hostname (URL) → returns `"Error: Invalid hostname"`
        - Invalid IP address → returns `"Error: Invalid IP address"`
    - **Service name lookup**: Uses dictionary provided in `common_ports.py` to map port numbers to service names (e.g., port 22 → "ssh", port 80 → "http").
    - **Port scanning implementation**:
        - Scans all ports in the specified range `[start_port, end_port]` (inclusive).
        - Identifies which ports are open/accepting connections.
    - **Example usage:**
        ```
        # Normal mode - returns list
        get_open_ports("209.216.230.240", [440, 445])
        # Returns: [443, 445]
    
        get_open_ports("www.stackoverflow.com", [79, 82])
        # Returns: [80]
    
        # Verbose mode - returns formatted string
        get_open_ports("scanme.nmap.org", [20, 80], True)
        # Returns formatted string with service names
        ```

### 4. SHA-1 Password Cracker

- **Description:**  Built a Python-based password cracker that demonstrates the security vulnerabilities of SHA-1 hashing by attempting to reverse-engineer hashed passwords through dictionary attacks using a list of the top 10,000 most common passwords, with optional support for salted hashes (salt prepended and appended to passwords before hashing).
- **Objective:**  Create a password cracking function that takes a SHA-1 hash and attempts to find the original password by hashing each entry from a common password database (`top-10000-passwords.txt`) and comparing the results. The function must return the matched password string or "PASSWORD NOT IN DATABASE" if no match is found. Support an optional `use_salts` parameter that, when enabled, tests each password with all known salts (from `known-salts.txt`) both prepended and appended before hashing and comparing.
- **Features:**  
    - Password cracking function implemented in `password_cracker.py`:
        - **Parameters**:
            - `hash`: SHA-1 hash string of the password to crack.
            - `use_salts` (optional): Boolean flag; if `True`, tests passwords with known salts prepended and appended.
        - **Normal mode (use_salts=False)**:
            - Hashes each password from `top-10000-passwords.txt` using SHA-1.
            - Compares each hash to the target hash.
            - Returns the matching password string if found.
            - Returns "PASSWORD NOT IN DATABASE" if no match found.
        - **Password database**:
            - Uses `top-10000-passwords.txt` containing 10,000 most commonly used passwords.
            - Demonstrates why common passwords are insecure even when hashed.
        - **Salt database**:
            - Uses `known-salts.txt` containing common salt strings.
            - Tests both prepend and append positions for each salt.
        - **Hashing implementation**:
            - Uses Python's `hashlib` library for SHA-1 hashing.
            - Demonstrates the principle that identical inputs always produce identical hashes.

### 5. Secure Real Time Multiplayer Game

- **Description:**  Developed a secure two-dimensional real-time multiplayer game using the Hypertext Markup Language (HTML) Canvas API and Socket.io where players control avatars that move around the canvas, collect items to increase their score, and compete for ranking, while implementing multiple security measures using Helmet.js to prevent MIME sniffing, cross-site scripting (XSS) attacks, client-side caching, and to obfuscate the server technology.
- **Objective:**  Create a multiplayer game with real-time synchronisation where multiple players can connect simultaneously, move their avatars using WASD/arrow keys, collect items to increase their score, and see their current rank relative to other players. Implement two core classes (`Player` in `Player.mjs` and `Collectible` in `Collectible.mjs`) with methods for movement, collision detection, and rank calculation. Configure security headers using Helmet.js (v3.21.3) to prevent MIME sniffing, XSS attacks, disable caching, and disguise the server platform as "PHP 7.4.3".
- **Features:**  
    - **Multiplayer functionality**:
        - Multiple players can connect to the server and play simultaneously.
        - Real-time synchronisation keeps all players updated on the game state.
        - Players can disconnect at any time without disrupting other players.
        - Uses Socket.io for real-time bidirectional communication.
    - **Game canvas rendering**:
        - Uses HTML Canvas API for 2D graphics rendering.
        - Displays player avatars at their current positions.
        - Displays collectible items on the canvas.
        - Updates in real-time as players move and items are collected.
    - **Security measures (using `helmet@^3.21.3`)**:
        - **Prevent MIME sniffing**: Client cannot guess/sniff MIME types (X-Content-Type-Options: nosniff).
        - **Prevent XSS attacks**: Cross-site scripting protection enabled (X-XSS-Protection).
        - **Disable caching**: No website content cached in client (Cache-Control headers).
        - **Disguise server**: Headers claim site is powered by "PHP 7.4.3" (X-Powered-By header spoofing).

---

## Technologies Used

- **Programming Languages:**
  - Python 3
  - JavaScript

---

## How to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/LeeIsaac1201/LeeIsaac1201.git
    cd freeCodeCamp/Information-Security
    ```
2. Navigate to the project folder you want to run (e.g., stock-price-checker):
    ```bash
    cd stock-price-checker
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Run the application:
    ```
    npm start
    ```
5. (Optional) Run tests for the project:
    ```
    npm test
    ```
---

## Notes
1. Replit links on my freeCodeCamp profile will **not work** because the Replit projects were removed to free up space on the free plan, so those links are now inactive.
2. All Python code in this repository does **not** strictly follow PEP 8 style guidelines. These projects prioritise clarity of logic and alignment with the freeCodeCamp exercises over stylistic conformity.
