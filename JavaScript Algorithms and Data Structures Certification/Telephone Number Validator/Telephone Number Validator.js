// Grab elements from the Document Object Model
const userInput = document.getElementById('user-input');
const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');
const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;

function telephoneCheck(str) {
  return phoneRegex.test(str);
}

// Event listener for the Check button
checkButton.addEventListener('click', function() {
  const phone = userInput.value.trim();

  // Alert if no phone number is provided
  if (phone === "") {
    alert("Please provide a phone number");
    return;
  }

  // Validate the phone number using telephoneCheck()
  if (telephoneCheck(phone)) {
    resultsDiv.textContent = "Valid US number: " + phone;
  } else {
    resultsDiv.textContent = "Invalid US number: " + phone;
  }
});

// Event listener for the Clear button
clearButton.addEventListener('click', function() {
  resultsDiv.textContent = "";
});