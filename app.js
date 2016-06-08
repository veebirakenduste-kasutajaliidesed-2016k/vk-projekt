(function(){
  "use strict";

  var AutoAed = function(){

    if(AutoAed.instance){
      return AutoAed.instance;
    }
    AutoAed.instance = this;

    this.routes = AutoAed.routes;

    this.currentRoute = null; 
    this.interval = null;
    this.cars = [];
	this.adrs=[];
	this.container = null;
	this.map = null;
	this.map2=null;
	
	
    this.init();
  };

 
  AutoAed.routes = {
    "home-view" : {
      render: function(){
      
        console.log('JS avalehel');
        if(this.interval){clearInterval(this.interval);}
        var seconds = 0;
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000);
      }
    },
    "list-view" : {
      render: function(){
        console.log('JS loend lehel');
      }
    },
    "manage-view" : {
      render: function(){
      // console.log('JS haldus lehel');
      }

    }
  };

  
  AutoAed.prototype = {
    init: function(){
		
			
      //console.log('rakendus käivitus');
      //Esialgne loogika tuleb siia
      window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan mis lehel olen
      //console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        //hash oli olemas
        this.routeChange();
      }
	  
	  
	 if(localStorage.adrs){
        //string tagasi objektiks
        this.adrs = JSON.parse(localStorage.adrs);
        //tekitan loendi htmli
        this.adrs.forEach(function(adrs){
            var new_address = new Address(car.address);
            var li = new_address.createHtmlElement();
            document.querySelector('.list-of-cars').appendChild(li);
        });
      }
	  
	  
	  
	
      //saan kätte purgid localStorage kui on
      if(localStorage.cars){
        //string tagasi objektiks
        this.cars = JSON.parse(localStorage.cars);
        //tekitan loendi htmli
        this.cars.forEach(function(car){
            var new_car = new Car(car.id,car.title, car.color,car.seats,car.address, car.timeAdded);
            var li = new_car.createHtmlElement();
            document.querySelector('.list-of-cars').appendChild(li);
        });
      }else{
		  var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {	
				console.log(xhttp.responseText);
				AutoAed.instance.cars = JSON.parse(xhttp.responseText);
				var new_car = new Car(car.id, car.title, car.color, car.seats, car.address);

                var li = new_car.createHtmlElement();
				
			}
			localStorage.setItem('cars', JSON.stringify(AutoAed.instance.cars));
		};
		
		xhttp.open("GET", "save.php", true);
		xhttp.send();
		
	   }
	this.lastUpdate();
	this.countCars();
	this.MakeMap();
	
    this.bindEvents();
	this.addMarker();
	this.createMarker();
    },
	MakeMap: function(){
		
            
            this.container = document.querySelector('#map-container');
			
			
			var options = {
				center: {
					lat: 59.439252, 
					lng: 24.7721997
				},
				zoom:11,
				//styles: [ { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "color": "#8080ed" } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0022" } ] } ],
				streetViewControl: false,
				mapTypeControl: false
							
			};
			var geocoder = new google.maps.Geocoder;
			var infowindow = new google.maps.InfoWindow;
			this.map = new google.maps.Map(this.container, options);
			this.map2 = new google.maps.Map(document.getElementById("map_canvas2"), options);
			
			
			this.map2.addListener('click', function(e){
				console.log(e.latLng.lat());
				AutoAed.instance.createMarker(e.latLng.lat(), e.latLng.lng());
			});
		
			
	},
	createMarker: function(newLat, newLng){
				var markerOptions = {
				map: this.map2,
				position: {lat: newLat, lng: newLng},
				animation: google.maps.Animation.DROP
			};
			console.log(newLat, newLng);
			var newMarker = new google.maps.Marker(markerOptions);
			
			
			
			var infoWindow = new google.maps.InfoWindow();
			infoWindow.setContent('<div><strong>' +newLat+'   ' + newLng );
			
		
			infoWindow.open(this.map2, newMarker);
			
		
    },

	addMarker: function(geocoder, resultsMap){
	
	var options= {center: {lat: 59.439252, lng: 24.7721997}, zoom:11,streetViewControl: false,mapTypeControl: false};
	var address2=[];
	 var map = new google.maps.Map(this.container, options);
	 var geocoder = new google.maps.Geocoder();
	 this.cars = JSON.parse(localStorage.cars);
	 console.log(this.cars);
	 for(var i=0; i<this.cars.length; i++){
		var address = this.cars[i].address;
		geocoder.geocode({'address': address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					var address2=results[0].geometry.location;
					var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
					}); 
												
					google.maps.event.addListener(marker, 'click', function() {	
					console.log(i);
					var infowindow = new google.maps.InfoWindow();	
					
						console.log(i);
						this.cars = JSON.parse(localStorage.cars);
						for(var i=0; i<this.cars.length; i++){
							if(results[0].geometry.location==address2){
								infowindow.setContent('<div><strong>' + this.cars[i].title + '</strong><br>' +
								this.cars[i].address +'</div>');
								infowindow.open(map, this);
							}
						}			
					
					});
					} else { alert('Geocode was not successful for the following reason: ' + status); }
					});
		 
	}
	
	},

	countCars: function(){
		var counter=0;
		this.cars = JSON.parse(localStorage.cars);
		
       for(var i=0; i<this.cars.length; i++){
         if(this.cars[i].id != ""){
			counter++; 
         }
       }

	   document.getElementById("count").innerHTML="Kuulutusi hetkel "+counter; 
		console.log(counter);
	},
	lastUpdate: function(){
	
		
			var timeAdded = this.writeDate2();
			document.getElementById("clock").innerHTML="Viimati uuendatud "+timeAdded; 
		
	},
    bindEvents: function(){
      document.querySelector('.add-new-car').addEventListener('click', this.addNewClick.bind(this));
      //kuulan trükkimist otsi kastist
      document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
    },
    search: function(event){
      //otsikasti väärtus
      var needle = document.querySelector('#search').value.toLowerCase();
      //console.log(needle);

      var list = document.querySelectorAll('ul.list-of-cars li');
      console.log(list);
      for(var i=0; i<list.length; i++){
        var li = list[i];
          //ühe list itemi sisu
          var stack = li.querySelector('.content').innerHTML.toLowerCase();
          //kas otsisõna on olemas
          if(stack.indexOf(needle) !== -1){
            //olemas
            li.style.display = 'list-item';
          }else{
            //ei ole olemas
            li.style.display = 'none';
          }
      }
    },	

    edit: function(event){
      var selected_id = event.target.dataset.id;
      var clicked_li = event.target.parentNode;
      $("#ModalEdit").modal({backdrop: true});

       $(document).on("click", "#edit_close", function(event){
        return;
      });

       $(document).on("click", "#save", function(event){
       console.log(clicked_li);
       var title = document.querySelector('.EditTitle').value;
       var color = document.querySelector('.EditColor').value;
       var seats = document.querySelector('.EditSeats').value;
       var address = document.querySelector('.EditAddress').value;
       this.cars = JSON.parse(localStorage.cars);
       clicked_li.parentNode.removeChild(clicked_li);
       for(var i=0; i<this.cars.length; i++){
         if(this.cars[i].id == selected_id){
           this.cars[i].title = title;
           this.cars[i].color = color;
           this.cars[i].seats = seats;
           this.cars[i].address = address;
           break;
         }
       }
       localStorage.setItem('cars', JSON.stringify(this.cars));
       location.reload();
      });
    },
    delete: function(event){

      var conf = confirm('Olete kindel?');
      if(!conf){return;}
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;
      ul.removeChild(li);

      for(var i=0; i<this.cars.length; i++){
        if(this.cars[i].id == event.target.dataset.id){
          //kustuta kohal i objekt Ć¤ra
          this.cars.splice(i, 1);
          //ei lĆ¤he edasi
          break;
        }
      }
      localStorage.setItem('cars', JSON.stringify(this.cars));
    },
    addNewClick: function(event){
      //lisa uus purk
      var title = this.trimWord(document.querySelector('.title').value);
      var color = this.trimWord(document.querySelector('.color').value);
      var seats = this.trimWord(document.querySelector('.seats').value);
      var address = this.trimWord(document.querySelector('.address').value);
	  var timeAdded = this.writeDate();
	  var id = guid();
      //console.log(title+' '+ingredients+' Lisatud: '+timeAdded);
	  var className = document.getElementById("show-feedback").className;
      //lisan masiivi purgid


      if(title === '' || color === ''|| seats === ''){
  		    if(className == "feedback-success"){
  		        document.querySelector('.feedback-success').className=document.querySelector('.feedback-success').className.replace('feedback-success','feedback-error');
  		    }
          document.querySelector('#show-feedback').innerHTML='Kõik read peavad täidetud olema';
      }else{
        if(className == "feedback-error"){
          document.querySelector('.feedback-error').className=document.querySelector('.feedback-error').className.replace('feedback-error','feedback-success');
        }
        document.querySelector('#show-feedback').innerHTML='Salvestamine õnnestus';
  		  var new_car = new Car(id, title, color,seats,address, timeAdded);
		  var new_address= new Address(address);

        this.cars.push(new_car);
		this.adrs.push(new_address);
        console.log(JSON.stringify(this.cars.id));
        //JSON'i stringina salvestan local storagisse
        localStorage.setItem('cars', JSON.stringify(this.cars));
		localStorage.setItem('address', JSON.stringify(this.adrs));
       
      }
	  
	  		//AJAX
		var xhttp = new XMLHttpRequest();
		//mis juhtub kui päring lõppeb
		xhttp.onreadystatechange = function() {
			
			console.log(xhttp.readyState);
			
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				
				console.log(xhttp.responseText);
			}
		};
		console.log(id+title+color+seats);
		//teeb päringu
		xhttp.open("GET", "save.php?id="+id+"&title="+title+"&color="+color+"&seats="+seats+"&address="+address, true);
		xhttp.send();
	   

       // 2) lisan selle htmli listi juurde
       var li = new_car.createHtmlElement();
	   document.querySelector('.list-of-cars').appendChild(new_car.createHtmlElement());
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
        console.log('404');
        window.location.hash = 'home-view';
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
		var hours= d.getHours("H");
		var minutes= d.getMinutes("Min");
		var seconds = d.getSeconds("Sec");
		  //#clock element htmli
		  var curTime = this.addZeroBefore(day)+"."+this.addZeroBefore(month+1)+"."+year+" ";
		  return curTime;
	},
		writeDate2 : function(){
		var d = new Date();
		var day = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();
		var hours= d.getHours("H");
		var minutes= d.getMinutes("Min");
		var seconds = d.getSeconds("Sec");
		  //#clock element htmli
		  var curTime2 = this.addZeroBefore(day)+"."+this.addZeroBefore(month+1)+"."+year+" "+this.addZeroBefore(hours)+":"+this.addZeroBefore(minutes);
		  return curTime2;
	},
	addZeroBefore : function(number){
		  if(number<10){
			number="0"+number;
		  }
		  return number;
	},
    trimWord: function (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}
  };
var Address = function(new_address){
	this.address = new_address;
};
  var Car = function(new_id,title, new_color, new_seats,new_address, timeAdded){
    this.id = new_id;
    this.title = title;
    this.color = new_color;
    this.seats = new_seats;
    this.address = new_address;
	this.timeAdded = timeAdded;
  };
  Car.prototype = {
    createHtmlElement: function(){
      //anna tagasi ilus html
      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';
      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);
      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';
      var content = document.createTextNode(this.title+' | '+this.color+' | '+this.seats+' Lisatud: '+this.timeAdded+' ');
      content_span.appendChild(content);
      li.appendChild(content_span);

      var delete_span = document.createElement('span');
      delete_span.style.color = "red";
 	    delete_span.style.cursor = "pointer";
      delete_span.setAttribute('data-id', this.id);
      delete_span.innerHTML = "Kustuta"+'  ';
      li.appendChild(delete_span);
      delete_span.addEventListener('click', AutoAed.instance.delete.bind(AutoAed.instance));


     var edit_span = document.createElement('button');
     edit_span.setAttribute('data-id', this.id);
     edit_span.innerHTML = "Muuda";
     li.appendChild(edit_span);
     edit_span.addEventListener('click', AutoAed.instance.edit.bind(AutoAed.instance));



      //console.log(li);
      return li;
    }
  };
  //helper
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
    var app = new AutoAed();
  };

})();