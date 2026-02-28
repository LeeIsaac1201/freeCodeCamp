// Strips non-alphanumeric characters, lowercases the result, and checks if it reads the same forwards and backwards.
function palindrome(str) {
  // Remove all non-alphanumeric characters and convert to lowercase
  const cleanedStr = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  // Reverse the cleaned string
  const reversedStr = cleanedStr.split('').reverse().join('');
  
  // Compare the cleaned string with its reverse
  return cleanedStr === reversedStr;
}

palindrome("eye");
