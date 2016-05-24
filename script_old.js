  
var map;
function initMap() {
  var latitude;
  var longitude;
  var latlng;
  var mapSize = Math.round(screen.width/3.5).toString() + "x" + Math.round(screen.width/4).toString();
  //var mapSize = Math.round(screen.width/3).toString() + "x" + Math.round(screen.width/1.42).toString();
  var firstImage = document.getElementById('firstImage');
  var secondImage = document.getElementById('secondImage');
  var thirdImage = document.getElementById('thirdImage');
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getLatLong(){
    latitude =  getRandom(57.725, 59.52);
    longitude = getRandom(21.25, 28.5);
    latlng = latitude.toString() + "," + longitude.toString();
  }
    
    var radius = 10;
    var count = 1;
    var loopCount = 0;
    for(i = 1; i<4; i++){ //Mingil põhjusel crashib kõik ära?      
      console.log("#################");
      getLatLong();
      console.log(latitude + " ; " + longitude);
      console.log("#################");
      google_latLng = new google.maps.LatLng(latitude,longitude);
      var streetViewService = new google.maps.StreetViewService();
      streetViewService.getPanoramaByLocation(google_latLng, radius, handler1)
      function handler1(data, status) {
          if(loopCount == 500){
            loopCount = 0;
            return;
          }
          console.log(count);
          if (status == google.maps.StreetViewStatus.OK) {
              console.log("Found");
              var nearStreetViewLocation = data.location.latLng;
              var coords = data.location.latLng.toString();
              coords = (coords.replace("(", "").replace(")", "")).split(", ");
              var url = "http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+coords[0] + "," +coords[1]+"&fov=120&heading=235&pitch=10&sensor=false";
              if(count == 1){
                console.log("First circuit");
                firstImage.src=url;
                    var marker = new google.maps.Marker({
                      position: {lat: latitude, lng: longitude},
                      map: map
                    });
              }
              else if(count == 2){
                secondImage.src=url;
              }
              else if(count == 3){
                thirdImage.src=url;
              }
              count++;
          } else {
              loopCount++;
              radius += 50;
              streetViewService.getPanoramaByLocation(google_latLng, radius, handler1);
              console.log("Trying again...");
          }
      };
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
}