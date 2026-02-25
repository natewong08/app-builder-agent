// app.js - Core logic for Simple Calculator Web App

/**
 * Calculator class handles input, expression building, and evaluation.
 */
class Calculator {
    /**
     * @param {HTMLElement} displayElement - The element where output is shown.
     */
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.currentInput = '';
        this.expressionStack = [];
        this.updateDisplay('0');
    }

    /** Update the calculator display */
    updateDisplay(value) {
        this.displayElement.textContent = value;
    }

    /** Append a digit (0-9) to the current input */
    appendDigit(digit) {
        // Prevent leading zeros like "00"
        if (this.currentInput === '0' && digit === '0') return;
        if (this.currentInput === '0' && digit !== '0') {
            this.currentInput = digit;
        } else {
            this.currentInput += digit;
        }
        this.updateDisplay(this.currentInput);
    }

    /** Append a decimal point if not already present */
    appendDecimal() {
        if (!this.currentInput.includes('.')) {
            // If nothing entered yet, start with "0."
            this.currentInput = this.currentInput || '0';
            this.currentInput += '.';
            this.updateDisplay(this.currentInput);
        }
    }

    /** Set an operator (+, -, *, /) */
    setOperator(operator) {
        if (this.currentInput !== '') {
            this.expressionStack.push(this.currentInput);
            this.currentInput = '';
        }
        // Replace previous operator if user presses another operator consecutively
        const last = this.expressionStack[this.expressionStack.length - 1];
        if (['+', '-', '*', '/'].includes(last)) {
            this.expressionStack[this.expressionStack.length - 1] = operator;
        } else {
            this.expressionStack.push(operator);
        }
        this.updateDisplay(operator);
    }

    /** Clear the current entry (C) */
    clearEntry() {
        this.currentInput = '';
        this.updateDisplay('0');
    }

    /** Reset everything (AC) */
    allClear() {
        this.currentInput = '';
        this.expressionStack = [];
        this.updateDisplay('0');
    }

    /** Evaluate the expression respecting operator precedence */
    calculate() {
        // Push any pending number
        if (this.currentInput !== '') {
            this.expressionStack.push(this.currentInput);
        }
        if (this.expressionStack.length === 0) return;

        // Convert to a token list where numbers are numbers, operators are strings
        const tokens = this.expressionStack.map(tok => {
            if (['+', '-', '*', '/'].includes(tok)) return tok;
            return parseFloat(tok);
        });

        // First pass: handle * and /
        const firstPass = [];
        let i = 0;
        while (i < tokens.length) {
            const token = tokens[i];
            if (token === '*' || token === '/') {
                const prev = firstPass.pop();
                const next = tokens[i + 1];
                const result = token === '*' ? prev * next : prev / next;
                firstPass.push(result);
                i += 2; // skip next number
            } else {
                firstPass.push(token);
                i++;
            }
        }

        // Second pass: handle + and -
        let result = firstPass[0];
        for (let j = 1; j < firstPass.length; j += 2) {
            const op = firstPass[j];
            const val = firstPass[j + 1];
            if (op === '+') result += val;
            else if (op === '-') result -= val;
        }

        // Round result to avoid floating point artifacts
        const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
        this.updateDisplay(rounded.toString());
        // Reset for next calculation
        this.currentInput = '';
        this.expressionStack = [];
    }
}

/**
 * Helper to map button clicks to Calculator methods based on data-key.
 */
function handleButtonClick(calculator, button) {
    const key = button.dataset.key;
    const value = button.textContent.trim();
    switch (key) {
        case 'digit':
            calculator.appendDigit(value);
            break;
        case 'decimal':
            calculator.appendDecimal();
            break;
        case 'operator':
            calculator.setOperator(value);
            break;
        case 'equals':
            calculator.calculate();
            break;
        case 'clear':
            calculator.clearEntry();
            break;
        case 'all-clear':
            calculator.allClear();
            break;
        default:
            // No action for unknown keys
            break;
    }
}

/**
 * Keyboard support – map keys to calculator actions.
 */
function handleKeyDown(calculator, e) {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        calculator.appendDigit(key);
    } else if (key === '.' || key === ',') {
        calculator.appendDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        calculator.setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculator.calculate();
    } else if (key === 'Escape') {
        calculator.allClear();
    } else if (key === 'Backspace') {
        calculator.clearEntry();
    }
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const displayEl = document.getElementById('display');
    const calc = new Calculator(displayEl);

    // Attach click listeners to all buttons with class .btn
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => handleButtonClick(calc, btn));
    });

    // Keyboard support
    document.addEventListener('keydown', e => handleKeyDown(calc, e));
});

// Export for potential testing (non‑module environment)
window.Calculator = Calculator;
