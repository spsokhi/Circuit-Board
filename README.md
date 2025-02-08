# Circuit Board Visualization

## Overview

This project creates an interactive and visually appealing simulation of a circuit board. The user can move their mouse over the canvas to reveal parts of the circuit board using a "torchlight" effect, while also interacting with a glowing text in the center.

---

## Features

1. **Realistic Circuit Board Design**:
   - A dark green PCB background with faint grid lines.
   - Copper traces (wires) connecting random points on the board.
   - Small glowing vias (connection points) scattered across the board.
   - Electronic components like resistors, capacitors, and ICs randomly placed for authenticity.

2. **Interactive Torchlight Effect**:
   - As the user moves their mouse, a radial gradient "torchlight" reveals parts of the circuit board.
   - The torchlight dims outwards, creating a realistic lighting effect.

3. **Glowing Text Interaction**:
   - The text "CIRCUIT BOARD" is centered on the screen.
   - When the torchlight hovers over the text, it glows with a vibrant green effect.

4. **Responsive Design**:
   - The canvas dynamically adjusts to the browser window size, ensuring the circuit board and effects work seamlessly on any screen.

5. **Custom Cursor**:
   - The default cursor is hidden to enhance immersion, allowing the torchlight effect to act as the primary interaction tool.

---

## File Structure

```
project/
│
├── index.html       # Main HTML file that sets up the structure of the page.
├── styles.css       # CSS file for styling the page and defining animations.
├── script.js        # JavaScript file containing logic for rendering the circuit board and interactions.
└── README.md        # This file, providing an overview of the project.
```

---

## How It Works

### 1. **HTML (`index.html`)**
   - The HTML file defines the basic structure of the page:
     - A `<canvas>` element for rendering the circuit board.
     - A centered `<div>` for displaying the "CIRCUIT BOARD" text.
   - Links to the `styles.css` and `script.js` files ensure proper styling and functionality.

### 2. **CSS (`styles.css`)**
   - Styles the body to remove margins and padding, centering the text and canvas.
   - Defines the glowing effect for the text when the torchlight interacts with it.
   - Ensures the canvas covers the entire viewport and hides the default cursor.

### 3. **JavaScript (`script.js`)**
   - **Canvas Setup**:
     - Dynamically resizes the canvas to match the browser window dimensions.
     - Uses an offscreen canvas to pre-render the static circuit board for performance optimization.
   - **Circuit Board Drawing**:
     - Renders a dark green background, grid lines, copper traces, vias, and electronic components.
   - **Torchlight Effect**:
     - Listens for `mousemove` events to create a radial gradient that simulates a flashlight.
     - Checks if the torchlight is near the text to trigger the glowing effect.
   - **Responsive Behavior**:
     - Handles window resizing to redraw the circuit board and maintain interactivity.

---

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/spsokhi/Circuit-Board.git
   cd Circuit-Board
   ```

2. **Open in Browser**:
   - Simply open the `index.html` file in your preferred web browser.
   - No additional setup or dependencies are required.

---

## Customization

### 1. **Modify the Circuit Board Design**
   - Open `script.js` and adjust the following:
     - **Background Color**: Change the `fillStyle` for the PCB background.
     - **Grid Lines**: Modify the `strokeStyle` or spacing of the grid lines.
     - **Components**: Adjust the number, size, or color of resistors, capacitors, and ICs.

### 2. **Adjust the Torchlight Effect**
   - In `script.js`, tweak the radial gradient parameters in the `mousemove` event listener:
     - Change the radius (`200`) to make the torchlight larger or smaller.
     - Modify the `rgba` values to alter the intensity or color of the light.

### 3. **Styling the Text**
   - In `styles.css`, customize the `.center-text` class:
     - Change the font size, color, or shadow properties to suit your preferences.

---

## Dependencies

This project does not require any external libraries or frameworks. It uses plain HTML, CSS, and JavaScript.

---

## Browser Compatibility

The project has been tested on modern browsers, including:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

Ensure your browser supports HTML5 Canvas and CSS transitions for the best experience.

---

## Future Enhancements

1. **Add More Components**:
   - Include additional electronic components like diodes, transistors, or LEDs.

2. **Interactive Elements**:
   - Allow users to click on components to display information or animations.

3. **Sound Effects**:
   - Add subtle sound effects when hovering over components or text.

4. **Mobile Support**:
   - Implement touch-based interactions for mobile devices.

---

## Credits

Created by Sukhpreet Singh.
For questions or feedback, please contact: gs.spsokhi@gmail.com