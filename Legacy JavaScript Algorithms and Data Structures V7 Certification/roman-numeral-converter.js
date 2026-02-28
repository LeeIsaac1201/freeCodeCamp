/* global document */
'use strict';

// Iterates through a Roman numeral table, greedily subtracting values and appending symbols until the input is exhausted.
function convertToRoman(num) {
  // Roman numeral symbols mapped to their integer values, ordered highest to lowest
  const table = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  let n = num;
  let out = '';

  for (const [sym, val] of table) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
    if (n === 0) break;
  }
  return out;
}

// Node export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = convertToRoman;
}

// Browser hookup (guarded)
if (typeof document !== 'undefined') {
  const numberInput = document.getElementById('number');
  const convertButton = document.getElementById('convert-btn');
  const output = document.getElementById('output');

  function handleConvert() {
    const raw = (numberInput.value || '').trim();

    // Validate input before converting
    if (raw.length === 0) {
      output.textContent = 'Please enter a valid number.';
      return;
    }

    const value = Number(raw);

    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      output.textContent = 'Please enter a valid number.';
      return;
    }

    if (value < 1) {
      output.textContent = 'Please enter a number greater than or equal to 1.';
      return;
    }

    if (value >= 4000) {
      output.textContent = 'Please enter a number less than or equal to 3999.';
      return;
    }

    output.textContent = convertToRoman(value);
  }

  if (convertButton) {
    convertButton.addEventListener('click', handleConvert);
  }
  if (numberInput) {
    numberInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleConvert();
    });
  }
}
