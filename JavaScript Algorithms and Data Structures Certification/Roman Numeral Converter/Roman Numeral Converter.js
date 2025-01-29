// Get Document Object Model elements
const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

// Function to convert number to Roman numeral
function convertToRoman(number) {
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

  // Convert number to Roman numeral
  for (const [letter, value] of romanNumerals) {
    while (number >= value) {
      roman += letter;
      number -= value;
    }
  }

  return roman;
}

// Event listener for convert button
convertButton.addEventListener("click", () => {
  const value = parseInt(numberInput.value, 10);

  // Validate input
  if (isNaN(value)) {
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