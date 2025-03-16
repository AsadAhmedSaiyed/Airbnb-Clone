document.addEventListener("DOMContentLoaded", function () {
    console.log("Initializing Leaflet Map...");
    console.log("Listing Data:", listingData);

    var defaultCoordinates = [28.6139, 77.2090]; // New Delhi (Default Location)
    var coordinates = listingData?.geometry?.coordinates;

    var lat = coordinates && coordinates.length === 2 ? coordinates[1] : defaultCoordinates[0];
    var lng = coordinates && coordinates.length === 2 ? coordinates[0] : defaultCoordinates[1];

    console.log("Latitude:", lat, "Longitude:", lng);

    var map = L.map("map").setView([lat, lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Custom Red Marker Icon
    var redIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Add Marker with Popup
    var marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

    // Popup content with title
    var title = listingData?.title || "Listing Location";
    var popupContent = `<b>${title}</b><br>Exact location will be provided after booking`;

    marker.bindPopup(popupContent).openPopup(); // Open popup by default

    console.log("Map successfully initialized!");
});




