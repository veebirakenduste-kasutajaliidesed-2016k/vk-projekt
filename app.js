(function(){
  "use strict";

  var AutoAed = function(){
    // SINGLETON PATTERN (4 rida)
    if(AutoAed.instance){
      return AutoAed.instance;
    }
    AutoAed.instance = this; //this viitab carspurgile

    this.routes = AutoAed.routes;

    //console.log(this);
    //console.log('moosipurgi sees');

    //Kõik muutujad, mis on üldised ja muudetavad
    this.currentRoute = null; // hoiab meeles mis lehel hetkel on
    this.interval = null;
    this.cars = []; //kõik purgid tulevad siia sisse

    //panen rakenduse tööle
    this.init();
  };

  //kirjeldatud kõik lehed
  AutoAed.routes = {
    "home-view" : {
      render: function(){
        // käivitan siis kui jõuan lehele
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
        //console.log('JS haldus lehel');
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
	  

     
      this.bindEvents();
    },
	Map : function (){
		
			this.container = document.querySelector('#map');

            var options = {
              center: {lat: 59.439252, lng: 24.7721997},
              zoom: 10,
              //styles: [ { "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "hue": "#ff5e00" } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff001a" } ] } ],
				      streetViewControl: false,
				      mapTypeControl: false
            };
            var watchID = navigator.geolocation.watchPosition(function(position) {
              do_something(position.coords.latitude, position.coords.longitude);
            });

            this.map = new google.maps.Map(this.container, options);
	},


geocodeAddress: function (geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });	initMap: function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
},
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

        this.cars.push(new_car);
        console.log(JSON.stringify(this.cars.id));
        //JSON'i stringina salvestan local storagisse
        localStorage.setItem('cars', JSON.stringify(this.cars));
       
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