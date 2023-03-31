var popup = L.popup();
var points = []

// Runs on buttonpress
function buttonPress() {
    var polygon = L.polygon([
    [61.45886, 5.88614],
    [61.45897, 5.88665],
    [61.45884, 5.88676],
    [61.45872, 5.88627]
]).addTo(map);
}

// Runs when map is clicked
function onMapClick(e) {
    points.push(e.latlng)
    popup
    .setLatLng(e.latlng)
    .setContent(e.latlng.toString())
    .openOn(map);
} 

    var map = L.map('map').setView([61.45874, 5.88740], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function button_show() {
    points.forEach(element => {
        console.log(element)
    });
    var polygon = L.polygon(points).addTo(map)
}