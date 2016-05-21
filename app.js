(function(){
  "use strict";

  var Runner = function(){
    // SINGLETON PATTERN (4 rida)
    if(Runner.instance){
      return Runner.instance;
    }
    Runner.instance = this; //this viitab moosipurgile

    this.routes = Runner.routes;

    //Kõik muutujad, mis on üldised ja muudetavad
    this.currentRoute = null; // hoiab meeles mis lehel hetkel on
	//timer
	this.x = new clsStopwatch();
	this.time = document.getElementById('time');
	this.clocktimer = null;
	//map
	this.path = [];
	this.remember = false;
	this.exercise = null;
	this.WatchID = null;
    //panen rakenduse tööle
    this.init();
  };

  //kirjeldatud kõik lehed
  Runner.routes = {
    "exercise-view" : {
      render: function(){
        //console.log('exercise lehel');
		$('#pauseButton').hide();
		$('#stopButton').hide();
      }
    },
    "history-view" : {
      render: function(){
        //console.log('history lehel');
		document.getElementById("history_table").innerHTML = "";
		Runner.instance.getHistory();
      }
    }
  };

  Runner.prototype = {
    init: function(){
      window.addEventListener('hashchange', this.routeChange.bind(this));
      if(!window.location.hash){
        window.location.hash = "exercise-view";
      }else{
        this.routeChange();
      }
	  this.update();
	  this.getExercise();
      this.bindEvents();
    },
    bindEvents: function(){
      //kuulan trükkimist otsi kastist
	  document.querySelector('#playButton').addEventListener('click', this.start.bind(this));
	  document.querySelector('#pauseButton').addEventListener('click', this.pause.bind(this));
	  document.querySelector('#stopButton').addEventListener('click', this.stop.bind(this));
	  
	  document.querySelector('#history_table').addEventListener('click', this.showMap.bind(this));
    },
	showMap: function(event){
		//console.log(event.target.id);
		if(event.target.id !== "" && event.target.id !== "history_table" && event.target.id.substr(-4) !== "_map"){
			if(document.getElementById(event.target.id+"_map").style.getPropertyValue("display") !== "none"){
				$('#'+event.target.id+'_map').hide();
			}else{
				$('#'+event.target.id+'_map').show();
				if(document.getElementById(event.target.id+"_map").style.height === "0px"){this.getPath(event.target.id);}	
			}
		}
	},
	start: function(event){
		if(this.remember===false){
			Runner.instance.ExerciseId = guid();
			this.exercise = document.getElementById("selectExercise").value;
		}
		if(this.exercise==""){
			alert("Please select a exercise");
			$('#selectExercise').show();
			this.pause();
			this.x.reset();
			this.update();
			//map
			this.path = [];
			this.remember = false;
			return;
		}
		$('#playButton').hide();
		$('#pauseButton').show();
		$('#stopButton').show();
		$('#selectExercise').hide();
		this.clocktimer = setInterval(this.update.bind(this), 1);
		this.x.start();
		
		//map
		  var options = {
			  enableHighAccuracy: true,
			  //timeout: 5000,
			  //maximumAge: 0
			};

			function success(pos) {
			  var crd = pos.coords;
			  //console.log(crd.latitude);
			  var position = new google.maps.LatLng(crd.latitude,crd.longitude);
			  if(Runner.instance.lat !== crd.latitude || Runner.instance.lng !== crd.longitude){

				  //console.log('Your current position is:');
				  //console.log('Latitude : ' + crd.latitude);
				  //console.log('Longitude: ' + crd.longitude);
				  //console.log('More or less ' + crd.accuracy + ' meters.');
				  //console.log(position);
				  Runner.instance.path.push(position);
				  //AJAX
					var xhttp = new XMLHttpRequest();
					//mis juhtub kui päring lõppeb
					xhttp.onreadystatechange = function() {
						//console.log(xhttp.readyState);
						if (xhttp.readyState == 4 && xhttp.status == 200) {
							//console.log(xhttp.responseText);
						}
					};
					//teeb päringu
					xhttp.open("GET", "save.php?id="+Runner.instance.ExerciseId+"&lat="+crd.latitude+"&lng="+crd.longitude, true);
					xhttp.send();
				}
				Runner.instance.lat = crd.latitude;
				Runner.instance.lng = crd.longitude;
			};

			function error(err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			};
		  //console.log(this.WatchID);
		  if(navigator.geolocation){this.WatchID = navigator.geolocation.watchPosition(success, error, options);}
		  //console.log(this.WatchID);
		  
	},
	pause: function(event){
		navigator.geolocation.clearWatch(this.WatchID);
		$('#playButton').show();
		$('#pauseButton').hide();
		$('#stopButton').hide();
		this.x.stop();
		clearInterval(this.clocktimer);
		//map
		//console.log(this.path.length); //kui palju koordinaate listis on
		this.remember = true;
	},
	stop: function(event){
		$('#selectExercise').show();
		this.pause();
		//console.log(this.formatTime(this.x.time())); //mis aeg stopperil on
		this.saveExercise(); // salvesta andmebaasi
		this.x.reset();
		this.update();
		//map
		this.path = [];
		this.remember = false;
		
	},
	saveExercise: function(){
		/*console.log(Runner.instance.ExerciseId);
		console.log(this.formatTime(this.x.time()));
		console.log(this.writeDate());
		console.log(this.getDistance());
		console.log(this.exercise);
		console.log("save.php?id="+Runner.instance.ExerciseId+"&time="+this.formatTime(this.x.time())+"&date="+this.writeDate()+"&distance="+this.getDistance()+"&exercise="+this.exercise);*/
		
		//AJAX
		var xhttp = new XMLHttpRequest();
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(xhttp.responseText);
			}
		};
		//teeb päringu
		xhttp.open("GET", "save.php?HistoryId="+Runner.instance.ExerciseId+"&time="+this.formatTime(this.x.time())+"&date="+this.writeDate()+"&distance="+this.getDistance()+"&exercise="+this.exercise, true);
		xhttp.send();
	},
	getExercise: function(){
		//AJAX
		var xhttp = new XMLHttpRequest();
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(xhttp.responseText);
				var options = JSON.parse(xhttp.responseText);
				var dropdown = document.getElementById("selectExercise");
				//console.log(options);
				for(var i=1; i<options.length; i+=2){
					var cur = options[i];
					var curValue = options[i-1];
					var el = document.createElement("option");
					el.textContent = cur;
					el.value = curValue;
					dropdown.appendChild(el);
				}
			}
		};
		//teeb päringu
		xhttp.open("GET", "save.php?exercises", true);
		xhttp.send();
	},
	getHistory: function(){
		//AJAX
		var xhttp = new XMLHttpRequest();
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(xhttp.responseText);
				var exercises = JSON.parse(xhttp.responseText);
				var history_table = document.getElementById("history_table");
				//console.log(exercises[0]["id"]);
				//console.log(exercises[0]);
				for(var i=0; i<exercises.length; i++){
					var id = exercises[i]["id"];
					var time = exercises[i]["time"];
					var date = exercises[i]["date"];
					var length = exercises[i]["length"];
					var exercise = exercises[i]["exercise"];
					var tr = document.createElement("tr");
					var div = document.createElement("div");
					tr.textContent = exercise+" "+Math.round((length/1000)*100)/100+"km in "+time+" Date: "+date;
					tr.id = id;
					div.id = id+"_map";
					div.style = "display:none;width:100%;height:0px;";
					tr.appendChild(div);
					//console.log(tr);
					history_table.appendChild(tr);
					//console.log(id+"_map");
					//Runner.instance.makeMap(id+"_map");
				}
			}
		};
		//teeb päringu
		xhttp.open("GET", "save.php?history", true);
		xhttp.send();
	},
	getPath: function(Ex_id){
		var table = document.getElementById("history_table")
		for(var i=0; i<table.rows.length; i++){
			//this.makeMap(table.rows[i].id+"_map");
			
			//AJAX
			var xhttp = new XMLHttpRequest();
			//mis juhtub kui päring lõppeb
			xhttp.onreadystatechange = function() {
				//console.log(xhttp.readyState);
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					//console.log(xhttp.responseText);
					var path = JSON.parse(xhttp.responseText);
					for(var i=0; i<path.length; i++){
						//console.log(parseFloat(path[i]["lat"])+" ja "+parseFloat(path[i]["lng"]));
						var position = new google.maps.LatLng(parseFloat(path[i]["lat"]),parseFloat(path[i]["lng"]));
						Runner.instance.path.push(position);
					}
					//console.log(Runner.instance.path);
					//console.log(Runner.instance.path.length);
					if(Runner.instance.path.length !== 0){
						document.getElementById(Ex_id+"_map").style.height = '380px';
						Runner.instance.makeMap(Ex_id+"_map");
					}
					Runner.instance.path = [];
				}
			};
			//teeb päringu
			xhttp.open("GET", "save.php?ExId="+Ex_id, true);
			xhttp.send();
			//console.log(this.path[0]);
		}
	},
	getDistance: function(){
		var length = 0;
		var i;
		for(i=0; i<(this.path.length-1); i++){
			length += google.maps.geometry.spherical.computeDistanceBetween (this.path[i], this.path[i+1]);
		}
		return length;
	},
	makeMap: function(map_id){
		var bounds = new google.maps.LatLngBounds();
		var i;
		for(i=0; i<this.path.length; i++){
			bounds.extend(this.path[i]);
		}
		//console.log(bounds.getCenter());
		
		var mapProp = {
			center: bounds.getCenter(),
			zoom: 10,
			streetViewControl: false,
			mapTypeControl: false
		}
		
		var map = new google.maps.Map(document.getElementById(map_id),mapProp);
		//console.log(this.path.length);
		var StartMarker = new google.maps.Marker({
			position:this.path[0],
			map:map,
			icon: 'http://localhost:5555/~rimoesk/veebirakendus/vk-projekt/images/start.png'
		});
		var EndMarker = new google.maps.Marker({
			position:this.path[this.path.length-1],
			map:map,
			icon: 'http://localhost:5555/~rimoesk/veebirakendus/vk-projekt/images/end.png'
		});
		
		map.fitBounds(bounds);
		var drawPath = new google.maps.Polyline({
			path:this.path,
			strokeColor:"#0000FF",
			strokeOpacity:0.8,
			strokeWeight:2
		});
		drawPath.setMap(map);
	},
	update: function(){
		this.time.innerHTML = this.formatTime(this.x.time());
	},
	formatTime: function(time){
		var h = 0;
		var m = 0;
		var s = 0;
		var ms = 0;
		var newTime = '';

		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;

		newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2) + ':' + this.pad(ms, 3);
		return newTime;
	},
	pad: function(num, size){
		var s = "0000" + num;
		return s.substr(s.length - size);
	},
    routeChange: function(event){
      this.currentRoute = window.location.hash.slice(1);
      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah olemas
        this.updateMenu();
        //console.log('>>> '+this.currentRoute);
        //käivitan selle lehe jaoks ettenähtud js
        this.routes[this.currentRoute].render();
      }else{
        //404? ei ole
        //console.log('404');
        window.location.hash = 'exercise-view';
      }
    },
    updateMenu: function(){
      //kui menüül on active-menu siis võtame ära
      document.querySelector('.active-menu').className=document.querySelector('.active-menu').className.replace(' active-menu', '');
      //käesolevale lehele lisan juurde
      document.querySelector('.'+this.currentRoute).className+=' active-menu';
    },
	writeDate : function(){
		  var d = new Date();
		  var day = d.getDate();
		  var month = d.getMonth();
		  var year = d.getFullYear();
		  //#clock element htmli
		  var curTime = this.addZeroBefore(day)+"."+this.addZeroBefore(month+1)+"."+year;
		  return curTime;
	},
	addZeroBefore : function(number){
		  if(number<10){
			number="0"+number;
		  }
		  return number;
	},
	initMap: function(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos.lat);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }	
	}
  };
  //helper
	var clsStopwatch = function() {
		var	startAt	= 0;
		var	lapTime	= 0;

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};
		this.stop = function() {
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0;
			};
		this.reset = function() {
				lapTime = startAt = 0;
			};
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};
	
	function guid(){
		var d = new Date().getTime();
		if(window.performance && typeof window.performance.now === "function"){
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
  
  window.onload = function(){
    var app = new Runner();
  };

})();
