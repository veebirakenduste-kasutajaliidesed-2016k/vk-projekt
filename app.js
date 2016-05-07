(function(){
    "use strict";
    
    var placeFinder = function(){
        if(placeFinder.instance){
            return placeFinder.instance;
        }
        
    placeFinder.instance = this;
    
    this.geoLocation();
    
    };
    
    window.placeFinder = placeFinder;
    
    placeFinder.prototype = {
      
        init: function(position) {
            if(navigator.onLine) {
                this.map;
                this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.initialize();
                this.getValuesListener();
                
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
            placeFinder.instance.init(position);   
        });
    }},
        
    getValuesListener: function(){
        document.getElementById('getValues').addEventListener('click', this.getValues.bind(this));
        
    },
    getValues: function() {
      var placeVar = document.getElementById('placeValue').value;  
      var rangeVar = document.getElementById('rangeValue').value;  
      console.log(placeVar);
      console.log(rangeVar);
      placeFinder.instance.requestVariables(placeVar, rangeVar);
    
    }, 
    requestVariables: function(placeVar, rangeVar){
        this.request = {
            location: this.center,
            radius: rangeVar,
            types: placeVar
        }
        console.log(this.request.location+','+this.request.radius+','+this.request.types);
    },   
};
            
   window.onload = function() {
     var app = new placeFinder();
   };

})();