// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// the add the 'streeets tile layer to the map
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/dh4rt/Mapping_Earthquakes/main/majorAirports.json";


//grabbing d3 GeoJSON URL
d3.json(airportData).then(function(data) {
    console.log(data);
    //creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        color: "#ffffa1",
        weight: 2,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airport code: " + feature.properties.faa + "</h3> <hr><he> Airport name:" + feature.properties.name + "</h3>")
        }
    }).addTo(map);
});


// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
//    "type":"Feature",
//    "properties":{
//        "id":"3469",
//        "name":"San Francisco International Airport",
//        "city":"San Francisco",
//        "country":"United States",
//        "faa":"SFO",
//        "icao":"KSFO",
//        "alt":"14",
//        "tz-offset":"-8",
//        "dst":"A",
//        "tz":"America/Los_Angeles"},
//        "geometry":{
//            "type":"Point",
//            "coordinates":[-122.375,37.61899948120117]}}
//]};

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport,{
    // We turn each feature into a marker on the map.
   // pointToLayer: function(feature, latlng) {
   //     console.log(feature);
   //     return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "</h2>", "<h3>" + feature.properties.city.country + "</h3>");
   //   }

  // onEachFeature: function(feature, layer) {
  //  console.log(layer);
  //  layer.bindPopup("<h3>" + feature.properties.faa + "</h3> <hr><h3> " + feature.properties.name + "</he>" );
  // }
  
//}).addTo(map);





// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);