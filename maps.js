(function(){
    "use strict";

    var MapsApp = function(){

        if(MapsApp.instance){
            return MapsApp.instance;
        }
        MapsApp.instance = this;

        this.container = null;
		this.map = null;

        this.init();
    };

    window.MapsApp = MapsApp;

    MapsApp.prototype = {

        init: function(){

            console.log('MapsApp started');

            this.container = document.querySelector('#map-container');

			var options = {
				center: {
					lat: 59.439252,
					lng: 24.7721997
				},
				zoom: 10,
				styles: [ { "elementType": "labels", "stylers":
        [ { "visibility": "off" } ] },{ "featureType": "water", "stylers":
        [ { "color": "#8080ed" } ] },{ "featureType": "road.highway", "stylers":
        [ { "hue": "#ff0022" } ] } ],
				streetViewControl: false,
				mapTypeControl: false

			};

			this.map = new google.maps.Map(this.container, options);

      this.map.addListener('click', function(e){
        console.log(e.latLng.lat());
        MapsApp.instance.createMarker(e.latLng.lat(), e.latLng.lng());
      });

        },
        /*
        createMarker: function(newLat, newLng){
          var markerOptions = {
            map: this.map,
            position: {lat: newLat, lng:newLng},
            animation: google.maps.Animation.BOUNCE
          };
          var newMarker = new google.maps.Marker(markerOptions);
          var infoOptions = {
            content: "<strong>Tere</strong>"
          };
          var infoWindow = new google.maps.InfoWindow(infoOptions);
          //seome markeriga
          infoWindow.open(this.map, newMarker);
        }*/

    };
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);	
    }

    window.onload = function(){
        var app = new MapsApp();




    };

})();
