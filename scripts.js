(function(){
    "use strict";

    var Sides = function(){

        //SINGLETON
        if(Sides.instance){
            return Sides.instance;
        }
        Sides.instance = this;

        //CACHE
        this.cache = window.applicationCache;
        this.startCacheListeners();

        this.sides_list = sides_list;
        this.new = true;

        //skoor
        this.guessed_sides = 0;

        //this.player = {name: null, score: 0};


        this.init();
    };

    window.Sides = Sides; // Paneme muuutuja külge

    Sides.prototype = {

        init: function(){

          //this.loadPlayerData();

          var counter = 10;
          var id;


          console.log('Sides started');

          Sides.instance.writeRandomSide();
          Sides.instance.writeScore();
          window.addEventListener("devicemotion", this.handleMotionRight.bind(this));
          window.addEventListener("devicemotion", this.handleMotionLeft.bind(this));
          window.addEventListener("devicemotion", this.handleMotionFront.bind(this));
          window.addEventListener("devicemotion", this.handleMotionBack.bind(this));
          window.addEventListener("devicemotion", this.handleMotionUp.bind(this));
          window.addEventListener("devicemotion", this.handleMotionDown.bind(this));


          id = setInterval(function() {
            counter--;
            if(counter < 0) {
              document.querySelector("#content").innerHTML = ("Game over\n"  );
            }
          }, 1000);
        },

        /*loadPlayerData: function(){

          var p_name = prompt("Sisesta nimi");

          if(p_name ===null || p_name===""){
            p_name = "Nimeta";
          }

          this.player.name = p_name;
          console.log(this.player);
        },
*/
        handleMotionRight: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          console.log(asd);
          if (asd== 'Right'){
            var xr_acceleration = event.accelerationIncludingGravity.x;
            if (xr_acceleration < -9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}
            }
        },

        handleMotionLeft: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          if (asd== 'Left'){
            var xl_acceleration = event.accelerationIncludingGravity.x;
            if (xl_acceleration > 9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}

          }
        },

        handleMotionFront: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          if (asd== 'Front'){
            var zf_acceleration = event.accelerationIncludingGravity.z;
            if (zf_acceleration < -9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}

          }
        },

        handleMotionBack: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          if (asd== 'Back'){
            var zb_acceleration = event.accelerationIncludingGravity.z;
            if (zb_acceleration > 9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}

          }
        },

        handleMotionUp: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          if (asd== 'Up'){
            var yu_acceleration = event.accelerationIncludingGravity.y;
            if (yu_acceleration > 9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}

          }
        },

        handleMotionDown: function(event){
          var body = document.getElementById("content");
          var asd = body.innerText;
          if (asd== 'Down'){
            var yd_acceleration = event.accelerationIncludingGravity.y;
            if (yd_acceleration < -9 && this.new){
              this.guessed_sides +=1;
                //this.player.score = this.guessed_sides;
              Sides.instance.writeScore();
              Sides.instance.writeRandomSide();
              this.new = false;
              window.setTimeout(function(){
                Sides.instance.new = true;
              }, 500);}

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
        },
        writeScore: function(){
          document.querySelector("#skoor").innerHTML = "SCORE: " + this.guessed_sides;
        }
    }; // sides LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function(){
      var app = new Sides();

    };

})();
