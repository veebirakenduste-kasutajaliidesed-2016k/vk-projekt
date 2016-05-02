(function(){
	"use strict";
	
	var onlinepad = function(){

    if(onlinepad.instance){
		return onlinepad.instance;
    }
    onlinepad.instance = this;
	
	this.openedDialog = null;

    //console.log('onlinepad sees');
    this.init();
   };
   
   window.onlinepad = onlinepad;
   
   onlinepad.prototype = {
	   
		init: function(){
			
			//$("#mein").css( "display", "block" );		
			$("#mein").show();		
			
			
			this.loadJSON();			
		},
		
		
		loadJSON: function(){			
			$.ajax({
				url: "getFiles.php",
				success: function(result){					
					console.log(result);
					console.log(JSON.parse(result));
					onlinepad.instance.printGrids(JSON.parse(result));
				},
				error: function(xhr, status, error){
					console.log(error);
				}
			});
		},
		
		printFile: function(fname, ftext, color){
			var divText = '<div class="showText" style="border: 10px solid '+color+';">'+
						  '<button id="close" style="margin-right: 10px;">Aken kinni</button>'+
						  '<button id="edit">Muuda sisu</button>'+
						  '<h2>'+fname+'</h2>'+
						  '<p>'+ftext+'</p>'+
						  '</div>';
			divText = $(divText);
			
			this.openedDialog = divText;
			
			//this.openDialog.remove();
			
			/*$('#mein').click(function(){
				onlinepad.instance.openedDialog.remove();
			});*/
			
			$("body").append(divText);
			$('#close, #floater').click(function(){
				divText.remove();
				$('#floater').hide();
				console.log("pressed");
				$('#mein').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
				$('#header').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
				$('#line').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
			});
		},
		
		printGrids: function(filename){
			var items = '';
			var id = 0;
			var colorid = ["rgb(255, 138, 128)","rgb(255, 209, 128)","rgb(255, 255, 141)","rgb(207, 216, 220)","rgb(128, 216, 255)","rgb(167, 255, 235)"];
			
			$.each(filename, function(index, file){
				var x = Math.floor((Math.random() * 5));
				
				var item ='<button id="'+id+'" class="grid-item" style="background-color:'+colorid[x]+';">'+
						file.fname.replace(/.txt/g,"")+
						'</button>';

				id+=1;	
				
				item = $(item);
				
				$('.grid').append(item);
				
				$(item).click(function(e){
					
					
					//console.log(e);
					var id;
					
					id = e.target.id;
					//siia tuleks see mis dive ja nende teksti laeb
					//vaata blur					
					console.log(id + ' clicked');
					$('#floater').show();
					$('#mein').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					$('#header').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					$('#line').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					onlinepad.instance.printFile(file.fname, file.ftext, colorid[x]);
					//css({"propertyname":"value","propertyname":"value",...});
				});

					
					//console.log($(item));
			});
			
			//var temp = $(items);
			//$('.grid').append(temp);
			
		},
		
   }
   
   window.onload = function(){
     var app = new onlinepad();
   };

})();