(function(){
    "use strict";




    var averageFuel = function(){
        if(averageFuel.instance){
            return averageFuel.instance;
        }

    averageFuel.instance = this;
    this.routes = averageFuel.routes;
    this.fuelText = document.getElementById('output');

    this.currentRoute = null;
    this.alle = [];
    this.init();  //SIIA PANED ALGSE FUNKTSIOONI

    };

    window.averageFuel = averageFuel;

    averageFuel.routes = {
     'home-view': {
       'render': function(){}
     },
     'history-view': {
       'render': function(){}
     },
     'manage-view': {
       'render': function(){
        }
     }
   };

    averageFuel.prototype = {

      //siia funktsiionid
      /*
      funktsiooniNimi: function(){



    },


      */


      init:function(){
        this.serverData=[];
        console.log(this.serverData);
        this.serverData = this.fromServer();
        this.getValuesListener();
        console.log(this.serverData);

        window.addEventListener('hashchange', this.routeChange.bind(this));
       if(!window.location.hash){
         window.location.hash = 'home-view';
         }else{
       this.routeChange();
       }

      },

      routeChange: function(event){

       this.currentRoute = location.hash.slice(1);
       console.log(this.currentRoute);

       if(this.routes[this.currentRoute]){

         this.updateMenu();

         this.routes[this.currentRoute].render();


       }else{
         /// 404 - ei olnud
       }


     },

     updateMenu: function() {
       document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

       document.querySelector('.'+this.currentRoute).className += ' active-menu';

     },

      getValuesListener: function(){
        document.getElementById('button').addEventListener('click', this.getValues.bind(this));

      },



      getValues: function(){
        var fuelQuantity = document.getElementById('fuelQuantity').value;
        var fuelCost = document.getElementById('fuelCost').value;
        var trip = document.getElementById('trip').value;
        var fuelCostText = document.getElementById('output');
        fuelCostText.innerHTML = "Tankisid "+ fuelQuantity + " liitrit kütust " + fuelCost + " euro eest ja sõitsid " + trip + " kilomeetrit.";


        console.log(fuelQuantity);
        console.log(fuelCost);
        console.log(trip);
        this.toServer(fuelQuantity, fuelCost, trip);
        this.fuelWasted(trip, fuelQuantity);
        this.moneyWasted(fuelCost, fuelQuantity, trip);
      },
      fuelWasted:function(trip, fuelQuantity){
        var average = fuelQuantity/(trip/100);
        console.log("Keskmine kütusekulu on ", average, "L/100KM");
        var avgConsumption = document.getElementById('averageConsumption');
        avgConsumption.innerHTML = "Keskmine kütusekulu oli " + average.toFixed(2) + "L/100KM." ;
      },
      moneyWasted:function(fuelCost, fuelQuantity, trip){
        var costPerKm = ((fuelQuantity/(trip/100)/100)*(fuelCost/fuelQuantity));
        console.log("Kilomeetri hind on ", costPerKm);
        var kmCost = document.getElementById('averageKmCost');
        averageKmCost.innerHTML = "Raha kulus " + costPerKm.toFixed(2) + " eurot kilomeetri kohta.";
      },



      toServer: function(fuelQuantity, fuelCost, trip){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          console.log('salvestas serverisse');

        }
      };

      xhttp.open("GET", "saveData.php?fuelQuantity="+fuelQuantity+"&fuelCost="+fuelCost+"&trip="+trip, true);
      xhttp.send();

    },
    fromServer: function(){
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log("readystate");

          var result =JSON.parse(xhttp.responseText);
          averageFuel.instance.alle = new Array(result);
          console.log(result);
          console.log("parsetud");

          // averageFuel.instance.alle.forEach(function(element){
          //   var new_element = new all(element.fuelQuantity,element.fuelCost, element.trip);
          //   var li = document.createElement('li');
          //   console.log("TEST");
          //   var node = document.createTextNode(new_element.fuelQuantity);
          //   var li2 = document.createElement('li');
          //   console.log("mde");
          //   var node2 = document.createTextNode(new_element.fuelCost);
          //   var li3 = document.createElement('li');
          //   var node3 = document.createTextNode(new_element.trip);
          //   var result5 = document.getElementById('result5');
          //   li.appendChild(node);
          //   li2.appendChild(node2);
          //   li3.appendChild(node3);
          //   result5.appendChild(li);
          //   result5.appendChild(li2);
          //   result5.appendChild(li3);
          // });
          for(var element in averageFuel.instance.alle){
            var new_element = new all(element.fuelQuantity,element.fuelCost, element.trip);
            var li = document.createElement('li');
            console.log(averageFuel.instance.alle[element]);
            var node = document.createTextNode(new_element.fuelQuantity);
            var li2 = document.createElement('li');

            var node2 = document.createTextNode(new_element.fuelCost);
            var li3 = document.createElement('li');
            var node3 = document.createTextNode(new_element.trip);
            var result5 = document.getElementById('result5');
            li.appendChild(node);
            li2.appendChild(node2);
            li3.appendChild(node3);
            result5.appendChild(li);
            result5.appendChild(li2);
            result5.appendChild(li3);

          }
        }
      };
      xhttp.open("GET", "saveData.php", true);
      xhttp.send();
    }

    };
   window.onload = function() {
     var app = new averageFuel();
   };
   var all = function(new_fuelQuantity, new_fuelCost, new_trip){
        this.fuelQuantity = new_fuelQuantity;
        this.fuelCost = new_fuelCost;
        this.trip = new_trip;
      };


})();
