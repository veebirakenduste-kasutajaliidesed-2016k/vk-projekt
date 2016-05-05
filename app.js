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