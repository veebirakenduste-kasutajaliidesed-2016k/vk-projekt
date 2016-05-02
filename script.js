var map;
function initMap() {
  var mapSize = (screen.width/3).toString() + "," + (screen.witdh/1.42).toString();
  map = new google.maps.Map(document.getElementById('map'), {
    //center: {lat: -34.397, lng: 150.644},
    center: {lat: 40, lng:0},
    zoom: 2,
    disableDefaultUI: true,
    mapTypeControl: false,
    zoomControl: false,
    scaleControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: null,
    panControl: false

  });
  var marker = new google.maps.Marker({
  position: {lat: 10, lng: 15},
  map: map,
  title: 'Hello World!'
  });
}
