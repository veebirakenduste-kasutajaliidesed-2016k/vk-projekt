(function(){
    "use strict";
    
    var frontMap = function(){
        if(frontMap.instance){
            return frontMap.instance;
        }
        
    frontMap.instance = this;
        console.log('inside map');
    

    
    this.init()
    };
    
    window.frontMap = frontMap;
    
    frontMap.prototype = {
      
        init: function(){
            this.map;
            this.center = new google.maps.LatLng(59.436984, 24.750286);
            console.log('working');
                 
        this.initialize();
            
    },
        
    initialize: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 13
    });   
        
    },
            
    callBack: function(status){
        if(this.status == google.maps.places.PlacesServiceStatus.OK){
            console.log('status ok');
        }else{
            console.log('status not ok');
        }
    },
    };
            
    
   window.onload = function(){
     var app = new frontMap();
   };

})();
  
    
 
/*
 var map;
      var infoWindow;
      var request;
      var service;
      var markers = [];
          
function initialize(){
    var center = new google.maps.LatLng(59.436984, 24.750286);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });
    
     request = {
     location: center,
     radius: 5000,
     type: ['cafe']
    };
    
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    
    google.maps.event.addListener(map, 'rightclick', function(event){
        map.setCenter(event.latLng)
        clearResults(markers)
        
        var request = {
        location: event.latLng,
        radius: 5000,
        type: ['cafe']
        };
        service.nearbySearch(request, callback);
    })
}

function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}


          
function createMarker(place) {
    var placeLoc = place.geometry.location;
     marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
    return marker;
}
    function clearResults(markers){
        for ( var m in markers) {
            markers[m].setMap(null)
    }
        markers = []
          }
}
          
google.maps.event.addDomListener(window, 'load', initialize);

*/
