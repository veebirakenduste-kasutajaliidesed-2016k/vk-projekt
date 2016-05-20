(function(){
  "use strict";

  var Runner = function(){
    // SINGLETON PATTERN (4 rida)
    if(Runner.instance){
      return Runner.instance;
    }
    Runner.instance = this; //this viitab moosipurgile
    //Kõik muutujad, mis on üldised ja muudetavad
  	//map
  	this.path = [];
    //panen rakenduse tööle
    this.init();
  };


  Runner.prototype = {
    init: function(){
      this.getHistory();
      this.bindEvents();
    },
    bindEvents: function(){
	  document.querySelector('#history_table').addEventListener('click', this.showMap.bind(this));
    },
	showMap: function(event){
		console.log(event.target.id);
    var selected = document.getElementById(event.target.id+"_map");
    //console.log(selected.style.display);
		if(event.target.id !== "" && event.target.id !== "history_table" && event.target.id.substr(-4) !== "_map"){
			if(document.getElementById(event.target.id+"_map").style.getPropertyValue("display") !== "none"){
				//$('#'+event.target.id+'_map').hide();
        //selected.style.display = 'none';
        $('#'+event.target.id+'_map').hide();
			}else{
        //$('#'+event.target.id+'_map').show();
        /*selected.style.display = 'block';
        selected.style.height = '380px';*/
        $('#'+event.target.id+'_map').show();

        Runner.instance.getPath(event.target.id);

        //selected.style = "display:block;width:100%;height:380px";

			}
		}
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
					tr.textContent = exercise+" "+(length/1000)+"km in "+time+" Date: "+date;
					tr.id = id;
					div.id = id+"_map";
					div.style = "display:none;width:100%;height:380px";
					tr.appendChild(div);
					//console.log(tr);
					history_table.appendChild(tr);
					//console.log(id+"_map");
          //$('#'+id+'_map').hide();
          //console.log(id);

          //console.log(Runner.instance.path);
					//Runner.instance.makeMap(id+"_map");
          //Runner.instance.path = [];
          //console.log(Runner.instance.path);
				}
			}
		};
		//teeb päringu
		xhttp.open("GET", "save.php?history", true);
		xhttp.send();
	},
	getPath: function(Ex_id){
		var table = document.getElementById("history_table");

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
          //console.log(Ex_id);
					console.log(Runner.instance.path);
          if(Runner.instance.path.length !== 0){
            Runner.instance.makeMap(Ex_id+"_map");
          }
          Runner.instance.path = [];
					//console.log(path);
				}
			};
			//teeb päringu
			xhttp.open("GET", "save.php?ExId="+Ex_id, true);
			xhttp.send();
			//console.log(this.path[0]);
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
		};

		var map = new google.maps.Map(document.getElementById(map_id),mapProp);
		//console.log(this.path.length);

		map.fitBounds(bounds);
		var drawPath = new google.maps.Polyline({
			path: this.path,
			strokeColor:"#0000FF",
			strokeOpacity:0.8,
			strokeWeight:2
		});
		drawPath.setMap(map);
	}
  };
  //helper

  window.onload = function(){
    var app = new Runner();
  };

})();
