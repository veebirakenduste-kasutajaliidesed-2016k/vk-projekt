/*
	TODO: Caching/offline - can't cache streamed data
	TODO: Async load images, stream caching? Download .mp3 into localStorage?
	TODO: TBD optimize - Scene generation revamp - attach arrays to scene?
	TODO: WebGL renderer support
	TODO: Attempt to support old browsers (canvas support and HTML5 is minimum, no Flash)
	TODO: Authentication for liking/favouriting/adding to playlist
	TODO: Autoplay at tracks[count]++
*/
(function() {
    'use strict';
    var audioElement = document.getElementById("player");
    audioElement.crossOrigin = "anonymous";

    // Assigned on init()
    var camera, scene, renderer,
        raycaster, mouse, currentFrame,
        audioSource;

    var h = window.innerHeight / 6;
    var PI2 = Math.PI * 2;

    var images = [];
    // URL's for buttons in #info
    var purchase, download;

    // Globals - attach to scene probably
    var INTERSECTED;
    var CLICKED;
    var TEMP;
    var DETAILS = document.getElementsByClassName("details");
    var playlists = [];

    SC.initialize({
        client_id: client_id
    });

    init();
    animate();
    generate('richard-aasa');


    function createParticle(offset, columns, row, divider) {
        var particle = new THREE.Sprite();
        var randomAngle = (360 / columns) * Math.random() / 2;
        var angle = (offset - randomAngle) * (Math.PI / 180);
        particle.position.y = row * 300 - 550;
        particle.position.x = Math.cos(angle) * scene.radius;
        particle.position.z = Math.sin(angle) * scene.radius;

        // Divider should help with scaling - easier route for performance boost.
        particle.scale.x = particle.scale.y = 200 / divider + Math.random() * 50;

        return particle;
    }

    function createTracks(playlist) {

        // Remove 'invalid' tracks from playlist
        playlist.tracks.forEach(function(entry) {
            if (entry.streamable && entry.artwork_url !== null) {
                // How to async this?
                var imgDOM = new Image();
                imgDOM.src = entry.artwork_url;

                scene.tracks.push({
                    program: function(context) {
                        context.lineWidth = 0.1;
                        context.beginPath();
                        context.arc(0, 0, 0.5, 0, PI2, true);
                        context.stroke();
                        context.clip();
                        context.scale(1, -1);
                        context.drawImage(imgDOM, -0.6, -0.6, 1.2, 1.2);

                        // Can't getImageData() from XHR source, blends are a work-around
                        context.globalCompositeOperation = "hue";
                        context.fillStyle = "black";
                        context.fillRect(-0.6, -0.6, 100, 100);
                    },
                    programHover: function(context) {
                        context.lineWidth = 0.1;
                        context.beginPath();
                        context.arc(0, 0, 0.6, 0, PI2, true);
                        context.stroke();
                        context.clip();
                        context.scale(1, -1);
                        context.drawImage(imgDOM, -0.6, -0.6, 1.2, 1.2);
                    },
                    track: entry
                });
            }
        })

        // Rows will be fixed, maybe dynamically
        // add more if particle scales starts to
        // become too small. Are there playlists with ~800+ tracks?
        var rows = 5;

        // Starts at 1 as to avoid visualizer child
        var count = 1;

        // Columns grow dynamically
        // TODO: make last column accomodate remaining particles
        var columns = Math.floor(scene.tracks.length / rows);
        var remain = scene.tracks.length % rows;
        var divider = Math.ceil(scene.tracks.length / 100);

        for (var i = 0; i < rows - 1; i++) {

            // Angle equation gets messed up when j==0
            // TODO: optimize/more precise positioning
            for (var j = 1; j < columns + 1; j++) {
                var particle = createParticle((j * 360 / columns), columns, i, divider);

                // Every particle requires custom program due to different image (different image == different canvas)
                particle.material = new THREE.SpriteCanvasMaterial({
                    color: Math.random() * 0xffaa00,
                    program: scene.tracks[count].program
                });
                scene.add(particle);
                count++;
            }
        }



        // Remaining particles
        var lastColumn = columns + remain;
        for (var j = 1; j < lastColumn + 1; j++) {
            var particle = createParticle((j * 360 / lastColumn), lastColumn, i, divider);

            // Every particle requires custom program due to different image (different image == different canvas)
            particle.material = new THREE.SpriteCanvasMaterial({
                color: Math.random() * 0xffaa00,
                program: scene.tracks[count].program
            });

            scene.add(particle);
            count++;
        }
    }

    function generate(permalink) {
        SC.get('/playlists', {
            q: permalink
        }).then(function(e) {
            if (e.length > 0) {

                playlists = e;

                //Fastest method to remove children from DOM node
                var playlistsNode = document.getElementById('playlists');
                while (playlistsNode.firstChild) {
                    playlistsNode.removeChild(playlistsNode.firstChild);
                }

                for (var key in playlists) {
                    var obj = playlists[key];
                    console.log(obj);
                    var playlistNode = document.createElement("div");
                    playlistNode.className = "playlist";
                    playlistNode.innerHTML = "<div>Title:&nbsp" + obj.title + "<br>Genre:&nbsp" + obj.genre + "<br>Tracks:&nbsp" + obj.track_count + "<br>User:&nbsp" + obj.user.username + "</div>";
                    var playlistNodeImage = new Image();
                    playlistNodeImage.src = obj.user.avatar_url;
                    playlistNodeImage.height = 75;
                    playlistNodeImage.width = 75;
                    playlistNode.appendChild(playlistNodeImage);
                    playlistsNode.appendChild(playlistNode);
                }

            } else {
                console.log("NOPE");
            }
        });
    }

    function createScene() {

        // FoV will affect the width of 3D objects and related trig calcs
        // (FoV,Aspect,Frustrum)
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1701);
        scene = new THREE.Scene();
        scene.radius = 1200;
        scene.barAmount = 80
        scene.binOffset = Math.cos(Math.PI / 4) * scene.radius * 4 / scene.barAmount;

        // Black magic
        scene.AudioSource = function() {
            var self = this;
            var audioCtx = new(window.AudioContext || window.webkitAudioContext); // shimmy shim shim
            var analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            var source = audioCtx.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            var sampleAudioStream = function() {
                analyser.getByteFrequencyData(self.streamData);

                // Calculate an overall volume value
                var total = 0;

                // Only sample < barAmount
                for (var i = 0; i < scene.barAmount; i++) {
                    total += self.streamData[i];
                }
                self.volume = total;
            };

            // No point running through entire sampleAudioStream,
            // if audioElement is paused, shim in a function
            setInterval(function() {
                if (!audioElement.paused) {
                    sampleAudioStream();
                }
            }, 20); // every 20ms
            this.volume = 0;
            this.streamData = new Uint8Array(scene.barAmount); // fftSize/2
            this.play = function(streamUrl) {
                audioElement.setAttribute('src', streamUrl); // AudioSource.play(stream_url)
                audioElement.play();
            }
        };
        audioSource = new scene.AudioSource();

        // Canvas magic for the visualizer sprite
        scene.programVisualize = function(context) {

            // Render a white box first to clear 'pixel-bleeding'
            // *? Fixed on switch to WebGL renderer
            context.fillStyle = "white";
            context.fillRect(-79 * scene.binOffset, -h * 2, scene.binOffset * 160, 255 * 4);
            for (var bin = 0; bin < audioSource.streamData.length; bin++) {
                var val = audioSource.streamData[bin];
                context.fillStyle = "rgb(255," + (85 + (Math.ceil(115 * bin / 45))) + ",0)";
                context.fillRect(-bin * scene.binOffset, h, scene.binOffset - 4, val * 1.5);
                context.fillRect(bin * scene.binOffset + scene.binOffset, h, scene.binOffset - 4, val * 1.5);
                context.fillStyle = "rgba(255," + (85 + (Math.ceil(115 * bin / 45))) + ",0,0.4)";
                context.fillRect(-bin * scene.binOffset, h + 0.5, scene.binOffset - 4, -val * 1.5);
                context.fillRect(bin * scene.binOffset + scene.binOffset, h + 0.5, scene.binOffset - 4, -val * 1.5);
            }
        };

        var visualizer = new THREE.Sprite(new THREE.SpriteCanvasMaterial({
            program: scene.programVisualize
        }));
        visualizer.position.x = scene.radius + 500;
        scene.add(visualizer);

        scene.tracks = [];
    }

    function init() {
        createScene();

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.isDraggable = false;
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
    }

    function onDocumentMouseMove(event) {

        // If mouse doesn't touch overlaying HTML elements
        var details = DETAILS[0].getBoundingClientRect();
        var button = document.getElementById('nav').getBoundingClientRect();


        if (!(event.clientX < details.width && event.clientY < details.height || event.clientX < button.right && event.clientY < button.bottom)) {
            event.preventDefault();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children);

            //------------------------------------------------------------------------------------------------v 0 is visualizer ID
            if (intersects.length > 0 && !mouse.isDraggable && scene.children.indexOf(intersects[0].object != 0)) {
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) INTERSECTED.material.program = scene.tracks[scene.children.indexOf(INTERSECTED)].program;
                    INTERSECTED = intersects[0].object;
                    event.target.style.cursor = 'pointer';
                    INTERSECTED.material.program = scene.tracks[scene.children.indexOf(INTERSECTED)].programHover;
                }
            } else {
                // if (INTERSECTED) INTERSECTED.material.program = programs[scene.children.indexOf(INTERSECTED) - 1];
                if (INTERSECTED) INTERSECTED.material.program = scene.tracks[scene.children.indexOf(INTERSECTED)].program;
                INTERSECTED = null;
                if (!mouse.isDraggable) {
                    event.target.style.cursor = 'default'
                }
            }
        } else {
            if (INTERSECTED) INTERSECTED.material.program = scene.tracks[scene.children.indexOf(INTERSECTED)].program;
            INTERSECTED = null;
        }
    }

    function onDocumentMouseUp(event) {
        mouse.isDraggable = false;
    }

    function clearView() {
        INTERSECTED = CLICKED = null;
        scene.tracks = [];
        while (scene.children.length != 1) {
            scene.children.pop();
        }

        audioElement.pause();
        audioSource.streamData = new Uint8Array(scene.barAmount);
        document.getElementById('info').className = "invisible";
    }

    function onDocumentMouseDown(event) {

        // Cancel entire raycasting and streaming process if event is within bounding box of HTML element
        var details = DETAILS[0].getBoundingClientRect();
        var button = document.getElementById('nav').getBoundingClientRect();
        if (!(event.clientX < details.width && event.clientY < details.height || event.clientX < button.right && event.clientY < button.bottom)) {
            event.preventDefault();
            switch (event.which) {
                case 1:
                    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
                    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(scene.children);
                    if (intersects.length > 0 && !CLICKED) {
                        CLICKED = intersects[0].object;
                        TEMP = CLICKED.scale.x;
                        var track = scene.tracks[scene.children.indexOf(CLICKED)].track;
                        checkInfo();

                        if (track.download_url) {
                            document.getElementById("download").disabled = false;
                            download = track.download_url;
                        } else {
                            document.getElementById("download").disabled = true;
                        }

                        if (track.purchase_url) {
                            document.getElementById("buy").disabled = false;
                            purchase = track.purchase_url;
                        } else {
                            document.getElementById("buy").disabled = true;
                        }

                        document.getElementById("artwork").innerHTML = '<a href="' + track.permalink_url + '">' + '<img alt="artwork" src="' + track.artwork_url + '"></a>';
                        document.getElementById("title").innerHTML = '<a href="' + track.permalink_url + '">' + track.title + '</a>';

                        if (track.genre) {
                            document.getElementById("genre").innerHTML = 'Genre: ' + track.genre;
                        } else {
                            document.getElementById("genre").innerHTML = null;
                        }

                        document.getElementById("user").innerHTML =
                            '<a href="' + track.user.permalink_url + '">' + track.user.username + '</a>';
                        document.getElementById("license").innerHTML = track.license;
                        document.getElementById("playback").innerHTML = track.playback_count;
                        document.getElementById("favourite").innerHTML = track.favoritings_count;
                        audioSource.play(track.stream_url + '?client_id=' + client_id);
                        lerpCircle();
                    }
                    break;
                case 2:
                    mouse.isDraggable = true;
                    break;
                case 3:
                    mouse.isDraggable = true;
                    break;
                default:
                    console.log("weird mouse");
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function lerpCircle() {
        if (CLICKED) {
            currentFrame = requestAnimationFrame(lerpCircle);
            CLICKED.scale.x = CLICKED.scale.y += 8;
            if (CLICKED.scale.x >= TEMP * 1.5) {
                cancelAnimationFrame(currentFrame);
                lerpCircleBack();
            }
        }
    }

    function lerpCircleBack() {
        if (CLICKED.scale.x > TEMP) {
            currentFrame = requestAnimationFrame(lerpCircleBack);
            CLICKED.scale.x = CLICKED.scale.y -= 6;
            if (CLICKED.scale.x <= TEMP) {
                CLICKED.material.color = new THREE.Color(0xffaa00);
                TEMP = null;
                CLICKED = null;
                cancelAnimationFrame(currentFrame);
            }
        }
    }

    var rotSpeed = 0.003;
    var dragMultiplier = 30;
    // save x coordinate so on mouse release, auto-rotate knows which direction to rotate
    var lastMouseX = 0;

    function render() {
        var visualizer = scene.children[0],
            x = visualizer.position.x,
            z = visualizer.position.z;

        if (mouse.isDraggable) {
            visualizer.position.x = x * Math.cos(rotSpeed * dragMultiplier * mouse.x) - z * Math.sin(rotSpeed * dragMultiplier * mouse.x);
            visualizer.position.z = z * Math.cos(rotSpeed * dragMultiplier * mouse.x) + x * Math.sin(rotSpeed * dragMultiplier * mouse.x);
            lastMouseX = mouse.x;
        } else if (INTERSECTED === null) {
            if (lastMouseX < 0) {
                visualizer.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
                visualizer.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
            } else {
                visualizer.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
                visualizer.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
            }
        }

        // Visualizer rotates outside of particle circle
        // Camera projects towards (0,0) of visualizer
        camera.lookAt(visualizer.position);
        renderer.render(scene, camera);
    }

    function checkInfo() {
        var info = document.getElementById('info');
        if (info.classList.contains('invisible')) {
            info.className = "visible";
        }
    }
    document.getElementById('playlists').addEventListener('click', function() {
        if (event.target.parentNode.className === 'playlist') {
            var nodeList = Array.prototype.slice.call(document.getElementById('playlists').children);
            var index = nodeList.indexOf(event.target.parentNode);

            clearView();
            SC.get('/playlists/' + playlists[index].id, {}).then(function(playlist) {
                document.getElementById("playing").innerHTML = "Playlist:&nbsp&nbsp" + playlist.title;
                createTracks(playlist);
            });
        }
    });
    document.getElementById('buy').addEventListener('click', function() {
        window.location.href = purchase;
    });
    document.getElementById('download').addEventListener('click', function() {
        window.location.href = download + client_id;
    });
    document.getElementById('nav').addEventListener('click', function() {
        var button = document.getElementById('nav');
        if (button.classList.contains('show')) {
            button.className = "hide";
            button.innerHTML = "Hide";
            DETAILS[0].className = "details";
        } else {
            button.className = "show";
            button.innerHTML = "Show";
            DETAILS[0].className = "details hidden";
        }
    });
    document.getElementById('search').addEventListener('search', function() {
        var result = document.getElementById('search').value;
        if (result) {
            generate(result);
        }
    });
})();
