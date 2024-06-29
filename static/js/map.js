function SignInButton_Clicked() {
    fname = fUsername.value;
    fpass = fPassword.value;

    $.ajax({
        type: 'POST',
        url: '/Signin',
        data: {name: fname, pass: fpass},
        success: function (response) {
            if (response.SigninCorrect) {
                document.getElementById("SignInPage").outerHTML = ""
            }
            SignedIn = true;
        }
    })
};

// Function to initialize the map
var imageBounds = [[-34.922321, 138.587503], [-34.934776, 138.617682]]; // Example bounds
var LocationAnchor = [-34.928794, 138.600047]

var MarkerImgFaded = L.icon({
    iconUrl: '/static/Images/App/MarkerImgFaded.png',  // Path to your red marker icon image
    iconSize: [20, 30],               // Size of the icon
    iconAnchor: [10, 30],             // Point of the icon which will correspond to marker's location
});

var MarkerImg = L.icon({
    iconUrl: '/static/Images/App/MarkerImg.png',  // Path to your red marker icon image
    iconSize: [20, 30],               // Size of the icon
    iconAnchor: [10, 30],             // Point of the icon which will correspond to marker's location
});

function initializeMap() {
    // Initialize the map and set its view to the specified coordinates
    var map = L.map('map', { attributionControl: false, zoomControl: false }).setView(LocationAnchor, 13);

    prevmarker = L.marker(LocationAnchor, { icon: MarkerImgFaded }).addTo(map).openPopup();
    marker = L.marker(LocationAnchor, { icon: MarkerImg }).addTo(map).openPopup();


    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
    }).addTo(map);

    L.tileLayer('', {
        maxZoom: 30,
    }).addTo(map);

    // L.imageOverlay('https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg', imageBounds).addTo(map);
    L.imageOverlay('static/Images/App/map.png', imageBounds).addTo(map);

    map.on('click', function (ev) {
        var latlng = map.mouseEventToLatLng(ev.originalEvent);
        console.log(latlng.lat + ', ' + latlng.lng);
        marker.setLatLng([latlng.lat, latlng.lng], { draggable: 'true' });
    });




    try {
        var lc = L.control.locate({ keepCurrentZoomLevel: true, enableHighAccuracy: true, }).addTo(map);
    }
    catch {
        console.log("locate not initialized")
    }
}


// Check if the Geolocation API is available
if (navigator.geolocation) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Success callback: get the coordinates and initialize the map
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            initializeMap();

        },
        function (error) {
            initializeMap();
            console.error("Error getting location: " + error.message);
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}
