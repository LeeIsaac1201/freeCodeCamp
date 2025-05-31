#!/bin/bash

# Define our psql command for query convenience.
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# Check if an argument was provided. If not, prompt the user.
if [ -z "$1" ]; then
  echo "Please provide an element as an argument."
  exit 0
fi

# Run the query.
# Notice we use e.atomic_number::text so that it safely compares 
# even when the argument is not a number.
RESULT=$($PSQL "SELECT e.atomic_number, e.name, e.symbol, t.type, p.atomic_mass, p.melting_point_celsius, p.boiling_point_celsius 
FROM elements AS e 
JOIN properties AS p ON e.atomic_number = p.atomic_number 
JOIN types AS t ON p.type_id = t.type_id 
WHERE e.atomic_number::text = '$1' OR e.symbol ILIKE '$1' OR e.name ILIKE '$1';")

# If the query returns no result, output an error message.
if [ -z "$RESULT" ]; then
  echo "I could not find that element in the database."
else
  # Process and display the result.
  echo "$RESULT" | while IFS="|" read ATOMIC_NUMBER NAME SYMBOL TYPE ATOMIC_MASS MELTING_POINT BOILING_POINT
  do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
  done
fi
