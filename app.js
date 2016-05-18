(function(){
  "use strict";

  var Moosipurk = function(){
    // SINGLETON PATTERN (4 rida)
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; //this viitab moosipurgile

    this.routes = Moosipurk.routes;

    //Kõik muutujad, mis on üldised ja muudetavad
    this.currentRoute = null; // hoiab meeles mis lehel hetkel on
    this.jars = []; //kõik purgid tulevad siia sisse

    //panen rakenduse tööle
    this.init();
  };

  //kirjeldatud kõik lehed
  Moosipurk.routes = {
    "home-view" : {
      render: function(){
        // käivitan siis kui jõuan lehele
        console.log('JS avalehel');
        if(this.interval){clearInterval(this.interval);}
        var seconds = 0;
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000);
      }
    },
    "list-view" : {
      render: function(){
        console.log('JS loend lehel');
      }
    },
    "manage-view" : {
      render: function(){
        //console.log('JS haldus lehel');
      }
    }
  };

  //kõik moosipurgi funktsioonid siia sisse
  Moosipurk.prototype = {
    init: function(){
      //Esialgne loogika tuleb siia
      window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan mis lehel olen
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        //hash oli olemas
        this.routeChange();
      }
      //hakka kuulama hiireklõpse
      this.bindEvents();
    },
    bindEvents: function(){
      //kuulan trükkimist otsi kastist
      document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
    },
    search: function(event){
      //otsikasti väärtus
      var needle = document.querySelector('#search').value.toLowerCase();
      //console.log(needle);

      var list = document.querySelectorAll('ul.list-of-jars li');
      //console.log(list);
      for(var i=0; i<list.length; i++){
        var li = list[i];
          //ühe list itemi sisu
          var stack = li.querySelector('.content').innerHTML.toLowerCase();
          //kas otsisõna on olemas
          if(stack.indexOf(needle) !== -1){
            //olemas
            li.style.display = 'list-item';
          }else{
            //ei ole olemas
            li.style.display = 'none';
          }
      }
    },
    routeChange: function(event){
      this.currentRoute = window.location.hash.slice(1);
      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah olemas
        this.updateMenu();
        //console.log('>>> '+this.currentRoute);
        //käivitan selle lehe jaoks ettenähtud js
        this.routes[this.currentRoute].render();
      }else{
        //404? ei ole
        //console.log('404');
        window.location.hash = 'home-view';
      }
    },
    updateMenu: function(){
      //kui menüül on active-menu siis võtame ära
      document.querySelector('.active-menu').className=document.querySelector('.active-menu').className.replace(' active-menu', '');
      //käesolevale lehele lisan juurde
      document.querySelector('.'+this.currentRoute).className+=' active-menu';
    },
	writeDate : function(){
		  var d = new Date();
		  var day = d.getDate();
		  var month = d.getMonth();
		  var year = d.getFullYear();
		  //#clock element htmli
		  var curTime = this.addZeroBefore(day)+"."+this.addZeroBefore(month+1)+"."+year;
		  return curTime;
	},
  };
  //helper
  window.onload = function(){
    var app = new Moosipurk();
  };

})();
