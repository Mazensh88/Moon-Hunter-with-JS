let eventHandler = MyEventHandler();

// Google maps script.
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 11,
  });
  
  setup();

  // Make the map center your current location.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setMapCenter);
  }
}

function setMapCenter(position) {
  let coords = position.coords;
  map.setCenter(new google.maps.LatLng(coords.latitude,
    coords.longitude));

  eventHandler.trigger("markerupdate");
}

// TypeIt script.

new TypeIt(".simpleUsage", {
    strings: "Welcome to Moon Hunter! This web app will help photographers to plan their shots to take a perfect picture of the moon aligning with a building or any other high object. All what you need to do is choose two points on the map then the app will calculate the time for you to take your shot.",
    speed: 50,
    waitUntilVisible: true,
  }).go();