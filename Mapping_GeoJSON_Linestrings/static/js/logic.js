// Add console.log to check to see if our code is working.
console.log("working");




// We create the tile layer that will be the background of our map.
let nightNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

console.log("base tile layer")

// We create the dark view tile layer that will be an option for our map.
let dayNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

console.log("dark tile")
// Create a base layer that holds both maps.
let baseMaps = {
    Dark: nightNav,
    Light: dayNav
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [nightNav]
})
  
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// the add the 'streeets tile layer to the map
nightNav.addTo(map);


// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/dh4rt/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

console.log("torontoRoutes")

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

console.log("myStyle")
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

      color: "#ffffa1",
      weight: 2,
      onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><he> Airport name:" + feature.properties.dst + "</h3>")
      }
    })   
// Then we add our 'graymap' tile layer to the map.
.addTo(map);
});