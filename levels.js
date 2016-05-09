(function(){
  "use strict";

  var Levels = function() {

    if(Levels.instance) {
      return Levels.instance;
    }

    Levels.instance = this;

    this.init();
    };

    window.Levels = Levels;

    Levels.prototype = {
      init: function() {


      },

      level1: function() {
        var x = 0, y = 12;
        for (var i = 0; i < 68; i++) {
            if ((x + 30) > myGameArea.canvas.width) {
                x = 0;
                y = y + 15;
            }
            if (x === 0) {
              x = 20;
            }
            x = x + 5;
            myObstacles.push(new component(30, 10, "red", x, y));
            x = x + 30;
        }
      },

      level2: function() {
        var x = 0, y = 12;
        for (var i = 0; i < 90; i++) {

            if ((x + 30) > myGameArea.canvas.width) {
                x = 0;
                y = y + 15;
            }

            if (x === 0) {
              x = 20;
            }
            if(x % 4 === 0) {
              x = x + 20;
            } else {
              x = x + 5;
            }


            myObstacles.push(new component(30, 10, "red", x, y));
            x = x + 30;
        }
      },

      level3: function() {
        var x = 0, y = 12;
        for (var i = 0; i < 50; i++) {

            if ((x + 30) > myGameArea.canvas.width) {
                x = 0;
              }

              if(x % 2 === 0) {
                y = y + 15;
              } else {
                y = y - 20;
              }


            if (x === 0) {
              x = 20;
            }
            if(x % 4 === 0) {
              x = x + 20;
            } else {
              x = x + 5;
            }


            myObstacles.push(new component(30, 10, "red", x, y));
            x = x + 30;
        }
      }


    };


    window.onload = function() {
      var app = new Levels();

    };


}) ();
