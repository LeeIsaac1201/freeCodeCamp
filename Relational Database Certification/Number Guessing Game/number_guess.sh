#!/bin/bash

# Define the PostgreSQL command for executing queries.
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# Prompt the user for their username.
echo "Enter your username:"
read USERNAME

# Check if the username already exists in the database.
USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME';")

if [[ -z $USER_ID ]]
then
  # If the user is new, welcome them and insert their username into the database.
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  $PSQL "INSERT INTO users(username) VALUES('$USERNAME');"
  
  # Retrieve the newly assigned user identification (ID).
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME';")
else
  # If the user exists, retrieve their game history.
  GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id=$USER_ID;")
  BEST_GAME=$($PSQL "SELECT MIN(guesses) FROM games WHERE user_id=$USER_ID;")
  
  # Display the user's previous game statistics.
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Generate a random secret number between 1 and 1000.
SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))
echo "Guess the secret number between 1 and 1000:"

# Initialize the number of guesses counter.
NUMBER_OF_GUESSES=0

# Loop until the correct guess is made.
while true
do
  # Read the user's guess.
  read GUESS
  
  # Increment the guess counter.
  ((NUMBER_OF_GUESSES++))
  
  # Validate that the input is an integer.
  if ! [[ $GUESS =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
    continue
  fi

  # Provide hints based on the user's guess.
  if (( GUESS < SECRET_NUMBER ))
  then
    echo "It's higher than that, guess again:"
  elif (( GUESS > SECRET_NUMBER ))
  then
    echo "It's lower than that, guess again:"
  else
    # If the guess is correct, exit the loop.
    break
  fi
done

# Store the game result in the database.
$PSQL "INSERT INTO games(user_id, guesses) VALUES($USER_ID, $NUMBER_OF_GUESSES);"

# Congratulate the user on their successful guess.
echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
