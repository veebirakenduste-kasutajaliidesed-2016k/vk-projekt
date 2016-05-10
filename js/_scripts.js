(function(){
"use strict";

  var ClickerGame = function(){

    if(ClickerGame.instance){
      return ClickerGame.instance;
    }
    //this viitab ClickerGame fn
    ClickerGame.instance = this;

    // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
    this.cookies = 0;
    this.cps = 0;
    console.log(this);

    this.init();
  };

  window.ClickerGame = ClickerGame;

  ClickerGame.prototype = {

    init: function(){
    console.log('Rakendus läks tööle');
    this.cookies = parseInt(localStorage.getItem("cookies"));
    this.cps = parseInt(localStorage.getItem("cps"));
    console.log("###GAME LOADED###");
    this.bindEvents();
    this.main();
    console.log(this.cookies);
    },
    main: function(){
      var game = this;
      setInterval(function(){
        game.cookies += game.cps;
        console.log(game.cookies); 
        localStorage.setItem("cookies", game.cookies);
        localStorage.setItem("cps", game.cps);
      }, 1000);
    },
    bindEvents: function(){
      var game = this;
      $('.cookie').click(function(){
        game.addCookie(1);
      });
      $('.autoclicker').click(function(){
        game.cps += 1;
      });
      $('.save').click(function(){
        console.log("Game Saved");
      });
      $('.delete').click(function(){
        localStorage.removeItem("cookies");
        localStorage.removeItem("cps");
        game.cookies = 0;
        game.cps = 0;
        console.log("Save Deleted");
      });
    },
    addCookie: function(amount){
      this.cookies += amount;
      console.log(this.cookies);
    },
  }
    window.onload = function(){
    var app = new ClickerGame();
  };

})();