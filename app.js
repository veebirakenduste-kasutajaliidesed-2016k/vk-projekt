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

      console.log(this.track_list);

      console.log(this.track_list[0]);
      console.log(this.track_list[0].name);
      console.log(this.track_list[0].baskets.length);
      for(var i = 0; i < this.track_list[0].baskets.length; i++){
         console.log(this.track_list[0].baskets[i].nr + " " + this.track_list[0].baskets[i].par);
      }
    }
  };

})();
