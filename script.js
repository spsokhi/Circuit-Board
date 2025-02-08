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

// Draw complex circuit board components on the offscreen canvas
function drawCircuitBoard() {
    // Background color
    offscreenCtx.fillStyle = '#006a09'; // Dark green PCB-like background
    offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Background grid
    offscreenCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; // Faint white grid lines
    offscreenCtx.lineWidth = 1;

    for (let x = 0; x < offscreenCanvas.width; x += 10) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(x, 0);
        offscreenCtx.lineTo(x, offscreenCanvas.height);
        offscreenCtx.stroke();
    }

    for (let y = 0; y < offscreenCanvas.height; y += 10) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(0, y);
        offscreenCtx.lineTo(offscreenCanvas.width, y);
        offscreenCtx.stroke();
    }

    // Draw dense wires
    offscreenCtx.strokeStyle = 'rgba(0, 0, 0, 0.8)'; // Blackish wires
    offscreenCtx.lineWidth = 2;

    for (let i = 0; i < 100; i++) {
        const x1 = Math.random() * offscreenCanvas.width;
        const y1 = Math.random() * offscreenCanvas.height;
        const x2 = x1 + (Math.random() - 0.5) * 400;
        const y2 = y1 + (Math.random() - 0.5) * 400;

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(x1, y1);
        offscreenCtx.lineTo(x2, y2);
        offscreenCtx.stroke();
    }

    // Draw vias (small circles)
    offscreenCtx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Dimmer vias
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.beginPath();
        offscreenCtx.arc(x, y, 2, 0, Math.PI * 2);
        offscreenCtx.fill();
    }

    // Draw resistors
    offscreenCtx.fillStyle = 'rgba(139, 69, 19, 0.8)'; // Brown resistors
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 10, 20);
    }

    // Draw capacitors
    offscreenCtx.fillStyle = 'rgba(128, 128, 128, 0.8)'; // Gray capacitors
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 15, 10);
    }

    // Draw ICs
    offscreenCtx.fillStyle = 'rgba(128, 128, 128, 0.8)'; // Gray ICs
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 60, 30);

        // Add pins to ICs
        offscreenCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let pin = 0; pin < 12; pin++) {
            offscreenCtx.fillRect(x + pin * 5, y - 5, 3, 5); // Top pins
            offscreenCtx.fillRect(x + pin * 5, y + 30, 3, 5); // Bottom pins
        }
    }
}

// Draw the circuit board initially
drawCircuitBoard();

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the static circuit board from the offscreen canvas
    ctx.drawImage(offscreenCanvas, 0, 0);

    // Add radial gradient mask for torch effect
    const gradient = ctx.createRadialGradient(e.pageX, e.pageY, 0, e.pageX, e.pageY, 200); // Torch radius
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Fully transparent inside torch
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Fully opaque outside torch

    // Apply the mask
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
});

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    drawCircuitBoard();
});