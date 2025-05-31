// Declare `document` for ESLint to recognise it in a browser environment
/* global document */

// Variables and constants
let currentValue = '0'
let formula = ''
let lastInputType = null

const display = document.getElementById('display')

// Functions
// Updates the calculator display
function updateDisplay () {
  display.textContent = currentValue
}

// Clears all inputs and resets the calculator
function clearAll () {
  currentValue = '0'
  formula = ''
  lastInputType = null
  updateDisplay()
}

// Handles digit input
function inputDigit (digit) {
  if (lastInputType === 'equals') {
    currentValue = digit
    formula = ''
  } else {
    if (currentValue === '0' || currentValue === '-0') {
      currentValue = currentValue.startsWith('-') ? '-' + digit : digit
    } else {
      currentValue += digit
    }
  }
  lastInputType = 'number'
  updateDisplay()
}

// Handles decimal point input
function inputDecimal () {
  if (lastInputType === 'equals') {
    currentValue = '0.'
    formula = ''
    lastInputType = 'number'
    updateDisplay()
    return
  }
  if (!currentValue.includes('.')) {
    if (currentValue === '' || currentValue === '-') {
      currentValue += '0.'
    } else {
      currentValue += '.'
    }
  }
  lastInputType = 'number'
  updateDisplay()
}

// Handles operator input
function inputOperator (operator) {
  if (currentValue === '-' && lastInputType === 'number') {
    currentValue = ''
    lastInputType = 'operator'
  }

  if (lastInputType === 'operator') {
    if (operator === '-' && currentValue !== '-') {
      currentValue = '-'
      lastInputType = 'number'
      updateDisplay()
      return
    } else {
      // Replace trailing operator(s)
      formula = formula.replace(/[+\-*/]+$/, '') + operator
      return
    }
  }

  if (lastInputType === 'equals') {
    formula = currentValue + operator
  } else {
    formula += currentValue + operator
  }

  currentValue = ''
  lastInputType = 'operator'
}

// Safely evaluates a mathematical expression
function safeEvaluate (expression) {
  try {
    // Only allow numbers, operators, and parentheses
    if (/^[0-9+\-*/().\s]+$/.test(expression)) {
      // eslint-disable-next-line no-eval
      return eval(expression)
    } else {
      throw new Error('Invalid characters in expression')
    }
  } catch {
    throw new Error('Invalid mathematical expression')
  }
}

// Calculates the result of the current formula
function calculateResult () {
  if (lastInputType === 'number') {
    formula += currentValue
  } else if (lastInputType === 'operator') {
    // Remove any trailing operator(s)
    formula = formula.replace(/[+\-*/]+$/, '')
  }

  try {
    const result = safeEvaluate(formula) // Use the safe evaluation function
    currentValue = parseFloat(result.toFixed(10)).toString()
    updateDisplay()
    formula = ''
    lastInputType = 'equals'
  } catch (error) {
    currentValue = 'Error'
    updateDisplay()
    formula = ''
    lastInputType = null
  }
}

// Event listeners

// Clear button event listener
document.getElementById('clear').addEventListener('click', clearAll)

// Digit buttons event listeners
const digitIds = [
  'zero', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine'
]
digitIds.forEach(id => {
  document.getElementById(id).addEventListener('click', function () {
    inputDigit(this.textContent)
  })
})

// Decimal button event listener
document.getElementById('decimal').addEventListener('click', inputDecimal)

// Operator buttons event listeners
const operatorMap = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}
Object.entries(operatorMap).forEach(([id, symbol]) => {
  document.getElementById(id).addEventListener('click', function () {
    inputOperator(symbol)
  })
})

// Equals button event listener
document.getElementById('equals').addEventListener('click', calculateResult)

// Initialise display
updateDisplay()
