// Select elements
const canvas = document.getElementById('circuit-board');
const textElement = document.querySelector('.center-text');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get canvas context
const ctx = canvas.getContext('2d');

// Create offscreen canvas for static circuit board
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
const offscreenCtx = offscreenCanvas.getContext('2d');

// Function to draw a realistic circuit board
function drawCircuitBoard() {
    // Background color
    offscreenCtx.fillStyle = '#003b00'; // Dark green PCB
    offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Grid pattern
    offscreenCtx.strokeStyle = 'rgba(0, 255, 0, 0.1)'; // Faint green grid lines
    offscreenCtx.lineWidth = 1;

    for (let x = 0; x < offscreenCanvas.width; x += 40) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(x, 0);
        offscreenCtx.lineTo(x, offscreenCanvas.height);
        offscreenCtx.stroke();
    }

    for (let y = 0; y < offscreenCanvas.height; y += 40) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(0, y);
        offscreenCtx.lineTo(offscreenCanvas.width, y);
        offscreenCtx.stroke();
    }

    // Copper traces (wires)
    offscreenCtx.strokeStyle = 'rgba(255, 165, 0, 0.8)'; // Copper color
    offscreenCtx.lineWidth = 2;

    for (let i = 0; i < 40; i++) {
        const startX = Math.random() * offscreenCanvas.width;
        const startY = Math.random() * offscreenCanvas.height;
        const endX = startX + (Math.random() < 0.5 ? -150 : 150);
        const endY = startY + (Math.random() < 0.5 ? -150 : 150);

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(startX, startY);
        offscreenCtx.lineTo(endX, endY);
        offscreenCtx.stroke();
    }

    // Vias (small connection points)
    offscreenCtx.fillStyle = 'rgba(0, 255, 0, 0.6)'; // Glowing green vias
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.beginPath();
        offscreenCtx.arc(x, y, 3, 0, Math.PI * 2);
        offscreenCtx.fill();
    }

    // Electronic components (resistors, capacitors, ICs)
    offscreenCtx.fillStyle = 'rgba(139, 69, 19, 0.8)'; // Brown for resistors
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 10, 20);
    }

    offscreenCtx.fillStyle = 'rgba(128, 128, 128, 0.8)'; // Gray capacitors
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 15, 10);
    }

    offscreenCtx.fillStyle = 'rgba(80, 80, 80, 0.9)'; // Darker gray ICs
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 60, 30);
    }
}

// Draw the static circuit board once
drawCircuitBoard();

// Mouse move effect
document.addEventListener('mousemove', (e) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the static board
    ctx.drawImage(offscreenCanvas, 0, 0);

    // Create radial gradient for "torch" effect
    const gradient = ctx.createRadialGradient(e.pageX, e.pageY, 0, e.pageX, e.pageY, 200);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparent at center
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.5)'); // Darker edges
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Full black outside

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Check if torch is near the text
    const textRect = textElement.getBoundingClientRect();
    if (
        e.pageX > textRect.left &&
        e.pageX < textRect.right &&
        e.pageY > textRect.top &&
        e.pageY < textRect.bottom
    ) {
        textElement.classList.add('torch-hover');
    } else {
        textElement.classList.remove('torch-hover');
    }
});

// Resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    drawCircuitBoard();
});