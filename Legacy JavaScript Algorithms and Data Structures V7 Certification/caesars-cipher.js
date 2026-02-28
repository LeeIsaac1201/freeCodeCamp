// Iterates through each character, shifting uppercase letters by 13 places within the A–Z range and passing all other characters through unchanged.
function rot13(str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    // Only transform uppercase characters
    if (code >= 65 && code <= 90) {
      // Shift by 13 with wrap-around in the A–Z range
      const shifted = ((code - 65 + 13) % 26) + 65;
      result += String.fromCharCode(shifted);
    } else {
      // Keep non-alphabetic characters as-is
      result += str[i];
    }
  }

  return result;
}
