(function(){
  "use strict";

  var Discgolf = function(){
    //Singelton
    if(Discgolf.instance){
      return Discgolf.instance;
    }
    Discgolf.instance = this;

    //Rajad tulevad failist tracks.js
    this.tracks = tracks;

    this.init();
  };

  window.Discgolf = Discgolf;

  Discgolf.prototype = {
    init: function(){

      console.log(this.tracks);

      console.log(this.tracks[0]);
      console.log(this.tracks[0].name);
      console.log(this.tracks[0].baskets.length);
      for(var i = 0; i < this.tracks[0].baskets.length; i++){
         console.log(this.tracks[0].baskets[i].nr + " " + this.tracks[0].baskets[i].par);
      }
    }
  };

  window.onload = function(){
    var app = new Discgolf();
  };

})();
