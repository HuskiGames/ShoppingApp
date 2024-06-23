// Function to initialize the map
function initializeMap(latitude, longitude) {
    // Initialize the map and set its view to the specified coordinates
    var imageBounds = [[-35.029814, 138.535935], [-35.031489, 138.538885]]; // Example bounds
    var map = L.map('map', {attributionControl:false, zoomControl: false}).setView([latitude, longitude], 19);

    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 30, 
    }).addTo(map);

    // L.tileLayer('map.png', { 
    //     maxZoom: 30, 
    // }).addTo(map);


    L.imageOverlay('https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg', imageBounds).addTo(map);

    // Add a marker to the map at the specified GPS coordinates
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location')
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
            // initializeMap(latitude, longitude);
            initializeMap(-35.030281, 138.536907);
        },
        function(error) {
            // Error callback: handle errors here
            console.error("Error getting location: " + error.message);
            // Optionally initialize the map with a default location
            initializeMap(37.7749, -122.4194); // Example: San Francisco
        }
    );
} else {
    // Geolocation is not available: initialize the map with a default location
    console.error("Geolocation is not supported by this browser.");
    initializeMap(37.7749, -122.4194); // Example: San Francisco
}
