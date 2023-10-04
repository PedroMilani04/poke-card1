const container = document.getElementById('container');
const card = document.getElementById('card');
const body = document.body;
let isExpanded = false;
let isHoverEnabled = true;
let lastTouchTimestamp = 0;
const DOUBLE_CLICK_THRESHOLD = 300; // Adjust this threshold as needed (in milliseconds)

// Function to toggle card expansion and background color change
function toggleCardExpansion() {
    if (!isExpanded) {
        card.style.transform = 'scale(1.4)'; // Increase size
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fade background to gray
        isHoverEnabled = false; // Disable hover effect transforms when expanded
    } else {
        card.style.transform = 'scale(1)'; // Reset size
        body.style.backgroundColor = '#fff'; // Reset background color
        isHoverEnabled = true; // Enable hover effect transforms when collapsed
    }

    isExpanded = !isExpanded;
}

// Function to handle double click on touch devices
function handleDoubleClick() {
    const currentTimestamp = Date.now();
    if (currentTimestamp - lastTouchTimestamp <= DOUBLE_CLICK_THRESHOLD) {
        // If the time difference between two touches is less than the threshold, it's a double click
        toggleCardExpansion();
    }
    lastTouchTimestamp = currentTimestamp;
}

// Add a click event listener to the container to toggle expansion and background change
container.addEventListener('click', toggleCardExpansion);

// Add touch event listeners to the container for double-click detection
container.addEventListener('touchstart', handleDoubleClick);

const cardCenterX = card.offsetWidth / 2;
const cardCenterY = card.offsetHeight / 2;

function handleMove(e) {
    // Check if hover effect transforms should be applied
    if (!isHoverEnabled) return;

    const event = e.touches ? e.touches[0] : e; // Use the first touch if available, or the mouse event

    // Calculate the position of the touch/mouse relative to the card's center
    const mouseX = (event.clientX - card.getBoundingClientRect().left) - cardCenterX;
    const mouseY = (event.clientY - card.getBoundingClientRect().top) - cardCenterY;

    // Calculate the rotation angles based on the touch/mouse position
    const tiltX = (mouseY / cardCenterY) * 30; // Tilt up or down
    const tiltY = -(mouseX / cardCenterX) * 30; // Tilt left or right

    // Calculate the translation based on the touch/mouse position
    const translateZ = isExpanded ? 100 : 50; // Adjust the depth effect based on your preference

    // Apply the rotation and translation using CSS transform property
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${translateZ}px)`;

    // Calculate the shadow position based on the tilt angles
    const shadowX = -tiltY; // Adjust the shadow position based on your preference
    const shadowY = 0; // Set shadowY to 0 to remove top and bottom shadow

    // Apply the shadow using box-shadow property
    card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.4)`;
}

// Add event listeners for both mousemove and touchmove
container.addEventListener('mousemove', handleMove);
container.addEventListener('touchmove', handleMove);

// Reset the card's rotation, translation, and shadow when the mouse or touch leaves the container
function handleLeave() {
    // Check if the card is expanded before resetting
    if (!isExpanded) {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
    }
}

container.addEventListener('mouseleave', handleLeave);
container.addEventListener('touchend', handleLeave);
