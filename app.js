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
    this.current_basket = 0;

    this.currentGame = {
      player: null,
      selected_track: null
    };

    this.init();
  };

  window.Discgolf = Discgolf;

  Discgolf.routes = {
    'home-view': {
      'render': function(){
        console.log('>>>>avaleht');


        //teeme tabeli
        var table = document.querySelector("#tracks");
        table.innerHTML = "";

        var html = "";

        html += "<tr>";
          html += "<th>Raja nimi</th>";
          html += "<th>Korvide arv</th>";
          html += "<th>Mine mängima</th>";
        html += "</tr>";

        for(var i = 0; i < Discgolf.instance.tracks.length; i++){

          var track =  Discgolf.instance.tracks[i];
          console.log(track);
          console.log(track.baskets);
          html += "<tr>";
            html += "<td>"+track.name+"</td>";
            html += "<td>"+track.baskets.length+"</td>";
            html += "<td><button onclick='Discgolf.instance.insertInfo("+track.id+")'>Mine mängima</button></td>";
          html += "</tr>";

        }

        table.innerHTML = html;

        // LISAKS SKOORITABEL

      }
    },
    'info-view': {
      'render': function(){
        console.log('>>>>nime lisamine');
        var id = Discgolf.instance.currentGame.selected_track;
        var track = Discgolf.instance.tracks[id];
        console.log(track.name);
        console.log(id);
        document.querySelector('#info-view h1').innerHTML = "Mine mängima "+track.name;
      }
    },
    'game-view': {
      'render': function(){
        console.log('>>>>mäng');
        var id = Discgolf.instance.currentGame.selected_track;
        var track = Discgolf.instance.tracks[id];
        var player = Discgolf.instance.currentGame.player;

        var index = Discgolf.instance.current_basket;

        document.querySelector('#game-view h1').innerHTML = track.name;

        var basket_nr = track.baskets[index].nr;
        var par_nr = track.baskets[index].par;
        document.querySelector('#basket-nr').innerHTML = "Korv number "+basket_nr+" par = "+par_nr;
        document.querySelector('#player-name').innerHTML = "Mängija "+player+" tulemuse sisestamine:";
        document.querySelector('.qty').value = par_nr;
      }
    },
    'game-history': {
      'render': function(){
        var table = document.querySelector("#history");
        table.innerHTML = "";

        var html = "";

        html += "<tr>";
          html += "<th>Raja nimi</th>";
          html += "<th>Total par</th>";
          html += "<th>My result</th>";
          html += "<th>Vaata lähemalt</th>";
        html += "</tr>";

        table.innerHTML = html;
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

      this.bindEvents();

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

    bindEvents: function(){
      document.querySelector('.start-new-game').addEventListener('click', this.startGame.bind(this));
      document.querySelector('#start-new-game-form').addEventListener('submit', this.startGame.bind(this));
      document.querySelector('.save-result').addEventListener('click', this.nextBasket.bind(this));
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
    },

    nextBasket: function(e){

      //siis formi ei submiti
      e.preventDefault();

      //tulemused
      /*[
        {basket: 1, result: 4},
        {basket: 1, result: 4},
      ]*/
      var id = this.currentGame.selected_track;
      var track = this.tracks[id];
      if(this.current_basket == track.baskets.length-1){
        alert("viimane oli");
        return;
      }

      this.current_basket++;


      console.log('next baskte:'+this.current_basket);
      this.routes[this.currentRoute].render();


    },

    insertInfo: function(id){
      console.log("load info for id "+id);

      this.currentGame.selected_track = id;


      window.location.hash = 'info-view';

      console.log(this.tracks[id]);
    },

    startGame: function(e){

      e.preventDefault();

      var name = document.querySelector('.name').value;
      console.log("nimi on "+name);
      if(name === ""){

        alert('nimi ei saa  olla tühi');
        return;


      }

      this.currentGame.player = name;

      window.location.hash = 'game-view';
    },




  };//appi l6pp


  window.onload = function(){
    var app = new Discgolf();
  };

})();
