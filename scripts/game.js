var container, stream = new Audio();
var camera, scene, renderer;
var raycaster;
var mouse, isDraggable = false;
var currentFrame;
var count = 0;
var PI2 = Math.PI * 2;
var programFill = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.fill();
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
var particles = [];

promise.then(function(result) {
	result.tracks.forEach(function (entry) {
		if(entry.streamable && entry.artwork_url !== null) {
			tracks.push(entry);
		}
	})
	// $%*)^£&^*"£^(*$)"!!! canvas
	tracks.forEach(function (entry) {
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
	})
	init();
	animate();
});
function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(1,0,1);
	scene = new THREE.Scene();
	// rows will be fixed
	var rows = 5;
	// columns probably dynamic, possibly scale also
	var columns = Math.floor(tracks.length / 5);

	// TODO: deal with remainder, accomodate last row for remainder IF remainder exists
	var remain = tracks.length % 5;
	for ( var i = 0; i < rows; i ++ ) {
		// angle equation gets messed up when j==0
		for ( var j = 1; j < columns + 1; j++) {
			var particle = new THREE.Sprite();
			var radius = 1200;
			var offset_angle = j*360/columns;
			var offset_random_angle = offset_angle*Math.random()/columns;
			var angle = (offset_angle - offset_random_angle)*Math.PI/180;
			particle.track = tracks[count];
			particle.position.y = i*300 - 550;
			particle.position.x = Math.cos(angle)*radius;
			particle.position.z = Math.sin(angle)*radius;
			particle.scale.x = particle.scale.y = 200;
			// custom material for each particle depending on track artwork
			// runs all the time... every particle need custom canvas program
			particle.programStroke = function ( context ) {
				context.lineWidth = 0.1;
				context.beginPath();
				context.arc( 0, 0, 0.5, 0, PI2, true );
				context.stroke();

			};
			particle.material = new THREE.SpriteCanvasMaterial( { color: 0x808080, program: programs[count] } );
			scene.add(particle);
			particles.push(particle);
			count++;
		}
	}

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth - 4, window.innerHeight - 4 );

	container.appendChild( renderer.domElement );

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
		if ( intersects.length > 0 && !isDraggable) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				if ( INTERSECTED ) INTERSECTED.material.program = programs[particles.indexOf(INTERSECTED)];
				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.material.program = programFill;
			}
		} else {
			if ( INTERSECTED ) INTERSECTED.material.program = programs[particles.indexOf(INTERSECTED)];
			INTERSECTED = null;
		}
	}
}
function onDocumentMouseUp( event ) {
	isDraggable = false;
}
function clearView() {
		camera.position.x += 5000;
		var howmany = scene.children.length;
		function f() {
		    scene.remove(scene.children[howmany]);
		    howmany--;
		    if( howmany >= 0 ){
		        setTimeout( f, 100 );
		    }
		}
		f();
}
function onDocumentMouseDown( event ) {
	// Cancel entire raycasting and streaming process if event is within bounding box of HTML element
	// Alternatives to this could be using jquery's height(), width()
	// using offsetWidth and offsetHeight (need to account for visibility change)
	var details = DETAILS[0].getBoundingClientRect();
	event.preventDefault();
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
			stream.src = CLICKED.track.stream_url + '?client_id=11ef1f02126a87ce1e2f29238977e930';
			stream.play();
			lerpCircle();
		} else {
			isDraggable = true;
		}
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
		if (CLICKED.scale.x >= 300) {
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
			CLICKED.material.color = new THREE.Color(Math.random() * 0xffffff);
			TEMP = null;
			CLICKED = null;
			cancelAnimationFrame( currentFrame );
		}
	}
}

var rotSpeed = 0.003;
var dragMultiplier = 30;
var last_mousex = 0;
function render() {
	var x = camera.position.x,
			z = camera.position.z;


		if(isDraggable) {
			camera.position.x = x * Math.cos(rotSpeed*dragMultiplier*mouse.x) - z * Math.sin(rotSpeed*dragMultiplier*mouse.x);
			camera.position.z = z * Math.cos(rotSpeed*dragMultiplier*mouse.x) + x * Math.sin(rotSpeed*dragMultiplier*mouse.x);
			last_mousex = mouse.x;
		} else if (INTERSECTED === null) {
			if(last_mousex < 0) {
				camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
				camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
			} else {
				camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
				camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
			}
		}
	camera.lookAt(scene.position);
	renderer.render( scene, camera );
}
function clickAudio() {
	if (stream.paused) {
      stream.play();
			document.getElementById("button").innerHTML = "Pause";
  }
  else {
      stream.pause();
			document.getElementById("button").innerHTML = "Play";
  }
}
