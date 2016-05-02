(function(){
	"use strict";
	
	var onlinepad = function(){

    if(onlinepad.instance){
		return onlinepad.instance;
    }
    onlinepad.instance = this;
    this.init();
   };
   
   window.onlinepad = onlinepad;
   
   onlinepad.prototype = {
	   
		init: function(){
		
			$("#mein").show();			
			this.loadJSON();			
		},
		
		
		loadJSON: function(){			
			$.ajax({
				url: "getFiles.php",
				success: function(result){					
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
						  '<button id="saveText" style="display:none">Salvesta</button>'+
						  '<h2 class="divTexts" style="display:block">'+fname+'</h2>'+
						  '<br class="brs" style="display:none"><br class="brs" style="display:none"><input id="textHead" type="text" class="divChanges" style="display:none" value="'+fname+'">'+
						  '<p class="divTexts" style="display:block">'+ftext+'</p>'+
						  '<br class="brs" style="display:none;"><br class="brs" style="display:none"><textarea id="changeFileText" class="divChanges" style="display:none">'+ftext+'</textarea>'+
						  '</div>';
			divText = $(divText);
			$("body").append(divText);
			$('#edit').click(function(){				
				$('.divTexts').hide();
				$('#edit').hide();
				$('.brs').show();
				$('#saveText').css('display','block');
				$('.divChanges').show();
				$('#changeFileText').autogrow({onInitialize: true});
			});
			$('#saveText').click(function(){
				var inputAreaVal = $('#textHead').val();
				var textAreaVal = $('#changeFileText').val();
				onlinepad.instance.saveDiv(inputAreaVal, textAreaVal);
			});
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
					var id;					
					id = e.target.id;
					$('#floater').show();
					$('#mein').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					$('#header').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					$('#line').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
					onlinepad.instance.printFile(file.fname.replace(/.txt/g,""), file.ftext, colorid[x]);
				});
			});			
		},
		
		saveDiv: function(fname, ftext){
			$.ajax({
				url: "saveFile.php",
				data: {
					fname: fname,
					ftext: ftext
				} ,
				type: "post",
				success:function(result){
					console.log(result);
				},
				error:function(){}
			});
		},
   }
   
   window.onload = function(){
     var app = new onlinepad();
   };

})();