// Tests str against a regular expression covering all valid U.S. phone formats, returning true if matched and false otherwise.
function telephoneCheck(str) {
  // Regex for U.S. phone formats
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)(\d{3})([\s\-]?)(\d{4})$/;
  return regex.test(str); // Return true or false
}

// Test cases
console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("1 (555) 555-5555"));
console.log(telephoneCheck("5555555"));
