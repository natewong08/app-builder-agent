# Simple Calculator Web App

## Project Overview

A lightweight, responsive web calculator built with **HTML5**, **CSS3**, and **JavaScript (ES6+)**. It provides a clean UI for basic arithmetic operations, supports keyboard input, and works across desktop and mobile browsers.

---

## Features

- **Basic arithmetic**: addition, subtraction, multiplication, division.
- **Decimal support**.
- **Clear entry (C)** – clears the current number being typed.
- **All clear (AC)** – resets the entire calculation.
- **Responsive design** – adapts layout and font sizes for screens smaller than 600 px.
- **Keyboard shortcuts**:
  - Numbers `0‑9`
  - Decimal `.` (or `,`)
  - Operators `+`, `-`, `*`, `/`
  - `Enter` or `=` to calculate
  - `Escape` for all‑clear
  - `Backspace` for clear entry
- **Accessible focus & hover states** for better usability.

---

## Tech Stack

- **HTML5** – markup and semantic structure.
- **CSS3** – custom properties, grid layout, media queries.
- **JavaScript (ES6+)** – class‑based calculator logic, event handling.

---

## Setup

1. **Clone the repository** (or download the source files):
   ```bash
   git clone https://github.com/your-username/simple-calculator-webapp.git
   cd simple-calculator-webapp
   ```
2. **Open the app**:
   - Simply double‑click `index.html` to open it in your default browser, **or**
   - Serve the folder with a local HTTP server (recommended for some browsers):
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then navigate to http://localhost:8000 in your browser
     ```
3. No additional build steps or dependencies are required.

---

## Usage Guide

### Mouse / Touch Interaction
- Click the digit buttons (`0‑9`) to build a number.
- Use the `.` button for decimal values.
- Press an operator button (`+`, `‑`, `*`, `/`) to add it to the expression.
- Click `=` to evaluate and display the result.
- `C` clears the current entry (the number you are typing).
- `AC` clears the entire expression and resets the display to `0`.

### Keyboard Interaction
| Key | Action |
|-----|--------|
| `0‑9` | Append digit |
| `.` or `,` | Append decimal point |
| `+`, `-`, `*`, `/` | Set operator |
| `Enter` or `=` | Calculate |
| `Escape` | All clear (AC) |
| `Backspace` | Clear entry (C) |

---

## Development Overview

### File Structure
```
/simple-calculator-webapp
│   index.html      # HTML skeleton and layout
│   styles.css      # Responsive CSS styling
│   app.js          # Core JavaScript logic (Calculator class)
│   README.md       # Documentation (this file)
```

- **`index.html`** defines the markup, linking the stylesheet (`styles.css`) and script (`app.js`). It contains a container with a display area and a grid of buttons, each marked with `data-key` attributes for easy identification.
- **`styles.css`** provides visual styling, using CSS variables for colors, spacing, and font sizes. It sets up a grid layout for the buttons and includes a media query for mobile screens.
- **`app.js`** implements the `Calculator` class that manages the current input, expression stack, and evaluation logic (including operator precedence). It registers click listeners on all buttons and a global `keydown` listener for keyboard support. The class is also exposed on `window` for potential testing.

---

## License

*Add your preferred license here (e.g., MIT, Apache 2.0, etc.).*
