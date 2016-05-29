(function(){
    "use strict";

    var ClockApp = function(){

      // SEE ON SINGLETON PATTERN
      if(ClockApp.instance){
          return ClockApp.instance;
      }
      ClockApp.instance = this;

      //CACHE
      this.cache = window.applicationCache;
      this.startCacheListeners();

      this.busTimes_list = busTimes_list;
      this.new = true;

      this.clock = document.getElementById('clock');
      this.currentTimeInMinutes = null;
      this.busDates = [];

      this.init();
    };

    window.ClockApp = ClockApp;

    ClockApp.prototype = {

        init: function(){

          console.log('ClockApp started');
          this.writeDate(); // selleks, et ei oleks näha 0:0:0
          window.setInterval(this.writeDate.bind(this), 500);

          this.bindMouseEvents();

          $.ajax({
            type: "HEAD",
            url: document.location.pathname + "?param=" + new Date(),
            error: function(){
              ClockApp.instance.writeAllBusTimes();
              document.getElementById("busTimeContent").style.display = "block";
              document.getElementById("busText").style.display = "none";
              document.getElementById("busTime").style.display = "none";
              document.getElementById("busNumber").style.display = "none";
              document.getElementById("nextBusText").style.display = "none";
              document.getElementById("nextBusTimes").style.display = "none";
            },
            success: function(){
              return true;
            }
         });
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

          clock.innerHTML = hours + ':' + addZeroBefore(minutes) + ':' + seconds;
          date.innerHTML = addZeroBefore(today.getDate()) + "/" + addZeroBefore((today.getMonth()+1)) + "/" + year;
          weekday.innerHTML = "Täna on " + days[today.getDay()];
        },

        writeBusDates: function(){
          var bestIndex = -1;
          $.each(this.busDates, function(key, bus){

            var transportTimeInMinutes = bus.start.getHours()*60+ bus.start.getMinutes();
            var diff = transportTimeInMinutes - ClockApp.instance.currentTimeInMinutes;
            var hours = addZeroBefore(bus.start.getHours());
            var minutes = bus.start.getMinutes();

            if(diff > 0 && diff <= 120){
              if(bestIndex === -1){
                bestIndex = key;
                 return true;

              }

              $('ul').append($('<li>', {
                  //text: bus.route + ' ' +hours+":"+minutes + ' ' + diff
                  text: bus.route + ' ' +hours+":"+minutes
              }));
            }
          });
          busNumber.innerHTML = this.busDates[bestIndex].route;
          busTime.innerHTML = this.busDates[bestIndex].start.getHours() + ":" +this.busDates[bestIndex].start.getMinutes();
        },

        startCacheListeners: function(){
            window.applicationCache.addEventListener('updateready',function(){
                window.applicationCache.swapCache();
                console.log('swap cache has been called');
            },false);

            setInterval(function(){
                ClockApp.instance.cache.update();
            }, 10000);
        },
        writeAllBusTimes: function(){
            for (var i = 0; i < this.busTimes_list.length; i++){
                var nextBusTime = document.createElement('ul');
                nextBusTime.appendChild(document.createTextNode(this.busTimes_list[i]));
                document.getElementById('busTimeContent').appendChild(nextBusTime);
            }
        }
    }; // ClockApp LÕPP

    window.onload = function(){
        var app = new ClockApp();

        $.getJSON('routesToTallinn.json', {get_param: 'value'}, function(data){
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
