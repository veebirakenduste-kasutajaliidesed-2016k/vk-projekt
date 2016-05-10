function playgame() {
    if (!myGameArea.interval) {
        myGameArea.interval = setInterval(updateGameArea, 20);
    } else {
        myGameArea.pause = false;
    }
}
function pausegame() {
    myGameArea.pause = true;
}

var name = "";

while(name === "") {
  if(localStorage.getItem("name")) {
    name = localStorage.getItem("name");
  } else {
    name = prompt("Sisesta nimi");
  }

  if(name === 'null') {
    name = "";
  }
  if(name.length > 0) {
    localStorage.setItem("name", name);
  }
}

var lives = 3;
var myball;
var myGamePiece;
var myObstacles = [];
this.ballcolor = "white";
this.pieceColor = "yellow";

function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 10, this.pieceColor, myGameArea.canvas.width / 2 - 50, myGameArea.canvas.height - 20);
    myball = new component(10, 10, this.ballcolor, myGameArea.canvas.width / 2 - 2.5 - 100, 110);
    myGameArea.currentlevel = 1;
    myGameArea.level = Levels.instance.level1();
    myGameArea.setsize();
    myball.speedY -= 2;
    myball.speedX -= 2;
}

function updateBall() {
  if(this.ballcolor === "blue") {
    myball = new component(3, 3, this.ballcolor, myball.x, myball.y);

  } else {
    myball = new component(10, 10, this.ballcolor, myball.x, myball.y);
  }
  myball.speedY -= 2;
  myball.speedX -= 2;
}

function updatePiece() {
  if(this.pieceColor === "blue") {
    myGamePiece = new component(30, 10, this.pieceColor, myGamePiece.x, myGamePiece.y);
  } else if(this.pieceColor === "yellow"){
    myGamePiece = new component(100, 10, this.pieceColor, myGamePiece.x, myGamePiece.y);
  } else if(this.pieceColor === "red"){
    myGamePiece = new component(200, 10, this.pieceColor, myGamePiece.x, myGamePiece.y);
  }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.lives = 3;
        this.score = 0;
        localStorage.setItem("score", this.score);
        this.canvas.width = 640;
        this.canvas.height = 250;
        this.pause = false;
        this.frameNo = 0;
        this.canvas.style.cursor = "none"; //hide the original cursor
        this.context = this.canvas.getContext("2d");
        myGameArea.interval = setInterval(updateGameArea, 20);

        setInterval(function() {
          myGameArea.score = localStorage.getItem("score");
          myGameArea.context.fillStyle = "red";
          myGameArea.context.font = "30px Arial";
          myGameArea.context.fillText(myGameArea.score,180,90);
        }, 10);

        function drawLives() {
          setInterval(function() {
            myGameArea.context.font = "25px Arial";
            myGameArea.context.fillStyle = "blue";
            myGameArea.context.fillText("Lives: "+lives, 10,200);

          }, 1);


          }
          drawLives();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        });
        window.addEventListener('devicemotion', function (e) {
            e.preventDefault();
            var orientation = window.orientation;
            if (orientation === 0) {
                myGameArea.tiltX = e.accelerationIncludingGravity.x / myGameArea.scale;
                myGameArea.tiltY = -(e.accelerationIncludingGravity.y / myGameArea.scale);
            } else if (orientation == 90) {
                myGameArea.tiltY = -(e.accelerationIncludingGravity.x / myGameArea.scale);
                myGameArea.tiltX = -(e.accelerationIncludingGravity.y / myGameArea.scale);
            } else if (orientation == -90) {
                myGameArea.tiltY = e.accelerationIncludingGravity.x / myGameArea.scale;
                myGameArea.tiltX = e.accelerationIncludingGravity.y / myGameArea.scale;
            }
        });
        window.addEventListener('resize', function (e) {
            myGameArea.setsize();
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        this.pause = true;
        alert("Soovid uuesti mängida?");
       document.location.reload();
    },
    setsize : function() {
        this.ratio = this.canvas.height / this.canvas.width,
        this.currentWidth = window.innerWidth;
        this.currentHeight = this.currentWidth * this.ratio;
        this.canvas.style.width = this.currentWidth - 20 + "px";
        this.canvas.style.height = this.currentHeight + "px";
        this.scale = this.currentWidth / this.canvas.width;
    }

};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.crashLeft = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        if (myleft < otherleft && myright > otherleft && mytop < otherbottom && mybottom > othertop) {
            crash = true;
        }
        return crash;
    };
    this.crashRight = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = false;
        if (myright > otherright && myleft < otherright && mytop < otherbottom && mybottom > othertop) {
            crash = true;
        }
        return crash;
    };
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
    this.hitLeftBoundary = function() {
        var hit = false;
        var leftPos = this.x;
        if (leftPos <= 0) {
            hit = true;
        }
        return hit;
    };
    this.hitRightBoundary = function() {
        var hit = false;
        var rightPos = this.x + this.width;
        if (rightPos > myGameArea.canvas.width) {
            hit = true;
        }
        return hit;
    };
    this.hitTopBoundary = function() {
        var hit = false;
        var topPos = this.y;
        if (topPos <= 0) {
            hit = true;
        }
        return hit;
    };
    this.hitBottomBoundary = function() {
        var hit = false;
        var bottomPos = this.y + (this.height);
        if (bottomPos >= myGameArea.canvas.height) {
            hit = true;
        }
        return hit;
    };
    this.hitAnyBoundary = function() {
        if (this.hitLeftBoundary()) {return true;}
        if (this.hitRightBoundary()) {return true;}
        if (this.hitTopBoundary()) {return true;}
        if (this.hitBottomBoundary()) {return true;}
        return false;
    };
}
var lastspeedX = 0;
var ss = 0;
function updateGameArea() {
    var msg = "";
    var x, y, speed = 0;

    if(myObstacles.length === 0) {
      msg = new SpeechSynthesisUtterance("WOW MLG 420 SMOKE JAVASCRIPT ALL DAY");
      msg.pitch = 2;
      window.speechSynthesis.speak(msg);
      if(myGameArea.currentlevel === 1) {
        myGameArea.level = Levels.instance.level2();
        myGameArea.currentlevel++;
      }else if(myGameArea.currentlevel === 2) {
        myGameArea.level = Levels.instance.level3();
        myGameArea.currentlevel++;
      }
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        if (myball.crashWith(myObstacles[i])) {
          var random = Math.random();
          if(random > 0.2 && random < 0.3) {
            this.ballcolor = "orange";
            this.updateBall();
          } else if(random < 0.05) {
            this.ballcolor = "white";
            this.updateBall();
            this.pieceColor = "yellow";
            this.updatePiece();
          } else if(random > 0.3 && random < 0.5) {
            this.ballcolor = "blue";
            this.updateBall();
          } else if(random > 0.5 && random < 0.7) {
            this.pieceColor = "blue";
            this.updatePiece();
          } else if(random > 0.8 && random < 0.9) {
            this.pieceColor = "red";
            this.updatePiece();
          }
          if(this.ballcolor === "orange") {

          } else if(this.ballcolor !== "orange") {
            if (myball.crashLeft(myObstacles[i]) || myball.crashRight(myObstacles[i])) {
                myball.speedX = -(myball.speedX);
            } else {
                myball.speedY = -(myball.speedY);
            }
          }
            msg = new SpeechSynthesisUtterance("o");
            msg.pitch = 2;
            window.speechSynthesis.speak(msg);
            myObstacles.splice(i, 1);
            myGameArea.score++;
            localStorage.setItem("score", myGameArea.score);
            msg = new SpeechSynthesisUtterance(myGameArea.score);
            msg.pitch = 2;
            window.speechSynthesis.speak(msg);
        }
    }
    if (myGameArea.tiltX) {
        myGamePiece.speedX = myGameArea.tiltX + 1;
    }
    if (myGameArea.x) {
        myGamePiece.x = myGameArea.x;
        if (lastspeedX) {speed = (myGameArea.x - lastspeedX) / 2; }
        lastspeedX = myGameArea.x;
    }
    if (myball.crashWith(myGamePiece)) {
        msg = new SpeechSynthesisUtterance("haha");
        msg.pitch = 2;
        window.speechSynthesis.speak(msg);
        myball.speedY = -(myball.speedY);
        myball.speedX = myball.speedX + speed;
        if (myball.speedX > 2) {myball.speedX = 2; }
    }
    if (myball.hitLeftBoundary()) {
        myball.speedX = -(myball.speedX);
    }
    if (myball.hitRightBoundary()) {
        myball.speedX = -(myball.speedX);
    }
    if (myball.hitTopBoundary()) {
        myball.speedY = -(myball.speedY);
    }
    if (myball.hitBottomBoundary()) {
        myGameArea.stop();
    }
    if (myGamePiece.hitAnyBoundary()) {
        if (myGamePiece.x < 0) {myGamePiece.x = 0;}
        if (myGamePiece.x > myGameArea.canvas.width - myGamePiece.width) {myGamePiece.x = myGameArea.canvas.width - myGamePiece.width;}
    }
    if (myGameArea.pause === false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].update();
        }
        myball.x += myball.speedX;
        myball.y += myball.speedY;
        myball.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;
        myGamePiece.update();
        if (myGameArea.frameNo == 1) {
            myGameArea.pause = true;
        }
    }
}
