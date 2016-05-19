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
    console.log('###GAME STARTED###');
    if(JSON.parse(localStorage.getItem("cookies"))){
      this.load();
      console.log("###GAME LOADED###");
    }else{
      console.log("###NO SAVE FOUND###");
    }
    this.updateStats();
    this.bindEvents();
    console.log(this.upgrade.length);
    for(var s = 0; s < this.upgrade.length; s++){
      //console.log("outerloop activated for canvas "+s);
      if(this.upgrade[s]>0){
        for(var l = 0; l<this.upgrade[s]; l++){
          //console.log("innerloop "+l+" times");
          this.drawCharacters(s);
        }
      }
    }
    this.main();
    console.log(this.cookies);
    },
    main: function(){
      var game = this;
      setInterval(function(){
        game.addCookie(game.cps);
        game.updateStats();
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
      $('.btn--testing').click(function(){
        game.cookies = 9999999;
      });
    },
    addCookie: function(amount){
      this.cookies += amount;
    },
    updateStats: function(){
      $('.stats__cookieAmount').html(this.cookies+"$");
      $('.stats__cps').html(this.cps+"$");
    },
    save: function(){
      localStorage.setItem("cookies", JSON.stringify(this.cookies));
      localStorage.setItem("cps", JSON.stringify(this.cps));
      localStorage.setItem("upgrades", JSON.stringify(this.upgrade));
    },
    delete: function(){
      localStorage.removeItem("cookies");
      localStorage.removeItem("cps");
      localStorage.removeItem("upgrades");
      this.cookies = 0;
      this.cps = 0;
      this.upgrade = [0,0,0,0,0]
      console.log("Save Deleted");
    },
    load: function(){
      this.cookies = JSON.parse(localStorage.getItem("cookies"));
      this.cps = JSON.parse(localStorage.getItem("cps"));
      for(var i = 0; i<this.upgrade.length; i++){
        this.upgrade = JSON.parse(localStorage.getItem("upgrades"));
        $('.upgrade .upgrade__amount').eq(i).html(this.upgrade[i]);
        var cost = Math.floor(Math.pow(10,i+1) * Math.pow(1.1,this.upgrade[i]));
        $('.upgrade .upgrade__cost').eq(i).html(cost+"$");
      }      
    },
    upgradeSkills: function(index){
      var cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
      if(this.cookies>=cost && this.cookies-cost>=0){
        this.cookies -= cost;
        console.log(this.upgrade[index]);
        this.upgrade[index] += 1;
        this.cps += this.upgradeCPS[index];
        this.updateStats();
        $('.upgrade .upgrade__amount').eq(index).html(this.upgrade[index]);
        cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
        $('.upgrade .upgrade__cost').eq(index).html(cost+"$");
        this.drawCharacters(index);
      }else{
        console.log("Need mo money "+cost);
      }
    },
    drawCharacters: function(index){
        var canvas = document.querySelectorAll('.characterCanvas')[index];
        var ctx = canvas.getContext('2d');
        var i1 = new Image();
        i1.onload = function(){
        ctx.drawImage(i1, Math.floor(Math.random() * (795 - 5) + 5), Math.floor(Math.random() * (195 - 5) + 5));
        };
        i1.src = ''+index+'.png';
        console.log("Drew a character on canvas "+index);
      }
  }
    window.onload = function(){
    var app = new ClickerGame();
  };

})();