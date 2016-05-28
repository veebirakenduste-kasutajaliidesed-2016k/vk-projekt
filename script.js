var found = 0;
var correctImage;

function initMap() {
  var firstImage = document.getElementById('firstImage');
  var secondImage = document.getElementById('secondImage');
  var thirdImage = document.getElementById('thirdImage');
  var scoreCounter = document.getElementById("Score");
  LatLng = new getLatLong();
  var markerLat;
  var markerLong;
  getData();

  function getData(){
         function data(user, correct, wrong){
            this.user = user;
            this.correct = correct;
            this.wrong = wrong;
         }
         localData = new data(localStorage.user, localStorage.correct, localStorage.wrong);
         var cookieUser = document.cookie.split("=")[1];
         if(cookieUser != localData.user){
          alert("New user");
          localStorage.clear();
          localStorage.user = cookieUser;
          localData.user = localStorage.user;
         }
         var xhttp = new XMLHttpRequest();
         var result;
         xhttp.onreadystatechange = function() {
            console.log("XHTTP: " +localData.user);
           if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("xhttp.status ==200");
             result =JSON.parse(xhttp.responseText);
             var contains = false;
             try{
                
               for(i = 0; i<result.length; i++){
                if(result[i].user == localData.user){
                  contains = true;
                  console.log("Kasutaja listis");
                  serverData = new data(result[i].user, result[i].correct, result[i].wrong);
                  if(serverData.correct > localData.correct){
                    localData.correct = serverData.correct;
                  }
                  else if(serverData.wrong > localData.wrong){
                    console.log("Serverdata larger: " +serverData.wrong);
                    localData.wrong = serverData.wrong;
                  }
                  console.log("Score: " + localData.wrong);
                  Score.innerHTML= (localData.correct).toString() + ":" + (localData.wrong).toString();
                  sendData(localData);
                }
              }
              if(contains===false){
                console.log("Kasutaja " + localData.user + " pole veel nimekirjas");
                localData.correct = 1;
                localData.wrong = 1;
                sendData(localData);
              }
            }
            catch(err){
              console.log("Error with list");
            }
          }
        };
        xhttp.open("GET", "saveData.php", true);
        xhttp.send();
      
    

  }

  function sendData(localData){
  console.log("sendData: " + localData.user);
  var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
         if (xhttp.readyState == 4 && xhttp.status == 200) {

         }
       };
       if(localData.user != "empty"){
        console.log("saveData.php?user="+localData.user+"&correct=" +localData.correct+"&wrong=" +localData.wrong);
        xhttp.open("GET", "saveData.php?user="+localData.user+"&correct=" +localData.correct+"&wrong=" +localData.wrong, true);
        }
        else{
          console.log("saveData.php?user=empty");
          xhttp.open("GET", "saveData.php?user=empty", true);
        }
       
       xhttp.send();
  }

  function checkAnswer(imageNr){  
    if(imageNr == correctImage){
      window.alert("Correct");
      if (localStorage.correct) {
        localStorage.correct = Number(localStorage.correct) + 1;
      }
      else{
        localStorage.correct = 1;
      }
    }
    else{
      window.alert("False");
      if (localStorage.wrong) {
        localStorage.wrong = Number(localStorage.wrong) + 1;
      }
      else{
        localStorage.wrong = 1;
      }
    }
    location.reload();
  }

  for(i=1;i<=3;i++){
     LatLng = new getLatLong();
    if(i==1){
      markerLat = LatLng.latitude;
      markerLong = LatLng.longitude;
    }
    subMap(LatLng, i)          
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: LatLng.latitude, lng:LatLng.longitude},
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
function getLatLong(){
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
    this.latitude  = getRandom(57.946565, 59.497743);
    this.longitude = getRandom(23.675537, 27.388916);
    this.google = new google.maps.LatLng(this.latitude,this.longitude);
}
function subMap(LatLng, count){
  var loopCount = 0;
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
  streetViewService.getPanoramaByLocation(LatLng.google, radius, handler);
  function handler(data, status) {
    console.log(loopCount);
      if(loopCount == 50){
        loopCount = 0;
        LatLng = new getLatLong();
        subMap(LatLng, count);
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
            loadingScreen.style.display = "none";
          }
        } 
        else{
          loopCount++;
          radius += 50;
          streetViewService.getPanoramaByLocation(LatLng.google, radius, handler);
        }
      };
}