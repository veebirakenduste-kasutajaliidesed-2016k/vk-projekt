(function(){
  "use strict";

  var ClockApp = function(){
    if(ClockApp.instance){
      return ClockApp.instance;
    }
    ClockApp.instance = this;

    console.log(this);
    //console.log('moosipurgi sees');

    // KÕIK MUUTUJAD, mis on üldised ja muudetavad
    this.clock = document.getElementById('clock');
    this.currentTimeInMinutes = null;
    this.busDates = [];

    this.init();
  };

  ClockApp.prototype = {

    init: function(){
      console.log('rakendus käivitus');
      this.writeDate(); // selleks, et ei oleks näha 0:0:0
      window.setInterval(this.writeDate.bind(this), 500);
      //window.setInterval(this.writeBusDates.bind(this), 500);

      this.bindMouseEvents();
    },

    bindMouseEvents: function(){
      this.clock.addEventListener('click', function(event){
      });
    },

    writeDate: function(){
      var today = new Date();

      var hours = addZeroBefore(today.getHours());
      var minutes = today.getMinutes();
      var seconds = today.getSeconds();
      seconds = addZeroBefore(seconds);
      var day = today.getDate();
      var days = ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"];
      var year = today.getFullYear();

      this.currentTimeInMinutes = hours*60 + minutes;
      //console.log(this.currentTimeInMinutes);

      clock.innerHTML = hours + ':' + addZeroBefore(minutes) + ':' + seconds;
      //busTime.innerHTML = hours + ':' + addZeroBefore(minutes);
      //console.log(clockToCompare);
      date.innerHTML = addZeroBefore(today.getDate()) + "/" + addZeroBefore((today.getMonth()+1)) + "/" + year;
      weekday.innerHTML = "Täna on " + days[today.getDay()];
    },

    writeBusDates: function(){
      //console.log(this.busDates[0]);
      var bestIndex = -1;
      $.each(this.busDates, function(key, bus){


        var transportTimeInMinutes = bus.start.getHours()*60+ bus.start.getMinutes();
        //console.log(transportTimeInMinutes);

        var diff = transportTimeInMinutes - ClockApp.instance.currentTimeInMinutes;
        var hours = addZeroBefore(bus.start.getHours());
        var minutes = bus.start.getMinutes();

        //console.log(bus.route);

        if(diff > 0 && diff <= 180){
          if(bestIndex === -1){
            bestIndex = key;
             return true;

          }
          //Kuidas saada esimene element? See kustutada/mitte näidata ning järgmised kõik <ul><li>
          //console.log(bus.route);

          //console.log(bus.route.constructor.name);
          $('ul').append($('<li>', {
              //text: bus.route + ' ' +hours+":"+minutes + ' ' + diff
              text: bus.route + ' ' +hours+":"+minutes
          }));
        }
      });
      //console.log(bestIndex);
      //console.log(this.busDates);
      busNumber.innerHTML = this.busDates[bestIndex].route;
      busTime.innerHTML = this.busDates[bestIndex].start.getHours() + ":" +this.busDates[bestIndex].start.getMinutes();
      //kõik arvutused tehtud
      //$('li').first().css('background-color', 'red');
      //$('li').slice(1).css('background-color', 'green');
      //$('li').last().css('background-color', 'blue' );

    }
  };

  window.onload = function(){
    var app = new ClockApp();

    $.getJSON('routesToTallinn.json', {get_param: 'value'}, function(data){
      //localstorage'ga meeles hoida viimane valik
      //console.log(data);
      $.each(data, function(busLineNumber, busLineTime){

          for(var i = 0; i < busLineTime.start.length; i++){

            var t = busLineTime.start[i].split(":");

            var singleRoute = {
              route: busLineNumber,
              start: new Date("October 13, 2014 "+addZeroBefore(t[0])+":"+addZeroBefore(t[1])+":00")
            };

            ClockApp.instance.busDates.push(singleRoute);
          }

      });

      ClockApp.instance.busDates.sort(function(a, b) {
          a = a.start;
          b = b.start;
          return b>a ? -1 : b<a ? 1 : 0;
      });

      ClockApp.instance.writeBusDates();
    });
  };

  var addZeroBefore = function(number){
    if(number >= 0 && number < 10){
      number = "0" + number;
    }
    return number;
  };

})();
