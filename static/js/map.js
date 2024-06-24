// Function to initialize the map
function initializeMap(latitude, longitude) {
    // Initialize the map and set its view to the specified coordinates
    var imageBounds = [[-35.018468662418, 138.5747006715697], [-35.01919424949473, 138.57585035805033]]; // Example bounds
    var map = L.map('map', {attributionControl:false, zoomControl: false}).setView([latitude, longitude], 19);

    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 30, 
    }).addTo(map);

    L.tileLayer('', { 
        maxZoom: 30, 
    }).addTo(map);


    // L.imageOverlay('https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg', imageBounds).addTo(map);
    L.imageOverlay('static/Images/map2.png', imageBounds).addTo(map);

    // Add a marker to the map at the specified GPS coordinates
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('')
        .openPopup();
}

// Check if the Geolocation API is available
if (navigator.geolocation) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Success callback: get the coordinates and initialize the map
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            initializeMap(latitude, longitude);
            // initializeMap(-35.030281, 138.536907);
        },
        function(error) {
            console.error("Error getting location: " + error.message);
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}
