(function(){
    "use strict";
    
    var frontMap = function(){
        if(frontMap.instance){
            return frontMap.instance;
        }
        
    frontMap.instance = this;
    
    this.geoLocation();
    };
    
    window.frontMap = frontMap;
    
    frontMap.prototype = {
      
        init: function(position) {
            if(navigator.onLine) {
                this.map;
                this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log('working'); 
                this.initialize();
                
            } else {
                
                window.alert('You are offline. Please connect to the internet');
            }},
        
    initialize: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 13,
    
            

    });
    },
    
    geoLocation: function() {
       var geolocation = null;

        if (window.navigator && window.navigator.geolocation) {
            this.geolocation = window.navigator.geolocation;
        }
        if (this.geolocation) {
            this.geolocation.getCurrentPosition(function(position) {
            frontMap.instance.init(position);
            console.log(position);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            
                
        });
    }},
      
};
            
   window.onload = function() {
     var app = new frontMap();
   };

})();