//Todo: loopCounter ei nulli ennast õigesti, pildid kuvada suvalises järjekorras, valiku tegemine ja skoori lugemine
//Skoori lugemine(Localstorage: DONE, AJAX: WIP)
//Valiku tegemine: DONE, Suvaline järjekord: DONE
//Map markeri vees oleku vältimiseks kas kontroll või kaardi koomale võtmine, load'imis aja lühendamine?
//Vees oleku vältimine: DONE, Load aegade lühendamine: DONE
//"Playing field" ära katta kuni kõik pildid on laetud. Kontrollida, kas funktsioon on lõppenud? DONE
var map;
var found = 0;
var correctImage;
var firstUrl;
var secondUrl;
var thirdUrl;
var latitude;
var longitude;
var latlng;
var correctGuesses = localStorage.correct;
var falseGuesses = localStorage.false;
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function getLatLong(){
    latitude =  getRandom(57.946565, 59.497743);
    longitude = getRandom(23.675537, 27.388916);
    latlng = latitude.toString() + "," + longitude.toString();
}
function initMap() {
  //var mapSize = Math.round(screen.width/3).toString() + "x" + Math.round(screen.width/1.42).toString();
  var firstImage = document.getElementById('firstImage');
  var secondImage = document.getElementById('secondImage');
  var thirdImage = document.getElementById('thirdImage');
  var scoreCounter = document.getElementById("Score");
  Score.innerHTML= (localStorage.correctGuesses).toString() + ":" + (localStorage.falseGuesses).toString()
  var markerLat;
  var markerLong;
  function checkAnswer(imageNr){
    if(imageNr == correctImage){
      window.alert("Correct");
      if (localStorage.correctGuesses) {
        localStorage.correctGuesses = Number(localStorage.correctGuesses) + 1;
      }
      else{
        localStorage.correctGuesses = 1;
      }
    }
    else{
      window.alert("False");
      if (localStorage.falseGuesses) {
        localStorage.falseGuesses = Number(localStorage.falseGuesses) + 1;
      }
      else{
        localStorage.falseGuesses = 1;
      }
    }
    location.reload();
  }
  function checkAddress(google_latLng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': google_latLng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        return 1;
      }
      else{
        return 0;
      }
    });
  }
  for(i=1;i<=3;i++){
    getLatLong();
    google_latLng = new google.maps.LatLng(latitude,longitude);
    if(i==1){
      if(checkAddress(google_latLng)==0){
        console.log("Meres?");
        }
      markerLat = latitude;
      markerLong = longitude;
    }
    subMap(google_latLng, i)          
  }
  
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng:longitude},
    zoom: 6,
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
  console.log(correctImage);
  firstImage.onclick = function() {
    checkAnswer(firstImage);
  };
  secondImage.onclick = function() {
    checkAnswer(secondImage);    
  };
  thirdImage.onclick = function() {
    checkAnswer(thirdImage);
  };
}
var loopCount = 0;
function subMap(google_latLng, count){
  var images = [firstImage, secondImage, thirdImage];
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
  images = shuffleArray(images);
  correctImage = images[0];
  var loadingScreen = document.getElementById('loadingScreen');
  var radius = 10;
  var streetViewService = new google.maps.StreetViewService();
  var mapSize = Math.round(screen.width/3.5).toString() + "x" + Math.round(screen.width/4).toString();
  streetViewService.getPanoramaByLocation(google_latLng, radius, handler)
  function handler(data, status) {
    console.log(loopCount);
      if(loopCount == 50){
        loopCount = 0;
        getLatLong();
        google_latLng = new google.maps.LatLng(latitude,longitude);
        subMap(google_latLng, count);
      }
      else if (status == google.maps.StreetViewStatus.OK) {
          console.log("Image found");
          loopCount = 0;
          var nearStreetViewLocation = data.location.latLng;
          var coords = data.location.latLng.toString();
          coords = (coords.replace("(", "").replace(")", "")).split(", ");
          var url = "http://maps.googleapis.com/maps/api/streetview?size="+mapSize.toString()+"&location="+coords[0] + "," +coords[1]+"&fov=120&heading=235&pitch=10&sensor=false";
          if(count == 1){
            firstUrl = url;
            found++;                    
          }
          else if(count == 2){
            secondUrl = url;
            found++;
          }
          else if(count == 3){
            thirdUrl = url;
            found++;
          }
          count++;
          if(found == 3){ //All three images have loaded
            images[0].src=firstUrl;
            images[1].src=secondUrl;
            images[2].src=thirdUrl;
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        } 
        else{
          loopCount++;
          radius += 50;
          streetViewService.getPanoramaByLocation(google_latLng, radius, handler);
        }
      };
}