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

    //CACHE
    this.cache = window.applicationCache;
    this.startCacheListeners();


    this.games = [];

    if(localStorage.games){
      this.games = JSON.parse(localStorage.games);

    }else{
      localStorage.setItem('games', '[]');
    }

    this.currentGame = {
      unique_id: null,
      player: null,
      selected_track: null,
      current_basket: null,
      results: [],
      ended: null
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
        var basket_nr = track.baskets[index].nr;
        var par_nr = track.baskets[index].par;

        document.querySelector('#game-view h1').innerHTML = track.name+' '+basket_nr+'. korv'+' par = '+par_nr;
        document.querySelector('#game-view h2').innerHTML = "Mängija "+player+" tulemuse sisestamine:";

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
          html += "<th>Date</th>";
          html += "<th>Total par</th>";
          html += "<th>My result</th>";
          html += "<th>+/-</th>";
          html += "<th>Vaata lähemalt</th>";
        html += "</tr>";

        var games = Discgolf.instance.games;
        //tsükkel mängitud mängude kuvamiseks
        for (var i=0; i<games.length; i++){
           var track_id = games[i].selected_track;
           //console.log(games[i].results);
           html += "<tr>";
            //kuvab raja nime
            html += "<td>"+Discgolf.instance.tracks[track_id].name+"</td>";
            //kuvab kuupäeva
            var date = games[i].ended;

            html += "<td>"+date+"</td>";
            //liidab kokku kõikide korvide par'id
            var par_sum = 0;
            for(var j = 0; j < games[i].results.length; j++){
              par_sum += games[i].results[j].par;
            }
            html += "<td>"+par_sum+"</td>";

            //liidab kokku minu igale korvile kulunud visete arvu
            var my_result = 0;
            for(var k = 0; k < games[i].results.length; k++){
              my_result += parseInt(games[i].results[k].result);
            }
            html += "<td>"+my_result+"</td>";
            //leiab vahe
            html += "<td>"+(my_result-par_sum)+"</td>";
            html += "<td><button onclick=Discgolf.instance.gameDetails('"+Discgolf.instance.games[i].unique_id+"')>Details</button></td>";
          html += "</tr>";
        }
        table.innerHTML = html;
      }
    }
  };

  Discgolf.prototype = {
    init: function(){
      console.log('Rakendus läks tööle');
      for(var i = 0; i < this.tracks[0].baskets.length; i++){
         console.log(this.tracks[0].baskets[i].nr + " " + this.tracks[0].baskets[i].par);
      }

      this.bindEvents();

      //aadressirea vahetus
      window.addEventListener('hashchange', this.routeChange.bind(this));

      if(this.games.length > 0 && this.games[this.games.length-1].ended === null){

        // kas mäng lõpetatud

        this.currentGame = this.games[this.games.length-1];
        this.current_basket = this.games[this.games.length-1].current_basket+1; // õige nr
        window.location.hash = 'game-view';
        this.routeChange();
        return;
      }


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

      var id = this.currentGame.selected_track;
      var track = this.tracks[id];
      var index = Discgolf.instance.current_basket;
      var basket_nr = track.baskets[index].nr;
      var result = document.querySelector('.qty').value;

      var new_results = {
        basket_nr: basket_nr,
        result: result,
        par: track.baskets[index].par
      };

     // kas selline m2ng on olemas localStorage
     var game_index = -1;
     console.log(this.games);
     for(var i = 0; i < this.games.length; i++){
       //console.log(this.games[i].unique_id +' '+this.currentGame.unique_id);
       if(this.games[i].unique_id == this.currentGame.unique_id){
         game_index = i;
         //break;
       }
     }

     //console.log('uuendame mangu kohal ' + game_index);

     if(game_index != -1){
       this.games[game_index].results.push(new_results);
       this.games[game_index].current_basket = this.current_basket;
     }else{
       //console.log('uus mang, esimene korv');
       this.currentGame.results.push(new_results);
        this.currentGame.current_basket = this.current_basket;
       this.games.push(this.currentGame);
     }
      localStorage.setItem('games', JSON.stringify(this.games));

      if(this.current_basket == track.baskets.length-1){
        // console.log(this.games[game_index]);
        this.games[game_index].ended = new Date().toDateString();
        localStorage.setItem('games', JSON.stringify(this.games));

        window.location.hash = 'game-history';
        return;
      }
      this.current_basket++;

      console.log('next basket:'+this.current_basket);

      this.routes[this.currentRoute].render();

    },

    insertInfo: function(id){
    //  console.log("load info for id "+id);
      this.currentGame.selected_track = id;

      window.location.hash = 'info-view';

    //  console.log(this.tracks[id]);
    },

    gameDetails: function(id){
//      console.log("laeme selle m2ngu info: "+id);
      var table = document.querySelector("#game-details");
      table.innerHTML = "";
      var html = "";
      html += "<tr>";
        html += "<th>Korvi number</th>";
        html += "<th>Par</th>";
        html += "<th>My result</th>";
      html += "</tr>";
      var games = Discgolf.instance.games;
      var par = 0;
      var my_result = 0;
      var basket_nr = 0;
      for (var i=0; i<games.length; i++){
        if(games[i].unique_id == id){
          //console.log("leidsin m'ngu, mille unique on"+games[i].unique_id);
          for(var j = 0; j < games[i].results.length; j++){
              par = games[i].results[j].par;
              my_result = games[i].results[j].result;
              basket_nr = games[i].results[j].basket_nr;
              html += "<tr>";
                html += "<td>"+basket_nr+"</td>";
                html += "<td>"+par+"</td>";
                html += "<td>"+parseInt(my_result)+"</td>";
              html += "</tr>";
          }
        }
      }
      html += "<button onclick=Discgolf.instance.closeHistory()>Sulge</button>";
      table.innerHTML = html;
      document.getElementById("game-details").style.visibility = "visible";
    },

    closeHistory: function(){
      //console.log('sulgme');
      document.getElementById("game-details").style.visibility = "hidden";
    },

    startCacheListeners: function(){
        window.applicationCache.addEventListener('updateready',function(){
            window.applicationCache.swapCache();
            console.log('swap cache has been called');
        },false);


        setInterval(function(){
            Discgolf.instance.cache.update();
            //kontrollib cache'i iga 10s tagant
        }, 10000);
    },

    startGame: function(e){

      e.preventDefault();
      var unique_id = guid();
      var name = document.querySelector('.name').value;
      console.log("nimi on "+name);
      if(name === ""){
        alert('nimi ei saa  olla tühi');
        return;
      }

      this.currentGame.player = name;
      this.currentGame.unique_id = unique_id;
    //  console.log('Unikaalne id on '+unique_id);

      window.location.hash = 'game-view';
    },




  };//appi l6pp

 function guid(){
   var d = new Date().getTime();
   if(window.performance && typeof window.performance.now === "function"){
     d += performance.now(); //use high-precision timer if available
   }
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = (d + Math.random()*16)%16 | 0;
     d = Math.floor(d/16);
     return (c=='x' ? r : (r&0x3|0x8)).toString(16);
   });
   return uuid;
 }

  window.onload = function(){
    var app = new Discgolf();
  };

})();
