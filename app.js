(function(){
    "use strict";

    var averageFuel = function(){
        if(averageFuel.instance){
            return averageFuel.instance;
        }

    averageFuel.instance = this;
    this.fuelText = document.getElementById('output');

    this.init();  //SIIA PANED ALGSE FUNKTSIOONI

    };

    window.averageFuel = averageFuel;

    averageFuel.prototype = {

      //siia funktsiionid
      /*
      funktsiooniNimi: function(){



    },


      */

      init:function(){
        var serverData=[];
        serverData = this.fromServer();

        if(serverData !== null){
          for(var i = 0; i<serverData.length; i++){
            averageFuel.instance.fuelText.innerHTML += fromServer [i].fuelCost;
            this.getValuesListener();
        }
      }else{
        this.getValuesListener();
      }

      },

      getValuesListener: function(){
        document.getElementById('button').addEventListener('click', this.getValues.bind(this));

      },

      getValues: function(){
        var fuelQuantity = document.getElementById('fuelQuantity').value;
        var fuelCost = document.getElementById('fuelCost').value;
        var trip = document.getElementById('trip').value;
        var fuelCostText = document.getElementById('output');
        fuelCostText.innerHTML = fuelCost;


        console.log(fuelQuantity);
        console.log(fuelCost);
        console.log(trip);
        this.toServer(fuelQuantity, fuelCost, trip);
        this.fuelWasted(trip, fuelQuantity);
      },
      fuelWasted:function(trip, fuelQuantity){
        var average = fuelQuantity/(trip/100);
        console.log(average);
      },
      //moneyWasted:function()

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


          var result =JSON.parse(xhttp.responseText);
          return result;
        }
      };
      xhttp.open("GET", "saveData.php", true);
      xhttp.send();
    }

    };
   window.onload = function() {
     var app = new averageFuel();
   };

})();
