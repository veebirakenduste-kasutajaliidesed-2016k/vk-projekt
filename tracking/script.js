(function(){
  "use strict";

  var Tracking = function(){
    // SINGLETON PATTERN (4 rida)
    if(Tracking.instance){
      return Tracking.instance;
    }
    Tracking.instance = this;
    //Muutujad
    this.latcoords = [];
    this.lngcoords = [];
    this.timeout = null;
    this.username = 0;
    this.id = 0;
    this.wait = 0;
    this.init();
  };

  Tracking.prototype = {

///////////INITIALIZE START////////////

    init: function(){
      console.log('rakendus käivitus');
      /////SIIN peaks tulevikus track'id sisse lugema
      this.bindEvents();
    },

//////////////////BINDEVENTS STARTS//////////////////

    bindEvents: function(){
      document.querySelector('#start').addEventListener('click', this.startTracking.bind(this));
      document.querySelector('#stop').addEventListener('click', this.stopTracking.bind(this));
    },

///////////START TRACKING////////////

    startTracking: function(){
      this.id = guid();
      this.username = document.getElementById('username').value;
      document.getElementById('userid').value = this.id;
      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb

      xhttp.onreadystatechange = function() {
         console.log(xhttp.readyState);
             if (xhttp.readyState == 4 && xhttp.status == 200) {
                  console.log('response: ' + xhttp.responseText);
             }
        };
      //teeb päringu
      xhttp.open("GET", "save.php?id="+this.id+"&username="+this.username, true);
      xhttp.send();
      console.log('saadetav info:' +this.id+" "+this.username);

      this.autoUpdate();
    },

/////////////////UPDATING////////////

    autoUpdate: function(){
      navigator.geolocation.getCurrentPosition(function(position) {
        var crd = position.coords;
        var lat = crd.latitude;
        var lng = crd.longitude;
        console.log('lat: ' + lat + ' lng: ' + lng);
        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;
        });
        if(this.wait == 1){
          this.saveGps();
        }
        this.wait = 1;
        // Call the autoUpdate() function
        this.timeout = setTimeout(this.autoUpdate.bind(this), 5000);
      },

      saveGps: function(){
        var htmllat = document.getElementById('lat').value;
        var htmllng = document.getElementById('lng').value;
        var htmlid = document.getElementById('userid').value;
        var htmluser = document.getElementById('username').value;
        //AJAX
        var xhttp = new XMLHttpRequest();
        //mis juhtub kui päring lõppeb
        var coords = JSON.stringify({"lat": htmllat, "lng": htmllng});

        xhttp.onreadystatechange = function() {
           console.log(xhttp.readyState);
               if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log('response: ' + xhttp.responseText);
               }
          };
        //teeb päringu
        xhttp.open("GET", "savedata.php?id="+htmlid+"&coords="+coords, true);
        xhttp.send();
        //savedata.php?id=username=&coords=
        console.log('saadetav info:' +htmlid+" "+coords);
      },


//////////////STOP TRACKING////////

    stopTracking: function(){
      var id = document.getElementById('userid').value;
      var username = document.getElementById('username').value;
      console.log('tracking stopped');
      clearTimeout(this.timeout);
      //console.log('your data: ' + id + ' ' + username + ' ' + this.latcoords);
      /*
      var new_track_array = [];
      new_track_array.push(id);
      new_track_array.push(username);
      //console.log(JSON.stringify(new_track_array));
      //console.log(JSON.stringify({lat: this.latcoords}));
      // JSON'i stringina salvestan localStorage'isse

      localStorage.setItem('tracks', JSON.stringify(new_track_array, {lat: this.latcoords}));

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
      xhttp.open("GET", "save.php?id="+id+"&username="+username, true);
      xhttp.send();
      */
    }
  };

////////////HELPER FUNCTIONS///////////////

//////////////ID GENERATOR/////////////////

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

  window.onload = function(){
    var app = new Tracking();
  };

})();
