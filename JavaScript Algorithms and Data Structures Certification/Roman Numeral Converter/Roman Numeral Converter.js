/* Tells the linter that `document` and `alert` are global variables */
'use strict';

// Get Document Object Model (DOM) elements
const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

// Function to convert number to Roman numeral
function convertToRoman(num) {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
  ];

  let roman = "";
  let number = num; // Avoid reassigning the function parameter

  // Convert number to Roman numeral using array iteration
  romanNumerals.forEach(([letter, value]) => {
    while (number >= value) {
      roman += letter;
      number -= value;
    }
  });

  return roman;
}

// Event listener for convert button
convertButton.addEventListener("click", () => {
  const value = parseInt(numberInput.value, 10);

  // Validate input
  if (Number.isNaN(value)) {
    output.textContent = "Please enter a valid number.";
    return;
  }

  if (value < 1) {
    output.textContent = "Please enter a number greater than or equal to 1.";
    return;
  }

  if (value >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999.";
    return;
  }

  // Display converted Roman numeral
  output.textContent = convertToRoman(value);
});
