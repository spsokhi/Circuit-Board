// Select the torch element
const torch = document.querySelector('.torch');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Update torch position based on mouse coordinates
    torch.style.left = e.pageX + 'px';
    torch.style.top = e.pageY + 'px';
});