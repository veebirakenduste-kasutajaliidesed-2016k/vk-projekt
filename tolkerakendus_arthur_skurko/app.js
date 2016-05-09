
(function(){
	"use strict";
	var Translate = function(){
		
		this.x = 0;
		this.y = 0;
		
		this.target = document.querySelector(".target");
		
		if(Translate.instance){
			return Translate.instance;
		}
		
		Translate.instance = this;
		
		this.init();
		
	};
	
	var i = 0;
	var j = 0;
	
	//window.Translate = Translate;
	
	Translate.prototype = {
		init : function(){
			console.log("hakkame tõlkima");
			
			this.bindMouseEvent();
			
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
			   console.log(xhttp.readyState);
			   if(xhttp.readyState == 4 && xhttp.status == 200){
				   //JSON-parse = string objektideks
				   var result = JSON.parse(xhttp.responseText);
				   console.log(result);
				   
				   //NB! saab viidata MOOSIPURGILE ka Moosipurk.instance
				   
				   Translate.instance.createListFromArray(result);
				   console.log("laadisin serverist");
			   }
			};
			//päringu tegemine
			xhttp.open("POST", "saveData.php", true);
			xhttp.send();
		},
		
		createListFromArray : function(arrayOfObjects){
			this.words = arrayOfObjects;
			
			this.words.forEach(function(word){
				j++;
				var new_Print = new Print(word.id, word.en, word.et);
				var p_en = new_Print.createHtmlElementEn();
				var p_et = new_Print.createHtmlElementEt();
				document.querySelector(".section_en").appendChild(p_en);
				document.querySelector(".section_et").appendChild(p_et);
				console.log(j);
			});
		},
		
		bindMouseEvent : function(){
			document.querySelector(".save").addEventListener("click", this.editText.bind(this));
			document.querySelector('.add-new-translation').addEventListener('click', this.addNewClick.bind(this));
			
		},
		
		deletePair: function(event){
			console.log(event.target);
			console.log("id "+event.target.dataset.id);
			var delete_id = event.target.dataset.id;
			var word_en = event.target.parentNode.parentNode;
			var delete_span = event.target.parentNode;
			word_en.removeChild(delete_span);
			for(var k = 0; k < this.words.length; k++){
				console.log(k);
				if(this.words[k].id == delete_id){
					//see on see
					//kustuta kohal i objekt Ã¤ra
					this.words.splice(k, 1);
					break;
				}
			}
		},
		
		addNewClick: function(event){
			//salvestame purgi
			//console.log(event);
			var id = guid();
			j++;
			var en = document.querySelector('.en').value;
			var et = document.querySelector('.et').value;

			//console.log(en + ' ' + et);
			//1) tekitan uue translation'i
			var new_word = new Print(id, en, et);

			//lisan massiiivi purgi
			this.words.push(new_word);
			//console.log(JSON.stringify(this.words));
			// JSON'i stringina salvestan localStorage'isse
			localStorage.setItem('words', JSON.stringify(this.words));
					console.log("iiiii "+j);

			//salvestan serverisse
			var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function(){

				if(xhttp.readyState == 4 && xhttp.status == 200){

					console.log("salvestas serverisse");

				}

			};

			console.log("saveData.php?id="+id+"&en="+en+"&et="+et);
			xhttp.open("POST", "saveData.php?id="+id+"&en="+en+"&et="+et, true);
			xhttp.send();

			// 2) lisan selle htmli listi juurde
			var span_en = new_word.createHtmlElementEn();
			document.querySelector('.section_en').appendChild(span_en);
			var span_et = new_word.createHtmlElementEt();
			document.querySelector('.section_et').appendChild(span_et);
			document.querySelector("#equals").reset();

		},
		
		replace_whole_array : function(){
			
		},
		
		match_for_translation: function(){
			
		},
		
		editText: function(){
			var edit = document.querySelector(".editable").innerHTML;
			this.target.innerHTML = edit;
		},
		
		test : function(){
			console.log("tere");
		},
	};
	
	var Print = function(new_id, new_en, new_et){
		this.id = new_id;
		this.en = new_en;
		this.et = new_et;
		console.log('created new Print');
	};
	
	Print.prototype = {
		createHtmlElementEn : function(event){
			
			var word_en = document.createElement("span");
			var print_en = document.createTextNode(this.en + " ")
			word_en.className = "paired match"+j+"";
			word_en.style.position = "relative";
			word_en.appendChild(print_en);
			
			return word_en;
		},
		
		createHtmlElementEt : function(){
			
			var word_et = document.createElement("span");
			var print_et = document.createTextNode(this.et + " ")
			word_et.className = "paired match"+j+"";
			word_et.appendChild(print_et);
			
			return word_et;
		},

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
	};
	
	window.onload = function(){
		
		var start = new Translate();
		var start2 = new Print();
		
	};
	
})();