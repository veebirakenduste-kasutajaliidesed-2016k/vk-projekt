(function(){
  "use strict";

  var Tracking = function(){
    // SINGLETON PATTERN (4 rida)
    if(Tracking.instance){
      return Tracking.instance;
    }
    Tracking.instance = this;
    //Muutujad
    this.crds = [];
    this.timeout = null;
    this.init();
  };

  Tracking.prototype = {

///////////INITIALIZE START////////////

    init: function(){
      console.log('rakendus käivitus');
      if(localStorage.crds){
          this.crds = JSON.parse(localStorage.crds);
          console.log('laadisin localStorageist massiivi ' + this.crds.length + ' koordinaati');
            console.log("sain kätte");
    }else{
      console.log("ei saa kätte või puudub");
      localStorage.setItem('crds', '[]');
    }
      this.bindEvents();
    },

//////////////////BINDEVENTS STARTS//////////////////

    bindEvents: function(){
      document.querySelector('#start').addEventListener('click', this.autoUpdate.bind(this));
      document.querySelector('#stop').addEventListener('click', this.stopTracking.bind(this));
      document.querySelector('#delete').addEventListener('click', this.deleteData.bind(this));
    },

/////////////////TRACKING////////////

    autoUpdate: function(){
      console.log('autoUpdate');
      trackingtext.style.visibility='visible';
      navigator.geolocation.getCurrentPosition(function(position) {
        var crd = position.coords;
        var lat = crd.latitude;
        var lng = crd.longitude;
        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;
        });
        var htmllat = document.getElementById('lat').value;
        var htmllng = document.getElementById('lng').value;
        console.log('lat: ' + htmllat + ' lng: ' + htmllng);
        var crds = {latitude: htmllat, longitude: htmllng};
        var json = JSON.stringify(crds);
        this.crds.push(crds);
        console.log(crds);
        localStorage.setItem('crds', JSON.stringify(this.crds));

        // Call the autoUpdate() function
        this.timeout = setTimeout(this.autoUpdate.bind(this), 1000);
      },

//////////////STOP TRACKING////////

    stopTracking: function(){
      console.log('stopTracking');
      console.log('tracking stopped');
      clearTimeout(this.timeout);
      trackingtext.style.visibility='hidden';
    },

////////////DELETE DATA////////

    deleteData: function(){
      this.crds = [];
      localStorage.setItem('crds', '[]');
      console.log('data deleted');
    }
  };

  window.onload = function(){
    var app = new Tracking();
  };

})();
