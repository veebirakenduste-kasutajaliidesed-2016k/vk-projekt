(function(){
	"use strict";
	
	var onlinepad = function(){

    if(onlinepad.instance){
		return onlinepad.instance;
    }
    onlinepad.instance = this;
	
	this.cacheStatusValues = ['uncached','idle','checking','downloading','updateready','obsolete'];
    this.cache = window.applicationCache;
    this.startCacheListeners();
	
	this.online = null;
	this.status = null;
	this.grids = [];
	
    this.init();
   };
   
   window.onlinepad = onlinepad;
   
   onlinepad.prototype = {
	   
		init: function(){
		
			$("#mein").show();
			this.checkDeviceStatus();
			this.bindEvents();
			this.checkForOfflineGrids();
			this.loadJSON();
		},
		
		startCacheListeners: function(){
			this.cache.addEventListener('cached', this.logEvent.bind(this), false);
			this.cache.addEventListener('checking', this.logEvent.bind(this), false);
			this.cache.addEventListener('downloading', this.logEvent.bind(this), false);
			this.cache.addEventListener('error', this.logEvent.bind(this), false);
			this.cache.addEventListener('noupdate', this.logEvent.bind(this), false);
			this.cache.addEventListener('obsolete', this.logEvent.bind(this), false);
			this.cache.addEventListener('progress', this.logEvent.bind(this), false);
			this.cache.addEventListener('updateready', this.logEvent.bind(this), false);

			window.applicationCache.addEventListener('updateready',function(){
				window.applicationCache.swapCache();
				console.log('swap cache has been called');
			},false);

			setInterval(function(){
				onlinepad.instance.cache.update();
			}, 10000);

			setInterval(function(){
				onlinepad.instance.checkDeviceStatus();
			}, 100);
		},
		
		logEvent: function(event){

			this.status = this.cacheStatusValues[this.cache.status];
			var message = 'online: '+this.online+', event: '+ event.type+', status: ' + this.status;

			if (event.type == 'error' && navigator.onLine) {
				message+= ' (prolly a syntax error in manifest)';
			}
		},

		bindEvents: function(){
			$('#reloadPage').click(function(){
				location.reload();
			});
			
			$('#tonewtext').click(function(){
				onlinepad.instance.createFile();
			});
		},
		
		loadJSON: function(){
			if(this.online=="online"){				
				$.ajax({
					url: "getFiles.php",
					success: function(result){					
						onlinepad.instance.printGrids(JSON.parse(result));
					},
					error: function(xhr, status, error){
						console.log(error);
					}
				});
			}else{
				var vabandust = $("<p>Olete hetkel offline ja saate ainult luua märkmeid, mis laetakse serverisse niipea kui olete uuesti online.</p>")
				$('#mein').html(vabandust);
			}
		},
		
		checkForOfflineGrids: function(){
			if(localStorage.pendingFiles){
				//console.log("korras");
				/*$.each(localStorage.pendingFiles, function(index, grid){
					
					//onlinepad.instance.saveDiv("#####", inputAreaVal, textAreaVal);
				})*/
				var variables = $.parseJSON(localStorage.getItem('pendingFiles'));
				//console.log(variables.fname);
				//console.log(variables.ftext);
				console.log(variables);
				console.log(variables["fname"]);
				console.log(variables.ftext);
				//pm siia tuleb veel see saveDiv() kus oleksid need jsoni variabled jms ja siis peaks valmis olema
			}
		},
		
		createFile: function(){
			
			$('#floater').show();
			$('#mein').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
			$('#header').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
			$('#line').css('filter','blur(5px)').css('webkitFilter','blur(5px)').css('mozFilter','blur(5px)').css('oFilter','blur(5px)').css('msFilter','blur(5px)');
			
			var creationDiv = '<div class="createText" style="border: 10px solid rgb(207, 216, 220);">'+
							  '<button id="closeText" style="margin-right: 10px;">Aken kinni</button>'+
							  '<button id="saveNewText">Salvesta</button>'+
							  '<br><br><input id="newHead" type="text" class="newFile" placeholder="Pealkiri">'+
							  '<br><br><textarea id="FileText" class="newFile" placeholder="Teie märkus siia..."></textarea>'+
							  '</div>';
			creationDiv = $(creationDiv);
			$("body").append(creationDiv);
			$('#FileText').autogrow({onInitialize: true});
			
			$('#saveNewText').click(function(){
				var inputAreaVal = $('#newHead').val();
				var textAreaVal = $('#FileText').val();
				//console.log(inputAreaVal);
				//console.log(textAreaVal);
				//onlinepad.instance.online = "offline";
				if(onlinepad.instance.online=="online"){
					onlinepad.instance.saveDiv("#####", inputAreaVal, textAreaVal);
				}else{
					var oneFile = '{"fname":"'+inputAreaVal+'", "ftext":"'+textAreaVal+'"}';
					//onlinepad.instance.grids.push(oneFile);
					//console.log(onlinepad.instance.grids);
					localStorage.setItem('pendingFiles',JSON.stringify(oneFile));
				}
				location.reload();
			});
			
			$('#closeText, #floater').click(function(){
				creationDiv.remove();
				$('#floater').hide();
				console.log("pressed");
				$('#mein').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
				$('#header').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
				$('#line').css('filter','none').css('webkitFilter','none').css('mozFilter','none').css('oFilter','none').css('msFilter','none');
			});
			
		},
		
		printFile: function(fname, ftext, color){
			var divText = '<div class="showText" style="border: 10px solid '+color+';">'+
						  '<button id="close" style="margin-right: 10px;">Aken kinni</button>'+
						  '<button id="edit">Muuda sisu</button>'+
						  '<button id="saveText" style="display:none">Salvesta</button>'+
						  '<button id="delText">Kustuta</button>'+
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
				onlinepad.instance.saveDiv(fname, inputAreaVal, textAreaVal);
			});
			
			$('#delText').click(function(){
				onlinepad.instance.delDiv(fname);
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
		
		saveDiv: function(origfname, fname, ftext){
			$.ajax({
				url: "saveFile.php",
				data: {
					fname: fname,
					ftext: ftext,
					origfname: origfname
				},
				type: "post",
				success:function(result){
					console.log(result);
				}
			});
			
			setTimeout(function(){location.reload();}, 500);			
		},
		
		delDiv: function(fname){
			$.ajax({
				url: "delFile.php",
				data: {
					fname:fname
				},
				type: "post",
				success:function(e){
					console.log(e);
				}
			});
			
			setTimeout(function(){location.reload();}, 500);	
		},
		
		checkDeviceStatus: function(){
         this.online = (navigator.onLine) ? "online" : "offline";
		 
         if(this.online == "online"){
           console.log("bar online");
         }else{
           console.log("bar offline");
         }

     },
   }
   
   window.onload = function(){
     var app = new onlinepad();
   };

})();