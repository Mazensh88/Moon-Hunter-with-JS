let markers = [];

let distance = 0;

function getTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let finalTime = hour + " : " + minutes + " : " + seconds;

  document.getElementById("time").innerHTML = "Time: " + finalTime;
}

function work() {
  // Implement logic here.
  getTime();
  
  moonSetTime()
    .then((resDa) => {
      document.getElementById("moonTime").innerHTML =
        "Moon set time is " + resDa.moonset;
    })
    .catch((err) => {
      console.log(err);
    });

  parseInt(document.getElementById("building_height").value);

  result();

  document.getElementById("distance").value = distance;
}

function setup() {
  // Register events
  eventHandler.register("dragend", onDragEvent);
  eventHandler.register("markerupdate", onMarkerUpdate);

  // Create markers
  createMarkers();
}

function createMarkers() {
  let markerA = new google.maps.Marker({
    map: map,
    draggable: true,
    label: "Marker A",
    animation: google.maps.Animation.DROP,
    position: { lat: -34.397, lng: 150.644 },
  });

  markers[markerA.label] = markerA;

  let markerB = new google.maps.Marker({
    map: map,
    draggable: true,
    label: "Marker B",
    animation: google.maps.Animation.DROP,
    position: { lat: -34, lng: 150 },
  });

  markers[markerB.label] = markerB;

  // Trigger event handlers for on drag end (DragEnd)
  google.maps.event.addListener(markerA, "dragend", function (event) {
    eventHandler.trigger("dragend", markerA, event);
  });

  google.maps.event.addListener(markerB, "dragend", function (event) {
    eventHandler.trigger("dragend", markerB, event);
  });

  setDistance();
}

function onMarkerUpdate() {
  let elements = Object.values(markers); // Get all values

  let distance = 0.04;

  let center = map.getCenter();

  let lat = center.lat();
  let lng = center.lng() - elements.length * (distance / 2);

  for (let i = 0; i < elements.length; i++) {
    let marker = elements[i];

    marker.setPosition(new google.maps.LatLng(lat, lng + distance * i));
  }

  setDistance();
}

function onDragEvent(marker, event) {
  // Update marker by name
  markers[marker.label] = marker;

  setDistance();
}

function setDistance() {
  // Calculate distance
  let elements = Object.values(markers);

  distance = google.maps.geometry.spherical.computeDistanceBetween(
    elements[0].getPosition(),
    elements[1].getPosition()
  );

  console.log(distance);
}

function result() {
  // distance is the opposite angle
  let height = parseInt(document.getElementById("building_height").value); // Adjacent angle
  
  // We find the hypotenuse using the pythagorean theorem

  let a = Math.sqrt(Math.pow(height, 2) + Math.pow(distance, 2));

  // finding the the missing angle using "Law of Cosines" (arcCosine)
  // (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)); Numerator
  // (2 * a * b); Denominator

  let missingAngle = Math.acos(
    (Math.pow(a, 2) + Math.pow(distance, 2) - Math.pow(height, 2)) / (2 * a * distance)
  );

  let degree = missingAngle * (180 / Math.PI);

  document.getElementById("angle").value = degree.toFixed(2) + " Degree";
}

function moonSetTime() {
  const API_KEY = "67458e9d671e48678bb2b16c74b5d85c";
  const URL = "https://api.ipgeolocation.io/astronomy";

  const Full_URL = `${URL}?apiKey=${API_KEY}&lat=40.7128&long=-73.935242`;

  const moonPromise = fetch(Full_URL);

  return moonPromise.then((response) => {
    return response.json();
  });
}