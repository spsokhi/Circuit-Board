// Select elements
const canvas = document.getElementById('circuit-board');

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

// Draw circuit board components on the offscreen canvas
function drawCircuitBoard() {
    // Background grid
    offscreenCtx.strokeStyle = 'rgba(0, 255, 0, 0.1)'; // Faint green grid lines
    offscreenCtx.lineWidth = 1;

    for (let x = 0; x < offscreenCanvas.width; x += 20) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(x, 0);
        offscreenCtx.lineTo(x, offscreenCanvas.height);
        offscreenCtx.stroke();
    }

    for (let y = 0; y < offscreenCanvas.height; y += 20) {
        offscreenCtx.beginPath();
        offscreenCtx.moveTo(0, y);
        offscreenCtx.lineTo(offscreenCanvas.width, y);
        offscreenCtx.stroke();
    }

    // Draw wires
    offscreenCtx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
    offscreenCtx.lineWidth = 2;

    for (let i = 0; i < 100; i++) {
        const x1 = Math.random() * offscreenCanvas.width;
        const y1 = Math.random() * offscreenCanvas.height;
        const x2 = x1 + (Math.random() - 0.5) * 300;
        const y2 = y1 + (Math.random() - 0.5) * 300;

        offscreenCtx.beginPath();
        offscreenCtx.moveTo(x1, y1);
        offscreenCtx.lineTo(x2, y2);
        offscreenCtx.stroke();
    }

    // Draw vias (small circles)
    offscreenCtx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // White dots for vias
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.beginPath();
        offscreenCtx.arc(x, y, 2, 0, Math.PI * 2);
        offscreenCtx.fill();
    }

    // Draw resistors
    offscreenCtx.fillStyle = 'rgba(255, 0, 0, 0.6)'; // Red rectangles for resistors
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 10, 20);
    }

    // Draw capacitors
    offscreenCtx.fillStyle = 'rgba(0, 0, 255, 0.6)'; // Blue rectangles for capacitors
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 15, 10);
    }

    // Draw ICs
    offscreenCtx.fillStyle = 'rgba(255, 255, 0, 0.6)'; // Yellow rectangles for ICs
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * offscreenCanvas.width;
        const y = Math.random() * offscreenCanvas.height;
        offscreenCtx.fillRect(x, y, 40, 20);

        // Add pins to ICs
        offscreenCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let pin = 0; pin < 8; pin++) {
            offscreenCtx.fillRect(x + pin * 5, y - 5, 3, 5); // Top pins
            offscreenCtx.fillRect(x + pin * 5, y + 20, 3, 5); // Bottom pins
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

    // Add radial gradient mask with increased radius
    const gradient = ctx.createRadialGradient(e.pageX, e.pageY, 0, e.pageX, e.pageY, 250); // Increased radius
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Apply the mask
    ctx.globalCompositeOperation = 'destination-in';
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

// Dynamic torch intensity based on mouse speed
let lastX = 0;
let lastY = 0;
let lastTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const timeDiff = now - lastTime;
    const distance = Math.sqrt(Math.pow(e.pageX - lastX, 2) + Math.pow(e.pageY - lastY, 2));
    const speed = distance / timeDiff;

    // Adjust gradient radius based on speed
    const radius = Math.min(250 + speed * 10, 500); // Cap the radius at 500

    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the static circuit board from the offscreen canvas
    ctx.drawImage(offscreenCanvas, 0, 0);

    // Add radial gradient mask with dynamic radius
    const gradient = ctx.createRadialGradient(e.pageX, e.pageY, 0, e.pageX, e.pageY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Apply the mask
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Update last positions and time
    lastX = e.pageX;
    lastY = e.pageY;
    lastTime = now;
});