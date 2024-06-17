const zoomableElement = document.getElementById('zoomableElement');
const img = zoomableElement.querySelector('img');
let scale = 1;
const scaleFactor = 0.1;
let isDragging = false;
let startX, startY, initialTranslateX = 0, initialTranslateY = 0;

zoomableElement.addEventListener('wheel', function (e) {
    e.preventDefault();

    const rect = zoomableElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (e.deltaY < 0) {
        // Zoom in
        scale += scaleFactor;
    } else {
        // Zoom out
        scale = Math.max(1, scale - scaleFactor);
    }

    img.style.transform = `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`;
});

zoomableElement.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('mousemove', function (e) {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        initialTranslateX += deltaX / scale;
        initialTranslateY += deltaY / scale;

        img.style.transform = `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`;

        startX = e.clientX;
        startY = e.clientY;
    }
});

window.addEventListener('mouseup', function () {
    isDragging = false;
});

zoomableElement.addEventListener('touchstart', function (e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    // e.preventDefault(); // Prevent default touch actions (like scrolling)
});

window.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        initialTranslateX += deltaX / scale;
        initialTranslateY += deltaY / scale;

        img.style.transform = `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    // e.preventDefault(); // Prevent default touch actions (like scrolling)
});

window.addEventListener('touchend', function () {
    isDragging = false;
});

// Prevent page zooming on touch devices
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();

    const rect = zoomableElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (e.deltaY < 0) {
        // Zoom in
        scale += scaleFactor;
    } else {
        // Zoom out
        scale = Math.max(1, scale - scaleFactor);
    }

    img.style.transform = `scale(${scale}) translate(${initialTranslateX}px, ${initialTranslateY}px)`;
});