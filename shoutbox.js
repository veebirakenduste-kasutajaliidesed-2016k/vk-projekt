$(document).ready(function(){
	//global variables
	var inputUser = $("#nick");
	var inputMessage = $("#message");
	var loading = $("#loading");
	var messageList = $(".content > p");
	
	//functions
	function updateShoutbox(){
		//send the post to shoutbox.php
		$.ajax({
			type: "POST", 
			url: "shoutbox.php", 
			data: "action=update", 
			complete: function(data){
				loading.fadeOut();
				messageList.html(data.responseText);				
				//messageList.fadeIn("fast");
			}
		});
	}
	
	//check if all fields are filled
	function checkForm(){
		if(inputUser.val() && inputMessage.val())
			return true;
		else
			return false;
	}
	
	
	//Load for the first time the shoutbox data
	updateShoutbox();
	
	//Inerval
	window.setInterval(function(){
		updateShoutbox();
	},3000);
	
	
	//Get messages from shoutbox.php
	function getMessages(letter) {
		var div = $("#message");		
		$.get('shoutbox.php', function(data) {
			div.html(data); 		
		});
	}
	

	window.setInterval(function(){
		//loading.fadeOut();
		getMessages();
	},1000);
	

// Check the internet connection	
	function connection(){
		if (navigator.onLine == true) { 
        console.log("You have the internet connection");
    } else {
        console.log("You aren't connected to the internet.");
		//messageList.innerHTML = messageList.value();				

    }
	
}

  function cacheListener(){
        window.applicationCache.addEventListener('cached',function(){
            window.applicationCache.swapCache();
            console.log('swap cache has been called');
            },false);
    }
	cacheListener();
	

	//on submit event
	$("#form").submit(function(){
		if(checkForm()){
			var nick = inputUser.val();
			var message = inputMessage.val();  //inputMessage.attr("value");
			//Deactivate submit button while sending
			
			$("#send").attr({ disabled:true, value:"Sending..." });
			$("#send").blur(); //https://learn.javascript.ru/focus-blur

			//Send the post to shoutbox.php
			$.ajax({
				type: "POST", 
				url: "shoutbox.php", 
				data: "action=insert&nick=" + nick + "&message=" + message,
				complete: function(data){
					//clear the message field and load for the first time the shoutbox data
					var message_clear = inputMessage.val("");
					updateShoutbox();
					
					//reactivate the send button
					$("#send").attr({ disabled:false, value:"Send" });
                }
			 });
		}
		else alert("Please, write your name or message");
		//we prevent the refresh of the page after submitting the form
		return false;
	});
});

