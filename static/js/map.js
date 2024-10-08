// Function to initialize the map
// var imageBounds = [[-34.922321, 138.587503], [-34.934776, 138.617682]]; // Example bounds

var map

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

var prevmarker
var marker

function initializeMap(topleft, topright, bottomleft, LocationAnchor) {

    // Initialize the map and set its view to the specified coordinates
    map = L.map('map', {minZoom: 15, attributionControl: false, zoomSnap: 0.5 ,zoomControl: false }).setView(LocationAnchor, 15.25);

    prevmarker = L.marker(LocationAnchor, { icon: MarkerImgFaded }).addTo(map).openPopup();
    marker = L.marker(LocationAnchor, { icon: MarkerImg }).addTo(map).openPopup();

    map.setMaxBounds(map.getBounds());

    // Add a tile layer to the map (OpenStreetMap tiles)
    // L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=uEw6K2g4MF3aMGRzDjul', {
    //     maxZoom: 30,
    // }).addTo(map);

    L.tileLayer('', {
        maxZoom: 30,
    }).addTo(map);


    var overlay = L.imageOverlay.rotated("static/Images/App/Map.png", topleft, topright, bottomleft, {
        opacity: 1,
        interactive: true,
        attribution: "&copy; <a href='http://www.ign.es'>Instituto Geográfico Nacional de España</a>"
    }).addTo(map);

    // L.imageOverlay('https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg', imageBounds).addTo(map);
    // L.imageOverlay('static/Images/App/Map.png', imageBounds).addTo(map);

    map.on('click', function (ev) {
        if (document.getElementById("AdminControls").hasAttribute("hidden") == false) {
            var latlng = map.mouseEventToLatLng(ev.originalEvent);
            console.log(latlng.lat + ', ' + latlng.lng);
            localStorage.setItem('NewConfirmMarkerLocation_x', latlng.lat);
            localStorage.setItem('NewConfirmMarkerLocation_y', latlng.lng);
            marker.setLatLng([latlng.lat, latlng.lng], { draggable: 'true' });    
        }
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

            $.ajax({
                type: 'POST',
                url: '/GetShopData',
                success: function (response) {
                    console.log()
                    var topleft = response.topleft
                    var topright = response.topright
                    var bottomleft = response.bottomleft
                    var LocationAnchor = response.LocationAnchor
                    topleft = L.latLng(topleft.split(", ")[0], topleft.split(", ")[1])
                    topright = L.latLng(topright.split(", ")[0], topright.split(", ")[1])
                    bottomleft = L.latLng(bottomleft.split(", ")[0], bottomleft.split(", ")[1])
                    LocationAnchor = L.latLng(LocationAnchor.split(", ")[0], LocationAnchor.split(", ")[1])
                    initializeMap(topleft, topright, bottomleft, LocationAnchor);
                }
            })
        },
        function (error) {
            $.ajax({
                type: 'POST',
                url: '/GetShopData',
                success: function (response) {
                    var topleft = response.topleft
                    var topright = response.topright
                    var bottomleft = response.bottomleft
                    var LocationAnchor = response.LocationAnchor
                    topleft = L.latLng(topleft.split(", ")[0], topleft.split(", ")[1])
                    topright = L.latLng(topright.split(", ")[0], topright.split(", ")[1])
                    bottomleft = L.latLng(bottomleft.split(", ")[0], bottomleft.split(", ")[1])
                    LocationAnchor = L.latLng(LocationAnchor.split(", ")[0], LocationAnchor.split(", ")[1])
                    initializeMap(topleft, topright, bottomleft, LocationAnchor);
                }
            })
            console.error("Error getting location: " + error.message);
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}



function UpdateLocation() {
    if (localStorage.getItem('Update Marker') > 0) {
        localStorage.setItem('Update Marker', localStorage.getItem('Update Marker') - 1)

        const x = JSON.parse(localStorage.getItem('MarkerLocation_x'));
        const y = JSON.parse(localStorage.getItem('MarkerLocation_y'));

        map.setView([x, y], 16);

        console.log(x + " " + y);
        marker.setLatLng([x, y], { draggable: 'true' });
        prevmarker.setLatLng([x, y], { draggable: 'true' });    
    }
}

setInterval(UpdateLocation, 100);