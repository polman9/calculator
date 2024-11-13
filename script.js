let firstNumber = null;
let operator = null;
let currentInput = '';
let shouldResetInput = false;

const display = document.getElementById('display');

// Basic operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Division by 0";
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function updateDisplay(value) {
    display.textContent = value;
}

function clearDisplay() {
    currentInput = '';
    firstNumber = null;
    operator = null;
    shouldResetInput = false;
    updateDisplay('0');
}

function handleDigit(digit) {
    if (shouldResetInput) {
        currentInput = '';
        shouldResetInput = false;
    }
    currentInput += digit;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (operator && !shouldResetInput) calculate();
    firstNumber = parseFloat(currentInput);
    operator = op;
    shouldResetInput = true;
}

function calculate() {
    if (!operator || shouldResetInput) return;
    const secondNumber = parseFloat(currentInput);
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(Math.round(result * 100) / 100); // Rounding for long decimals
    currentInput = result.toString();
    firstNumber = result;
    operator = null;
    shouldResetInput = true;
}

function handleDecimal() {
    if (currentInput.includes('.')) return;
    currentInput += '.';
    updateDisplay(currentInput);
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}
