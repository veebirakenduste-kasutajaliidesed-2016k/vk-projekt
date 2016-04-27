(function(){
  "use strict";

  var Discgolf = function(){
    //Singelton
    if(Discgolf.instance){
      return Discgolf.instance;
    }
    Discgolf.instance = this;
    this.routes = Discgolf.routes;
    this.currentRoute = null;
    //Rajad tulevad failist tracks.js
    this.tracks = tracks;

    this.init();
  };

  window.Discgolf = Discgolf;

  Discgolf.routes = {
    'home-view': {
      'render': function(){
        console.log('>>>>avaleht');
      }
    },
    'info-view': {
      'render': function(){
        console.log('>>>>nime lisamine');
      }
    },
    'game-view': {
      'render': function(){
        console.log('>>>>mäng');
      }
    }


  };



  Discgolf.prototype = {
    init: function(){
      console.log('Rakendus läks tööle');
      console.log(this.tracks);
      console.log(this.tracks[0]);
      console.log(this.tracks[0].name);
      console.log(this.tracks[0].baskets.length);
      for(var i = 0; i < this.tracks[0].baskets.length; i++){
         console.log(this.tracks[0].baskets[i].nr + " " + this.tracks[0].baskets[i].par);
      }
      //aadressirea vahetus
      window.addEventListener('hashchange', this.routeChange.bind(this));
      // kui aadressireal ei ole hashi siis lisan juurde
      if(!window.location.hash){
        window.location.hash = 'home-view';
        // routechange siin ei ole vaja sest käsitsi muutmine käivitab routechange event'i ikka
      }else{
        //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
        this.routeChange();
      }
    },

    routeChange: function(event){
      //kirjutan muuutujasse lehe nime, võtan maha #
      this.currentRoute = location.hash.slice(1);
      console.log(this.currentRoute);
      //kas meil on selline leht olemas?
      if(this.routes[this.currentRoute]){
        this.routes[this.currentRoute].render();
      }else{
        /// 404 - ei olnud
      }
    }




  };

  window.onload = function(){
    var app = new Discgolf();
  };

})();
