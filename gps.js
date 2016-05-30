function initMap() {
  // Initialize the Google Maps API v3
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = null;
  var timeout;
  startTracking();

/////////////UPDATING////////////

  function startTracking() {

      if(localStorage.crds){
          //võtan stringi ja teen tagasi objektideks
          var crds = JSON.parse(localStorage.crds);
          console.log('laadisin localStorageist massiivi ' + crds.length + ' koordinaati');
      }else{
      console.log("ei saa kätte koordinaate localstorage'ist");
      }

      var i = 1;
      function myLoop () {
         setTimeout(function () {
           document.getElementById("begin").addEventListener("click", function(){i = 1;});
           console.log("punkt number " + i + " / " + (crds.length - 1));
           console.log('data: ' + crds[i].latitude + ' ' + crds[i].longitude);
           var newPoint = new google.maps.LatLng(crds[i].latitude, crds[i].longitude);
           if (marker) {
             // Marker already created - Move it
             marker.setPosition(newPoint);
           }
           else {
             // Marker does not exist - Create it
             marker = new google.maps.Marker({
               position: newPoint,
               map: map
             });
           }
           map.setCenter(newPoint);


            i++;
            if (i < crds.length) {
               myLoop();
            }else{console.log("punktid otsas");}
         }, 1000);
      }
      myLoop ();
  }
}
