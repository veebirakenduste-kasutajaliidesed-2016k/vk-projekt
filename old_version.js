var map;
//TODO: set image size to mapSize, generate marker location and image locations randomly
//Get geocoder status
//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=street_address&key=AIzaSyCl5QWc_dxpap3_ITxjyq0s3MyB_V-xplI
function initMap() {
  var latitude;
  var longitude;
  var latlng;
  var mapSize = Math.round(screen.width/3).toString() + "x" + Math.round(screen.width/1.42).toString();
  var firstImage = document.getElementById('firstImage');
  var secondImage = document.getElementById('secondImage');
  var thirdImage = document.getElementById('thirdImage');
  function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  function getLatLong(){
    latitude =  randomInt(40, 70);
    longitude = randomInt(-10, 30);
    latlng = latitude.toString() + "," + longitude.toString();
  }
  //var latlng = lat.toStringUI + "," + long.toString();
  //var latlng = new google.maps.LatLng(latitude,longitude);
  //console.log("lat: "+ latitude.toString());
  //console.log("long: "+ longitude.toString());
  console.log(mapSize);
  checkAddress(latlng);
  //var geocoder = new google.maps.Geocoder;
  function streetView(maxDistance){
    var streetViewService = new google.maps.StreetViewService();
    streetViewService.getPanoramaByLocation(google_latlng, maxDistance, function (streetViewPanoramaData, status) {
      if (status === google.maps.StreetViewStatus.OK) {
          console.log(status);
          console.log("http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+latlng.toString()+"&fov=120&heading=235&pitch=10&sensor=false");
          firstImage.src = "http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+latlng.toString()+"&fov=120&heading=235&pitch=10&sensor=false";
      } 
      else {
        console.log("Streetview not available, increasing max distance");
        streetView(maxDistance + 10);
      }
    });
  }
  function checkAddress() {
    getLatLong();
    google_latlng = new google.maps.LatLng(latitude,longitude);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': google_latlng}, function(results, status) {
      //console.log(results);
      console.log(status);
      if(status != google.maps.GeocoderStatus.OK) {
        //checkAddress(latlng);
        setTimeout(function() {checkAddress();}, 200);
      }
      else if(status == google.maps.GeocoderStatus.OK) {
        console.log("lat: "+ latitude.toString());
        console.log("long: "+ longitude.toString());
        //console.log("http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+latlng.toString()+"&fov=120&heading=235&pitch=10&sensor=false");
        var marker = new google.maps.Marker({
          position: {lat: latitude, lng: longitude},
          map: map
        });
        streetView(50);

      }
    });
  }

  map = new google.maps.Map(document.getElementById('map'), {
    //center: {lat: -34.397, lng: 150.644},
    //center: {lat: latitude, lng:longitude},
    center: {lat: 0, lng:0},
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

  //Check that the first number in your latitude coordinate is between -90 and 90
  //and the first number in your longitude coordinate is between -180 and 180.
  
}
