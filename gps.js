function initMap() {
  // Initialize the Google Maps API v3
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = null;
  var latcoords = [];
  var lngcoords = [];
  var timeout;
  ///////////MENU TOGGLE////////
        $(document).ready(function(){
            $("menutoggle").click(function(){
                $("#menu").toggle();
            });
            $("#start").click(function(){
                autoUpdate();
                var id = guid();
                var username = document.getElementById('username').value;
                var mapselect = document.getElementById('mapselect').value;
                console.log('username: ' + username + ' userid: '+ id + ' map: ' + mapselect);
            });
            $("#stop").click(function(){
                stopTracking();
            });
        });

////////////USER ID GENERATE/////////////
        function guid(){
     		var d = new Date().getTime();
     		if(window.performance && typeof window.performance.now === "function"){
     			d += performance.now(); //use high-precision timer if available
     		}
     		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     			var r = (d + Math.random()*16)%16 | 0;
     			d = Math.floor(d/16);
     			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
     		});
     		return uuid;
     	}

/////////////UPDATING////////////
  function autoUpdate() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var newPoint = new google.maps.LatLng(position.coords.latitude,
                                            position.coords.longitude);

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

////////SAVE COORDINATES////////


      var lat = newPoint.lat();
      console.log(lat);
      var lng = newPoint.lng();
      console.log(lng);

      latcoords.push(lat);
      lngcoords.push(lng);

      var index;
      for (index = 0; index < latcoords.length; ++index) {
          console.log('lat: ' + latcoords[index]);
          console.log('lng: ' + lngcoords[index]);
      }

    });
    // Call the autoUpdate() function every 1 second
    timeout = setTimeout(autoUpdate, 5000);
  }

///////////STOP TRACKING///////////////

  function stopTracking(){
    var id = guid();
    var username = document.getElementById('username').value;
    var mapselect = document.getElementById('mapselect').value;
    console.log('tracking stopped');
    clearTimeout(timeout);
    console.log('your data: ' + id + ' ' + username + ' ' + mapselect + ' ' + latcoords);



    var new_track_array = [];
    new_track_array.push(id);
    new_track_array.push(username);
    new_track_array.push(mapselect);
    console.log(JSON.stringify(new_track_array));
    console.log(JSON.stringify({lat: latcoords}));
    // JSON'i stringina salvestan localStorage'isse
    localStorage.setItem('tracks', JSON.stringify(new_track_array, {lat: latcoords}));
    //AJAX
    var xhttp = new XMLHttpRequest();
    //mis juhtub kui päring lõppeb
    xhttp.onreadystatechange = function() {
       console.log(xhttp.readyState);
           if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
           }
    };
    //teeb päringu
    xhttp.open("GET", "save.php?id="+id+"&username="+username+"&mapselect="+mapselect, true);
    xhttp.send();





  }
}
