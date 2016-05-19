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
    this.jars = []; //kõik purgid tulevad siia sisse
	//timer
	this.x = new clsStopwatch();
	this.time = document.getElementById('time');
	this.clocktimer = null;
	//map
	//this.watchID = null;
	//this.startMarker = null;
	//this.endMarker = null;
	this.path = [];
	this.curPos = null;

    //panen rakenduse tööle
    this.init();
  };

  //kirjeldatud kõik lehed
  Runner.routes = {
    "exercise-view" : {
      render: function(){
        console.log('exercise lehel');
		$('#pauseButton').hide();
		$('#stopButton').hide();
		
      }
    },
    "history-view" : {
      render: function(){
        console.log('history lehel');
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
      this.bindEvents();
	  
    },
    bindEvents: function(){
      //kuulan trükkimist otsi kastist
      document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
	  document.querySelector('#playButton').addEventListener('click', this.start.bind(this));
	  document.querySelector('#pauseButton').addEventListener('click', this.pause.bind(this));
	  document.querySelector('#stopButton').addEventListener('click', this.stop.bind(this));
    },
    search: function(event){
      //otsikasti väärtus
      var needle = document.querySelector('#search').value.toLowerCase();
      //console.log(needle);
	  
    },
	start: function(event){
		$('#playButton').hide();
		$('#pauseButton').show();
		$('#stopButton').show();
		this.clocktimer = setInterval(this.update.bind(this), 1);
		this.x.start();
		//map
		//this.initMap();
		  var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};

			function success(pos) {
			  var crd = pos.coords;
			  var position = new google.maps.LatLng(crd.latitude,crd.longitude);

			  //console.log('Your current position is:');
			  //console.log('Latitude : ' + crd.latitude);
			  //console.log('Longitude: ' + crd.longitude);
			  //console.log('More or less ' + crd.accuracy + ' meters.');
			  //console.log(position);
			  Runner.instance.path.push(position);
			};

			function error(err) {
			  console.warn('ERROR(' + err.code + '): ' + err.message);
			};
		  
		  //navigator.geolocation.getCurrentPosition(success, error, options);
		  this.curPos = setInterval(function(){navigator.geolocation.getCurrentPosition(success, error, options);}, 1000);
		  
	},
	pause: function(event){
		$('#playButton').show();
		$('#pauseButton').hide();
		$('#stopButton').hide();
		this.x.stop();
		clearInterval(this.clocktimer);
		//map
		clearInterval(this.curPos);
		console.log(this.path.length); //kui palju koordinaate listis on
	},
	stop: function(event){
		this.pause();
		console.log(this.formatTime(this.x.time())); //mis aeg stopperil on
		this.x.reset();
		this.update();
		//map
		this.makeMap();
		this.savePath();
		this.path = [];
	},
	savePath: function(){
		
		var PathToSave = JSON.stringify(this.path);
		console.log(PathToSave);
		//AJAX
		var xhttp = new XMLHttpRequest();
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				console.log(xhttp.responseText);
			}
		};
		//teeb päringu
		xhttp.open("GET", "save.php?path="+PathToSave, true);
		xhttp.send();
	},
	makeMap: function(){
		var bounds = new google.maps.LatLngBounds();
		var i;
		for(i=0; i<this.path.length; i++){
			bounds.extend(this.path[i]);
		}
		//console.log(bounds.getCenter());
		
		var mapProp = {
			center: bounds.getCenter(),
			zoom: 16,
			streetViewControl: false,
			mapTypeControl: false
		}
		
		var map = new google.maps.Map(document.getElementById("map_canvas"),mapProp);
		//console.log(this.path.length);
		
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
  
  window.onload = function(){
    var app = new Runner();
  };

})();
