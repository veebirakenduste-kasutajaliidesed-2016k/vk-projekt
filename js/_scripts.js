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
    this.upgrade = [0,0,0,0,0];
    this.upgradeCPS = [1, 10, 100, 250, 1000];
    console.log(this);

    this.init();
  };

  window.ClickerGame = ClickerGame;

  ClickerGame.prototype = {

    init: function(){
    console.log('Rakendus läks tööle');
    if(parseInt(localStorage.getItem("cookies"))){
      this.load();
      console.log("###GAME LOADED###");
    }else{
      console.log("###NO SAVE FOUND###");
    }
    this.updateStats();
    this.bindEvents();
    this.main();
    console.log(this.cookies);
    },
    main: function(){
      var game = this;
      setInterval(function(){
        game.addCookie(game.cps);
        game.updateStats();
        console.log(game.cookies); 
        console.log("CPS: "+game.cps);
        game.save();
      }, 1000);
    },
    bindEvents: function(){
      var game = this;
      $('.btn--cookie').click(function(){
        game.addCookie(1);
        game.updateStats();
      });
      $('.upgrade').click(function(){
        this.Index = $(".upgrade").index(this);
        console.log("upgrade" + this.Index);
        game.upgradeSkills(this.Index);
      });
      $('.btn--delete').click(function(){
        game.delete();
      });
    },
    addCookie: function(amount){
      this.cookies += amount;
    },
    updateStats: function(){
      $('.stats__cookieAmount').html(this.cookies);
      $('.stats__cps').html(this.cps);

    },
    save: function(){
      localStorage.setItem("cookies", this.cookies);
      localStorage.setItem("cps", this.cps);
    },
    delete: function(){
      localStorage.removeItem("cookies");
      localStorage.removeItem("cps");
      this.cookies = 0;
      this.cps = 0;
      console.log("Save Deleted");
    },
    load: function(){
      this.cookies = parseInt(localStorage.getItem("cookies"));
      this.cps = parseInt(localStorage.getItem("cps"));
    },
    upgradeSkills: function(index){
      var cost = Math.floor(Math.pow(10,index) * Math.pow(1.1,this.upgrade[index]));
      if(this.cookies>cost && this.cookies-cost>0){
        this.cookies -= cost;
        console.log(this.upgrade[index]);
        this.upgrade[index] += 1;
        this.cps += this.upgradeCPS[index];
        this.updateStats();
        $('.upgrade .upgrade__amount').eq(index).html(this.upgrade[index]);
        $('.upgrade .upgrade__cost').eq(index).html(cost);
      }else{
        console.log("Need mo money");
      }        
    },
  }
    window.onload = function(){
    var app = new ClickerGame();
  };

})();