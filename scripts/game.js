var container;
var camera, scene, renderer;
var raycaster;
var mouse;
var currentFrame;
var PI2 = Math.PI * 2;
var programFill = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.fill();
};
var programStroke = function ( context ) {
	context.lineWidth = 0.025;
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.stroke();
};
var INTERSECTED;
var CLICKED;
var TEMP;
init();
animate();
function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 0 );
	scene = new THREE.Scene();
	array = [];
	var rows = 10;
	var columns = 10;
	for ( var i = 0; i < rows; i ++ ) {
		for( var j = 0; j < columns; j++) {
			var particle = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0x808080, program: programStroke } ) );
			var radius = 600;
			var offset_angle = 360/columns;
			var offset_random_angle = Math.floor(Math.random() * columns);
			var rad = ((j*offset_angle)-offset_random_angle)*Math.PI/180;
			var angle = rad;
			particle.position.y = i*130 - 550;
			particle.position.x = Math.cos(angle)*radius;
			particle.position.z = Math.sin(angle)*radius;
			particle.scale.x = particle.scale.y = Math.random()*30 + 40;
			array.push(particle);
			scene.add( particle );
		}
	}

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth - 4, window.innerHeight - 4 );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth - 4, window.innerHeight - 4);
}
function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function onDocumentMouseDown( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 && !CLICKED) {
					CLICKED = intersects[ 0 ].object;
					TEMP = CLICKED.scale.x;
					lerpCircle();
				}
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function lerpCircle() {
	if( CLICKED ) {
		currentFrame = requestAnimationFrame( lerpCircle );
		CLICKED.scale.x = CLICKED.scale.y += 6;
		if (CLICKED.scale.x >= 120) {
			lerpCircleBack();
		}
	}
}
function lerpCircleBack() {
	cancelAnimationFrame( currentFrame );
	if (CLICKED.scale.x > TEMP) {
		requestAnimationFrame( lerpCircleBack );
		CLICKED.scale.x = CLICKED.scale.y -= 6;
		if (CLICKED.scale.x <= TEMP) {
			TEMP = null;
			CLICKED = null;
		}
	}
}
var radius = 500;
var theta = 0;
function render() {
	// rotate camera
	theta += 0.3;
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	camera.updateMatrixWorld();

	// find intersections
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.program = programStroke;
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.material.program = programFill;
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.program = programStroke;
		INTERSECTED = null;
	}
	renderer.render( scene, camera );
}
