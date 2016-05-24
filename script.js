  
var map;
function initMap() {
  var latitude;
  var longitude;
  var latlng;
  //var mapSize = Math.round(screen.width/3).toString() + "x" + Math.round(screen.width/1.42).toString();
  var firstImage = document.getElementById('firstImage');
  var secondImage = document.getElementById('secondImage');
  var thirdImage = document.getElementById('thirdImage');
  var markerLat;
  var markerLong;
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getLatLong(){
    latitude =  getRandom(57.725, 59.52);
    longitude = getRandom(21.25, 28.5);
    latlng = latitude.toString() + "," + longitude.toString();
  }
  for(i=1;i<=3;i++){
    getLatLong();
    google_latLng = new google.maps.LatLng(latitude,longitude);
    if(i==1){
      markerLat = latitude;
      markerLong = longitude;
    }
    if(subMap(google_latLng, i)==0){
      console.log("Search failed");
    }        
  }
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng:longitude},
    zoom: 7,
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
  console.log(markerLat + ";" + markerLong);
  var marker = new google.maps.Marker({
    position: {lat: markerLat, lng: markerLong},
    map: map
  });
}
function subMap(google_latLng, count){
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getLatLong(){
    latitude =  getRandom(57.725, 59.52);
    longitude = getRandom(21.25, 28.5);
    latlng = latitude.toString() + "," + longitude.toString();
  }
  var radius = 10;
  var loopCount = 0;
  var streetViewService = new google.maps.StreetViewService();
  var mapSize = Math.round(screen.width/3.5).toString() + "x" + Math.round(screen.width/4).toString();
  var state = "";
  streetViewService.getPanoramaByLocation(google_latLng, radius, handler)
  function handler(data, status) {
    console.log(loopCount);
      if(loopCount == 300){
        loopCount = 0;
        getLatLong();
        google_latLng = new google.maps.LatLng(latitude,longitude);
        subMap(google_latLng, count);
      }
      if (status == google.maps.StreetViewStatus.OK) {
          console.log("Found");
          loopCount = 0;
          var nearStreetViewLocation = data.location.latLng;
          var coords = data.location.latLng.toString();
          coords = (coords.replace("(", "").replace(")", "")).split(", ");
          var url = "http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+coords[0] + "," +coords[1]+"&fov=120&heading=235&pitch=10&sensor=false";
          if(count == 1){
            firstImage.src=url;
                    
          }
          else if(count == 2){
            secondImage.src=url;
          }
          else if(count == 3){
            thirdImage.src=url;
          }
          count++;
          
        } 
        else{
          loopCount++;
          radius += 50;
          streetViewService.getPanoramaByLocation(google_latLng, radius, handler);
          //console.log("Trying again...");
        }
      };
      console.log("State: " + state);
      return(state);
}