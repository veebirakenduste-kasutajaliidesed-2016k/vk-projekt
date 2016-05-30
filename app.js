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
    this.alle = [{}];
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

          var result =JSON.parse(JSON.parse(xhttp.responseText));
          //console.log(result);
          averageFuel.instance.alle = result;
          //console.log(result);
          console.log("parsetud");

          // averageFuel.instance.alle.forEach(function(element){
          //   console.log(element);
          //   var new_element = new all(element.fuelQuantity,element.fuelCost, element.trip);
          //   console.log(new_element);
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
          var totaltrip = 0;
          var totalLiters = 0;
          var totalMoneys = 0;
          for(var i in averageFuel.instance.alle){

            var element =  averageFuel.instance.alle[i];
            //console.log(element);
            var new_element = new all(element.fuelQuantity,element.fuelCost, element.trip);
            //var tr = '<tr>';
            var li = document.createElement('li');
            //console.log(averageFuel.instance.alle[element]);
            var node = document.createTextNode( new_element.fuelQuantity +' liitrit ' + new_element.fuelCost +' € eest ja trip oli: '+ new_element.trip );
            var floor = Math.floor;
            //tripp kokku
            var trip = floor(new_element.trip);
            for (var f = 0; f<trip.length; f++){
              trip.splice(3,trip);
            }
            totaltrip = totaltrip + trip;
            console.log(totaltrip);
            //kütuse liitrid kokku
            var liters = floor(new_element.fuelQuantity);
            for (var d = 0; d<liters.length; d++){
              liters.splice(3,liters);
            }
            totalLiters = totalLiters + liters;
            console.log(totalLiters);
            //raha kulu kokku
            var moneys = floor(new_element.fuelCost);
            for (var r = 0; r<moneys.length; r++){
              moneys.splice(3,moneys);
            }
            totalMoneys = totalMoneys + moneys;
            console.log(totalMoneys);

            //trip.splice(3,0,trip);

            //console.log(element.trip[0]);
          //  console.log(element.trip[1]);
          //  console.log(element.trip[2]);

            //console.log(totaltrip);
            // var li2 = document.createElement('li');
            //
            // var node2 = document.createTextNode( new_element.fuelCost);
            // var li3 = document.createElement('li');
            // var node3 = document.createTextNode(new_element.trip);
            //var tr2 = '</tr>';
            var result5 = document.getElementById('result5');
          //  console.log(result5);

             li.appendChild(node);
            // li2.appendChild(node2);
            // li3.appendChild(node3);
            //console.log(node);
            //result5.appendChild(tr);
            result5.appendChild(li);
            // result5.appendChild(li2);
            // result5.appendChild(li3);
            //result5.appendChild(tr2);
            console.log(result5);
          //  result5.appendCHild();

          }
          var totalCosts = document.getElementById('totalCosts');
          var totalFuels = document.getElementById('totalFuels');
          var totalTrips = document.getElementById('totalTrips');
          totalTrips.innerHTML = "Kokku oled sõitnud "+totaltrip+" kilomeetrit";
          totalFuelCosts.innerHTML = "Kokku oled kulutanud "+totalLiters+" liitrit kütust " + totalMoneys + " € eest.";

          // var htmlToInsert = '<table>';
          // for (var i = 0; i < result.length; i++) {
          //   htmlToInsert += '<tr>';
          //   htmlToInsert += '<td>' + result[i].fuelCost + '</td>';
          //   htmlToInsert += '<td>' + result[i].fuelQuantity + '</td>';
          //   htmlToInsert += '<td>' + result[i].trip + '</td>';
          //
          //   htmlToInsert += '</tr>';
          //   htmlToInsert += '</table>';
          // }
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
