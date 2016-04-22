/*
	Problem 1: pixel bleeding on visualizer.
		Possible reason 1: intersecting canvas
		Possible reason 2: requestAnimationFrame lagging behind
		Possible reason 3: WebGL
		Possible reason 4: Canvas itself
		Possible reason 5: camera or renderer
	Solution 1: fill entire visualizer with canvas background, then render bars
					* this also solved alpha problem
*/
// Some CORS nonsense thing
var audioElement = new Audio();
audioElement.crossOrigin = "anonymous";
var camera, scene, renderer;
var raycaster;
var mouse, isDraggable = false;
var currentFrame;
var count = 0;
var radius = 1200;
var h = window.innerHeight/6;
var PI2 = Math.PI * 2;
var programFill = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.fill();
};
var barAmount = 80
var binOffset = Math.cos(Math.PI/4)*radius*4/barAmount;
// Canvas magic for the visualizer sprite
var programVisualize = function ( context ) {
	//canvas nonsense
	context.fillStyle = "white";
	context.fillRect(-79 * binOffset,-h*1.8,binOffset*160,255*1.7*2);
	for(bin = 0; bin < audioSource.streamData.length; bin ++) {
        var val = audioSource.streamData[bin];
				context.fillStyle = "rgb(255,"+(85+(Math.ceil(115*bin/45)))+",0)";
        context.fillRect(-bin * binOffset, h, binOffset - 4, val*1.5);
				context.fillRect(bin * binOffset + binOffset, h, binOffset - 4, val*1.5);
				context.fillStyle = "rgba(255,"+(85+(Math.ceil(115*bin/45)))+",0,0.4)";
				context.fillRect(-bin * binOffset, h+0.5, binOffset - 4, -val*1.5);
				context.fillRect(bin * binOffset + binOffset, h+0.5, binOffset - 4, -val*1.5);
  }
};
var INTERSECTED;
var CLICKED;
var TEMP;
var DETAILS = document.getElementsByClassName("details");

// Pagination version - sucks
/*function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, false); // true for asynchronous, don't want async, while loop overlaps and breaks
    xmlHttp.send();
}

var tracks = [];
promise.then(function(result) {
	var next_href = result.next_href;
	result.collection.forEach(function(entry) {
		if(entry.playback_count > 1000 && entry.genre !== null) {
			tracks.push(entry);
		}
	});
	while(tracks.length < 50 && next_href !== undefined) {
		httpGetAsync(next_href, function(response) {
			next_href = response.next_href;
			response.collection.forEach(function(entry) {
				if(entry.playback_count > 1000 && tracks.length < 50 && entry.genre !== null) {
					tracks.push(entry);
				}
			});
		});
	}
	init();
	animate();
}); */
var tracks = [];
var programs = [];

promise.then(function(result) {
	result.tracks.forEach(function (entry) {
		if(entry.streamable && entry.artwork_url !== null) {
			// $%*)^£&^*"£^(*$)"!!! canvas
			var imgDOM = new Image();
			imgDOM.src = entry.artwork_url;

			var container = function ( context ) {
				context.lineWidth = 0.1;
				context.beginPath();
				context.arc( 0, 0, 0.5, 0, PI2, true );
				context.stroke();
				context.clip();
				context.scale(1,-1);
				context.drawImage(imgDOM,-0.6,-0.6,1.2, 1.2);
			};
			programs.push(container);
			tracks.push(entry);
		}
	})

	init();
	animate();
});
function generate(permalink) {
	SC.get('/playlists', {
		q: permalink
	}).then(function (e) {
		if(e.length > 0) {
			clearView();
			SC.get('/playlists/'+e[0].id, {
			}).then(function (result) {
				result.tracks.forEach(function (entry) {
					if(entry.streamable && entry.artwork_url !== null) {
						var imgDOM = new Image();
						imgDOM.src = entry.artwork_url;

						var container = function ( context ) {

							context.lineWidth = 0.1;
							context.beginPath();
							context.arc( 0, 0, 0.5, 0, PI2, true );
							context.stroke();
							context.clip();
							context.scale(1,-1);
							context.drawImage(imgDOM,-0.5,-0.5,1, 1);
						};
						programs.push(container);
						tracks.push(entry);
					}
				})
				createTracks();

			});
		} else {
			console.log("NOPE");
		}
	});
}
var AudioSource = function() {
    var self = this;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext); // shimmy shim shim
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    var source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    var sampleAudioStream = function() {
        analyser.getByteFrequencyData(self.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i < barAmount; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += self.streamData[i];
        }
        self.volume = total;
    };
		// no point running through entire sampleAudioStream, if audioElement is paused, shim in a function
    setInterval(function() {
		  if(!audioElement.paused) {
		    sampleAudioStream();
		  }
		}, 20); // every 20ms
    this.volume = 0;
    this.streamData = new Uint8Array(barAmount); // fftSize/2
    this.play = function(streamUrl) {
        audioElement.setAttribute('src', streamUrl); // AudioSource.play(stream_url)
        audioElement.play();
    }
};
var audioSource = new AudioSource();
function createTracks() {
	// rows will be fixed
	var rows = 5;
	// columns probably dynamic, possibly scale also
	var columns = Math.floor(tracks.length / rows);

	// TODO: deal with remainder, accomodate last row for remainder IF remainder exists
	var remain = tracks.length % rows;
	var divider = Math.ceil(tracks.length/100);
	for ( var i = 0; i < rows; i ++ ) {
		// angle equation gets messed up when j==0
		for ( var j = 1; j < columns + 1; j++) {
			var particle = new THREE.Sprite();
			var offset_angle = j*360/columns;
			var offset_random_angle = offset_angle*Math.random()/columns;
			var angle = (offset_angle - offset_random_angle)*Math.PI/180;
			particle.track = tracks[count];
			particle.position.y = i*300 - 550;
			particle.position.x = Math.cos(angle)*radius;
			particle.position.z = Math.sin(angle)*radius;
			particle.scale.x = particle.scale.y = 200/divider + Math.random()*50;
			// custom material for each particle depending on track artwork
			// runs all the time... every particle need custom canvas program
			particle.programStroke = function ( context ) {
				context.lineWidth = 0.1;
				context.beginPath();
				context.arc( 0, 0, 0.5, 0, PI2, true );
				context.stroke();

			};
			particle.material = new THREE.SpriteCanvasMaterial( { color: Math.random() * 0xffaa00, program: programs[count] } );
			scene.add(particle);
			count++;
		}
	}
}
function createScene() {

	// FoV will affect the width of 3D objects and related trig calcs
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1701 );
	scene = new THREE.Scene();
	var visualizer = new THREE.Sprite(new THREE.SpriteCanvasMaterial( { program: programVisualize } ));

	visualizer.position.x = radius + 500;
	scene.add(visualizer);
	createTracks();
}
function init() {
	createScene();

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth - 3, window.innerHeight - 3 );

	document.body.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth - 4, window.innerHeight - 4);
}
function onDocumentMouseMove( event ) {
	// if mouse is within bounding box, run logic, otherwise don't bother
	var details = DETAILS[0].getBoundingClientRect();
	event.preventDefault();
	if(!(event.clientX < details.width && event.clientY < details.height)) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		// find intersections for hover effect
		// used to be in render(), not sure of pros/cons.
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children );
		//-----------------------------------------------------------v 0 is visualizer ID
		if ( intersects.length > 0 && !isDraggable && scene.children.indexOf(intersects[0].object != 0)) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if ( INTERSECTED ) INTERSECTED.material.program = programs[scene.children.indexOf(INTERSECTED) - 1];
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.program = programFill;
			}
		} else {
			if ( INTERSECTED ) INTERSECTED.material.program = programs[scene.children.indexOf(INTERSECTED) - 1];
			INTERSECTED = null;
		}
	}
}
function onDocumentMouseUp( event ) {
	isDraggable = false;
}
function clearView() {
		count = 0;
		INTERSECTED = CLICKED = null;
		DETAILS[0].className = "details hidden";
		audioElement.pause();
		audioSource.streamData = new Uint8Array(barAmount);
		tracks = [];
		programs = [];
		while(scene.children.length != 1) {
			scene.children.pop();
		}
}
function onDocumentMouseDown( event ) {
	// Cancel entire raycasting and streaming process if event is within bounding box of HTML element
	// Alternatives to this could be using jquery's height(), width()
	// using offsetWidth and offsetHeight (need to account for visibility change)
	var details = DETAILS[0].getBoundingClientRect();
	event.preventDefault();
	switch (event.which) {
	  case 1:
			if(!(event.clientX < details.width && event.clientY < details.height)) {
				mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 && !CLICKED) {
					CLICKED = intersects[ 0 ].object;
					TEMP = CLICKED.scale.x;
					DETAILS[0].className = "details";
					document.getElementById("title").innerHTML = '<a href="'+ CLICKED.track.permalink_url + '">' + CLICKED.track.title + '</a>';
					document.getElementById("genre").innerHTML = CLICKED.track.genre;
					document.getElementById("user").innerHTML =
						'<a href="'+ CLICKED.track.user.permalink_url + '">' + CLICKED.track.user.username + '</a>';
					document.getElementById("comment").innerHTML = CLICKED.track.comment_count;
					document.getElementById("playback").innerHTML = CLICKED.track.playback_count;
					document.getElementById("favourite").innerHTML = CLICKED.track.favoritings_count;
					// stream player provided is bad, clashing with flash nonsense
					/*SC.stream('/tracks/' + CLICKED.track.id).then(function(player){
						player.play();
						player.on(play, function(e) {

						});
					});*/
					document.getElementById("button").innerHTML = "Pause";
					audioSource.play(CLICKED.track.stream_url + '?client_id=11ef1f02126a87ce1e2f29238977e930');
					lerpCircle();
				}
			}
	    break;
	  case 2:
	    break;
	  case 3:
			isDraggable = true;
      break;
	  default:
			console.log("weird mouse");
	}
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function lerpCircle() {
	if( CLICKED ) {
		currentFrame = requestAnimationFrame( lerpCircle );
		CLICKED.scale.x = CLICKED.scale.y += 8;
		if (CLICKED.scale.x >= TEMP*1.5) {
			cancelAnimationFrame( currentFrame );
			lerpCircleBack();
		}
	}
}

function lerpCircleBack() {
	if (CLICKED.scale.x > TEMP) {
		currentFrame = requestAnimationFrame( lerpCircleBack );
		CLICKED.scale.x = CLICKED.scale.y -= 6;
		if (CLICKED.scale.x <= TEMP) {
			CLICKED.material.color = new THREE.Color(0xffaa00);
			TEMP = null;
			CLICKED = null;
			cancelAnimationFrame( currentFrame );
		}
	}
}

var rotSpeed = 0.003;
var dragMultiplier = 30;
// save x coordinate so on mouse release, auto-rotate knows which direction to rotate
var lastMouseX = 0;
function render() {
	var x = scene.children[0].position.x,
			z = scene.children[0].position.z;

	if(isDraggable) {
		scene.children[0].position.x = x * Math.cos(rotSpeed*dragMultiplier*mouse.x) - z * Math.sin(rotSpeed*dragMultiplier*mouse.x);
		scene.children[0].position.z = z * Math.cos(rotSpeed*dragMultiplier*mouse.x) + x * Math.sin(rotSpeed*dragMultiplier*mouse.x);
		lastMouseX = mouse.x;
	} else if (INTERSECTED === null) {
		if(lastMouseX < 0) {
			scene.children[0].position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
			scene.children[0].position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
		} else {
			scene.children[0].position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
			scene.children[0].position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
		}
	}

	camera.lookAt(scene.children[0].position);
	renderer.render( scene, camera );
}
function clickAudio() {
	if (audioElement.paused) {
      audioElement.play();
			document.getElementById("button").innerHTML = "Pause";
  }
  else {
      audioElement.pause();
			document.getElementById("button").innerHTML = "Play";
  }
}
