(function(){
    "use strict";

    var averageFuel = function(){
        if(averageFuel.instance){
            return averageFuel.instance;
        }

    averageFuel.instance = this;
    var fuelText = document.getElementById('output');
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
        var fromServer;
        this.getValuesListener();
        if((fromServer=this.fromServer()) != NULL){
          for(var i = 0; i<fromServer.length; i++)
        {
          var fuelText = document.getElementById('output');
          fuelText.innerHTML += fromServer [i].fuelCost;
        }}

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
      },

      toServer: function(fuelCost){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          console.log('salvestas serverisse');

        }
      };

      xhttp.open("GET", "saveData.php?fuelCost="+fuelCost, true);
      xhttp.send();

    },
    fromServer: function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          var result =JSON.parse(xhttp.responseText);

        }
      };
      xhttp.open("GET", "saveData.php", true);
      xhttp.send();
      return result;
    }

    };
   window.onload = function() {
     var app = new averageFuel();
   };

})();
