# Relational Database Certification Projects

This repository contains all the required projects to complete the **Relational Database Certification** from freeCodeCamp.

[View my certification here.]()

---

## Projects

### 1. Celestial Bodies Database
- **Description:**  
  A relational database that models galaxies, stars, planets, and moons. Designed in PostgreSQL to practice schema design, data types, relationships, and constraints.
- **Objective:**  
  Build a multi-table PostgreSQL database named `universe` with proper primary/foreign keys, a variety of data types, and sufficient sample data to meet freeCodeCamp’s testing requirements.
- **Features:**
  - Database named `universe` with tables: `galaxy`, `star`, `planet`, `moon`, plus at least one additional table.
  - Each table has:
    - A primary key column named `<table_name>_id` of type `SERIAL`.
    - A name column of type `VARCHAR` with a UNIQUE constraint.
    - At least five total columns (e.g., `description` (TEXT), `age_in_millions_of_years` (INT), `has_life` (BOOLEAN), `is_spherical` (BOOLEAN), `distance_from_earth` (NUMERIC), `planet_type`, `galaxy_type`, etc.).
    - At least two columns defined as `NOT NULL`.
  - Foreign key relationships:
    - `star.galaxy_id → galaxy(galaxy_id)`
    - `planet.star_id → star(star_id)`
    - `moon.planet_id → planet(planet_id)`
  - Data population:
    - ≥6 rows in `galaxy`
    - ≥6 rows in `star`
    - ≥12 rows in `planet`
    - ≥20 rows in `moon`
    - ≥3 rows in any additional table(s)
  - Use of at least two non-key INT columns, at least one NUMERIC, at least one TEXT, and at least two BOOLEAN columns somewhere in the schema.
  - All name columns are `VARCHAR` and required to be UNIQUE.

### 2. World Cup Database
- **Description:**  
  A PostgreSQL database capturing results from the final three rounds of recent Fédération Internationale de Football Association (FIFA) World Cups, populated by a Bash script, with another script for running predefined queries.
- **Objective:**  
  Create and populate a `worldcup` database from a CSV file (`games.csv`) via Bash scripting, then write SQL queries to produce specific output for analysis.
- **Features:**
  - Database named `worldcup` with two tables:
    - **Teams Table:**
      - `team_id` (SERIAL, primary key)
      - `name` (VARCHAR, UNIQUE, NOT NULL)
    - **Games Table:**
      - `game_id` (SERIAL, primary key)
      - `year` (INT NOT NULL)
      - `round` (VARCHAR NOT NULL)
      - `winner_id` (INT NOT NULL, FK → teams(team_id))
      - `opponent_id` (INT NOT NULL, FK → teams(team_id))
      - `winner_goals` (INT NOT NULL)
      - `opponent_goals` (INT NOT NULL)
  - **insert_data.sh:**
    - Reads from `games.csv` (skipping the header).
    - Inserts each unique team into `teams` (resulting in 24 rows).
    - Inserts every game row into `games` with the correct `team_id` lookups (32 total rows).
  - **queries.sh:**
    - Contains single-line echo commands that run SQL queries to match `expected_output.txt`.
    - Outputs include totals, averages (with two decimal places), highest-scoring games, champion counts, etc.

### 3. Salon Appointment Scheduler
- **Description:**  
  A Bash-driven interactive Command Line Interface (CLI) that sits on top of a PostgreSQL database (`salon`) to manage salon appointments, customers, and services.
- **Objective:**  
  Practice combining Bash scripting with SQL by listing services, capturing customer data, and scheduling appointments through a single `salon.sh` script.
- **Features:**
  - Database named `salon` with three tables:
    - **Customers Table:**
      - `customer_id` (SERIAL, primary key)
      - `phone` (VARCHAR NOT NULL, UNIQUE)
      - `name` (VARCHAR NOT NULL)
    - **Services Table:**
      - `service_id` (SERIAL, primary key)
      - `name` (VARCHAR NOT NULL)
      - At least three pre-inserted rows (e.g., “cut,” “color,” “trim”), with one entry having `service_id = 1`.
    - **Appointments Table:**
      - `appointment_id` (SERIAL, primary key)
      - `customer_id` (INT NOT NULL, FK → customers(customer_id))
      - `service_id` (INT NOT NULL, FK → services(service_id))
      - `time` (VARCHAR NOT NULL)
  - **salon.sh:**
    - Begins with a Bash shebang (`#!/bin/bash`) and has executable permissions.
    - Displays a numbered list of services (e.g., 1) cut, 2) color, etc.).
    - Prompts user for `SERVICE_ID_SELECTED`. If invalid (not on the list), re-displays the menu.
    - Prompts for `CUSTOMER_PHONE`.
    - If phone does not exist in `customers`, prompts for `CUSTOMER_NAME` and inserts a new customer record.
    - Prompts for `SERVICE_TIME`.
    - Inserts a new row into `appointments` with the correct `customer_id` and `service_id`.
    - After scheduling, prints:
      ```
      I have put you down for a <service> at <time>, <name>.
      ```
    - Exits cleanly without using `clear` or any extraneous output.

### 4. Periodic Table Database
- **Description:**  
  A PostgreSQL database (`periodic_table`) containing chemical element data. The project fixes schema issues, normalises types into a separate table, populates missing elements, and provides a Bash script for querying.
- **Objective:**  
  Fix and extend an existing periodic table schema, enforce constraints, normalise a types table, insert missing elements, and build an `element.sh` script to retrieve element details by atomic number, symbol, or name.
- **Features:**
  - **Schema Corrections & Constraints**
    - Rename columns in `properties`:
      - `weight` → `atomic_mass`
      - `melting_point` → `melting_point_celsius` (NOT NULL)
      - `boiling_point` → `boiling_point_celsius` (NOT NULL)
    - Add UNIQUE and NOT NULL constraints to `elements(symbol)` and `elements(name)`.
    - Set `properties.atomic_number` as a foreign key → `elements(atomic_number)`.
    - Remove `type` column from `properties`.
  - **Normalisation**
    - Create `types` table:
      - `type_id` (INT, primary key)
      - `type` (VARCHAR NOT NULL)
    - Populate `types` with the three distinct categories originally in `properties` (e.g., alkali metal, alkaline earth metal, nonmetal).
    - Add `properties.type_id` (INT NOT NULL) referencing `types(type_id)`.
    - Update each `properties` row to point to the correct `type_id`.
  - **Data Cleanup & Insertion**
    - Capitalise only the first letter of each `elements.symbol` (e.g., h → H).
    - Convert `atomic_mass` column to DECIMAL, removing trailing zeros so values exactly match `atomic_mass.txt`.
    - Delete any row where `atomic_number = 1000` from both `elements` and `properties`.
    - Insert two new elements:
      - 9: Fluorine (F, 18.998, -220, -188.1, type → nonmetal)
      - 10: Neon (Ne, 20.18, -248.6, -246.1, type → nonmetal)
  - **Query Script (`element.sh`):**
    - Executable Bash script with shebang (`#!/bin/bash`).
    - If run with no argument, prints:
      ```
      Please provide an element as an argument.
      ```
    - If run with a valid `atomic_number`, `symbol`, or `name`, prints (for example, for Hydrogen):
      ```
      The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.
      ```
    - If argument does not match any element, prints:
      ```
      I could not find that element in the database.
      ```

### Git Versioning
- Folder named `periodic_table` initialised with `git init`.
- At least five commits on the main branch:
  - First commit: Initial commit
  - Subsequent commits begin with `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`
- Final working tree clean on main without uncommitted changes.

---

## Notes
- All SQL commands assume you’re logged in as the `freecodecamp` user (e.g.):
  ```bash
  psql --username=freecodecamp --dbname=postgres
  ```
  After creating each database, connect with `\c <database_name>` before running any DDL or inserts.
- After completing a project’s schema and data insertion, create a dump for reproducibility:
  ```bash
  pg_dump -cC --inserts -U freecodecamp <database_name> > <database_name>.sql
  ```
  To restore later:
  ```bash
  psql -U postgres < <database_name>.sql
  ```
- Every Bash script (`insert_data.sh`, `queries.sh`, `salon.sh`, `element.sh`, `number_guess.sh`) must have executable permissions:
  ```bash
  chmod +x <script>.sh
  ```
- Check each script interactively—no extra blank lines, spaces, or unexpected output—because freeCodeCamp’s automated tests compare results character for character.
- Follow the exact naming conventions and constraints from the user stories:
  - Primary keys must be named `<table_name>_id` and SERIAL.
  - Foreign keys must use the same column name as their referenced column (e.g., `star.galaxy_id → galaxy(galaxy_id)`).
  - Any name column required to be UNIQUE and NOT NULL must be declared as such in the CREATE TABLE statement.
  - Whenever a script needs to look up an ID (for example, inserting a new game or booking an appointment), do so dynamically within the same script run—do not hard‐code any IDs.
- For the `periodic_table` and `number_guessing_game` repositories:
  - You must have at least five commits on the main branch.
  - First commit message: Initial commit
  - All subsequent commits must start with one of these prefixes: `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`
  - Ensure your working tree is clean (no uncommitted changes) before you finish, so the freeCodeCamp validator sees a consistent Git history.
  - If your virtual machine (VM) is ever reset or you lose in‐memory data, restore each database promptly from its `.sql` dump. This avoids retyping every CREATE TABLE and INSERT.

--------------------------------------------------------------------------------------------------------------------------

## Getting Started

Each project is located in its respective directory within this repository.

--------------------------------------------------------------------------------------------------------------------------

## Programming Languages Used

- Bourne Again SHell (Bash)
- Procedural Language/PostgreSQL (PL/pgSQL)

## Code Validator Used

- **Bourne Again SHell(Bash)/Bourne shell(sh):** [https://www.shellcheck.net/](https://www.shellcheck.net/)
