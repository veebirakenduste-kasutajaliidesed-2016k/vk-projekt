(function(){
    "use strict";

    var Sides = function(){

        // SEE ON SINGLETON PATTERN
        if(Sides.instance){
            return Sides.instance;
        }
        Sides.instance = this;

        //CACHE
        this.cache = window.applicationCache;
        this.startCacheListeners();


        this.sides_list = sides_list;
        this.new = true;

        this.init();
    };

    window.Sides = Sides; // Paneme muuutuja külge

    Sides.prototype = {

        init: function(){

            console.log('Sides started');

            Sides.instance.writeRandomSide();
            window.addEventListener("devicemotion", this.handleMotionRight.bind(this));
            window.addEventListener("devicemotion", this.handleMotionLeft.bind(this));
            window.addEventListener("devicemotion", this.handleMotionFront.bind(this));
            window.addEventListener("devicemotion", this.handleMotionBack.bind(this));
            window.addEventListener("devicemotion", this.handleMotionUp.bind(this));
            window.addEventListener("devicemotion", this.handleMotionDown.bind(this));

        },


        handleMotionRight: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Right'){
            var xr_acceleration = event.accelerationIncludingGravity.x;
            if (xr_acceleration < -9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },

        handleMotionLeft: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Left'){
            var xl_acceleration = event.accelerationIncludingGravity.x;
            if (xl_acceleration > 9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },

        handleMotionFront: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Front'){
            var zf_acceleration = event.accelerationIncludingGravity.z;
            if (zf_acceleration < -9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },

        handleMotionBack: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Back'){
            var zb_acceleration = event.accelerationIncludingGravity.z;
            if (zb_acceleration > 9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },

        handleMotionUp: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Up'){
            var yu_acceleration = event.accelerationIncludingGravity.y;
            if (yu_acceleration > 9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },

        handleMotionDown: function(event){
          var body = document.body;
          var asd = body.innerText;
          if (asd== 'Down'){
            var yd_acceleration = event.accelerationIncludingGravity.y;
            if (yd_acceleration < -9 && this.new){
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 1000);
            }
          }


        },


        startCacheListeners: function(){
            window.applicationCache.addEventListener('updateready',function(){
                window.applicationCache.swapCache();
                console.log('swap cache has been called');
            },false);

            setInterval(function(){
                Sides.instance.cache.update();
                //kontrollib cache'i iga 10s tagant
            }, 10000);
        },
        writeRandomSide: function(){
	        navigator.vibrate(100);
            //leia random indeksiga side
            var random_side = this.sides_list[parseInt(Math.random()*this.sides_list.length)];
            document.querySelector("#content").innerHTML = random_side;
        }
    }; // sides LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function(){
        var app = new Sides();
    };

})();
