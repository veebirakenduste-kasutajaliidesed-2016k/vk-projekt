var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");
var position_x = 0;
var position_y = 0;
var direction_y = 1;
var direction_x = 0;
var snakeArray = [];
var SNAKE_SQUARE_SIZE = 15;
var isPoints = false;
var PointsArray = [];
var score = 0;
var highscore = 0;


// Localstorage
if(localStorage.getItem("highscore") !== null){
	highscore = localStorage.getItem("highscore");
	console.log("Current highscore:" +highscore);
}
function Point(x, y) {
	this.x = x;
	this.y = y;
}

snakeArray.push(new Point(0,30));
snakeArray.push(new Point(0,15));
snakeArray.push(new Point(0,0));

// KEYLISTENER
document.addEventListener('keydown', function(event) {
    // TURN LEFT
    if (event.keyCode == 37 && direction_x == 0) {
        direction_x = -1;
        direction_y = 0;
    }
    // TURN RIGHT
    else if (event.keyCode == 39 && direction_x == 0) {
        direction_x = 1;
        direction_y = 0;
    }
    // TURN UP
    else if (event.keyCode == 38 && direction_y == 0) {
    direction_x = 0;
    direction_y = -1;
    }
    // TURN DOWN
    else if (event.keyCode == 40 && direction_y == 0) {
    direction_x = 0;
    direction_y = 1;
    }

}, true);


var gameloop = setInterval(drawSnake, 60);

function drawSnake(){
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, a_canvas.width, a_canvas.height);

// SCore
ctx.fillStyle = "red";
ctx.font="15px Verdana";
ctx.fillText("Score: "+score, 300, 20);
ctx.fillText("High score: "+highscore, 300, 35);

// Snake
for (var i = snakeArray.length - 1; i >= 0; i--) {
	ctx.fillStyle = "red";
	ctx.fillRect(snakeArray[i].x, snakeArray[i].y, SNAKE_SQUARE_SIZE - 1, SNAKE_SQUARE_SIZE - 1);
	ctx.fillStyle = "grey";
	ctx.rect(snakeArray[i].x, snakeArray[i].y, SNAKE_SQUARE_SIZE, SNAKE_SQUARE_SIZE);

	if(i != 0) {
	snakeArray[i].x = snakeArray[i - 1].x;
	snakeArray[i].y = snakeArray[i - 1].y;
	}
}

if (!isPoints) {
	var Points_x = 0;
	var Points_y = 0;
	do {
		Points_x = Math.floor((Math.random() * 435));
		Points_y = Math.floor((Math.random() * 435));
	} while (Points_x % 15 != 0 && Points_y % 15 != 0);

	PointsArray[0] = new Point(Points_x, Points_y);
	isPoints = true;

	// Points not on top of the snake
	for (var i = snakeArray.length - 1; i > 2; i--) {
		if(Points_x == snakeArray[i].x && Points_y == snakeArray[i].y){
			isPoints = false;
		}
	}
}

if(isPoints){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(PointsArray[0].x, PointsArray[0].y, 14, 14);
}

snakeArray[0].y += 15 * direction_y;
snakeArray[0].x += 15 * direction_x;
// Collision
if (snakeArray[0].y <= -15 || snakeArray[0].y >= a_canvas.height) {
	clearInterval(gameloop);
	gameOver();
}

if (snakeArray[0].x <= -15 || snakeArray[0].x >= a_canvas.width) {
	clearInterval(gameloop);
	gameOver();
}

if (snakeArray[0].x <= ((PointsArray[0].x) + 10) && snakeArray[0].x >= ((PointsArray[0].x) - 10)  && snakeArray[0].y <= ((PointsArray[0].y) + 10) && snakeArray[0].y >= ((PointsArray[0].y) - 10)) {
	isPoints = false;
	p = new Point(snakeArray[snakeArray.length - 1].x, snakeArray[snakeArray.length - 1].y);
	snakeArray.push(new Point(p.x, p.y));
	score += 10;
}

// Collision
for (var i = snakeArray.length - 1; i > 2; i--) {
	if(snakeArray[0].x == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y){
		clearInterval(gameloop);
		gameOver();
	}
}


}
function gameOver() {
	ctx.fillStyle = "#FFFFFF";
	ctx.font= "30px Verdana";
	ctx.fillText("Game Over", a_canvas.width / 2 - 90, a_canvas.height / 2);
	if(score > highscore) {
		localStorage.highscore = score;
		var answer = confirm("NEW HIGHSCORE: "+score+ "\nNew game?");
			if (answer == true) {
    		location.reload();
			}

	} else {
		var answer = confirm("New game?");
			if (answer == true) {
    		location.reload();
			}
	}

}
