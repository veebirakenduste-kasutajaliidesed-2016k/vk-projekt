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
            if(navigator.onLine) {
                this.map;
                this.center = new google.maps.LatLng(59.436984, 24.750286);
                console.log('working'); 
            this.initialize();
            } else{
                this.window.alert('You are offline. Please connect to the internet');
            }

    },
        
    initialize: function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 13

    });   
    },

    };
            
    
   window.onload = function(){
     var app = new frontMap();
   };

})();