var canvas, health = 0;
var ctx,

balls = [];

var startTime, ballCount = 1, hits = 0;
var clock;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	drawBalls(1);

	balls[0].draw();

	startTime = new Date();

	canvas.addEventListener("click", control);
	clock = window.setInterval(increase, 200);
};

function drawBalls(amount){
	var suvx, suvy;
	for(var i = 0; i < amount; i++){
		suvx = Math.floor(Math.random() * (canvas.width - 60)) + 30;
		suvy = Math.floor(Math.random() * (canvas.height - 60)) + 30;
		balls.push(new Ring(suvx, suvy, 30));
	}
}

function increase(){

	document.getElementById("time").innerHTML = (new Date() - startTime) / 1000;

	canvas.width = canvas.width;

	for(var i = 0; i < balls.length; i++){
		if(balls[i].grow()){
			health++;
			console.log(health);
			balls.splice(i, 1);
			drawBalls(1);
		}
	}

	for(i = 0; i < balls.length; i++){
		balls[i].draw();
	}

	document.getElementById("score").innerHTML = "";
	for(i = 0; i < health; i++){
		document.getElementById("score").innerHTML += "x";
	}

	if(health > 5){
		window.clearInterval(clock);
		window.alert("You lose");
	}

}

function control(e){
	for(var i = 0; i < balls.length; i++){
		if(balls[i].hitDetect(e.clientX, e.clientY)){
			balls.splice(i, 1);
			hits++;
			if(hits === 10){
				//ballCount++;
			}
			drawBalls(ballCount);
			break;
		}
	}
}

function Ring(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.grow = function(){
		this.r += 1;
		if(this.r < 5){
			return true;
		}else{
			return false;
		}
	};
	this.hitDetect = function(mx, my){
		return pythagoras(this.x, this.y, mx, my) <= this.r;
	};
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.fill();
	};
}

function pythagoras(ux, uy, mx, my){
	return Math.sqrt(Math.pow(ux - mx, 2) + Math.pow(uy - my, 2));
}

var canvas, health = 0;
var ctx,
	balls = [];

var startTime, ballCount = 1, hits = 0;
var clock;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	drawBalls(1);

	balls[0].draw();

	startTime = new Date();

	canvas.addEventListener("click", control);
	clock = window.setInterval(increase, 40);
};

function drawBalls(amount){
	var suvx, suvy;
	for(var i = 0; i < amount; i++){
		suvx = Math.floor(Math.random() * (canvas.width - 60)) + 30;
		suvy = Math.floor(Math.random() * (canvas.height - 60)) + 30;
		balls.push(new Ring(suvx, suvy, 30));
	}
}

function increase(){

	document.getElementById("time").innerHTML = (new Date() - startTime) / 1000;



	canvas.width = canvas.width;

	for(var i = 0; i < balls.length; i++){
		if(balls[i].grow()){
			health++;
			console.log(health);
			balls.splice(i, 1);
			drawBalls(1);
		}
	}

	for(i = 0; i < balls.length; i++){
		balls[i].draw();
	}

	document.getElementById("score").innerHTML = "";
	for(i = 0; i < health; i++){
		document.getElementById("score").innerHTML += "x";
	}

	if(health > 5){
		window.clearInterval(clock);
		var tulemus = Math.round((new Date() - startTime) / 1000);
		window.alert("You lose");
	}

}

function control(e){
	for(var i = 0; i < balls.length; i++){
		if(balls[i].hitDetect(e.clientX, e.clientY)){
			balls.splice(i, 1);
			hits++;
			if(hits === 10){
				//ballCount++;
			}
			drawBalls(ballCount);
			break;
		}
	}
}

function Ring(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.grow = function(){
		this.r += 0.75;
		if(this.r > 75){
			return true;
		}else{
			return false;
		}
	};
	this.hitDetect = function(mx, my){
		return pythagoras(this.x, this.y, mx, my) <= this.r;
	};
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.fill();
	};
}

function pythagoras(ux, uy, mx, my){
	return Math.sqrt(Math.pow(ux - mx, 2) + Math.pow(uy - my, 2));
}
