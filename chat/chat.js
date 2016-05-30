function list_chats(){
	var hr = new XMLHttpRequest();
	hr.onreadystatechange = function(){
		if(hr.readyState==4 && hr.status==200){
			document.getElementById("viewChats").innerHTML = hr.responseText;
		}
	}
	hr.open("GET", "listChats.php?t=" Math.random(),true);
	hr.send();
	setTimeout(list_chats, 5000);
}
function post_chat(){
	//Teen XMLHttpRequest objekti
	var hr = new XMLHttpRequest();
	//Variables mida saadetakse php faili
	var url = "chatInsert.php";
	var ch = document.getElementById("chat").value;
	var kv = "chat="+ch;
	hr.open("POST", url, true);
	
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	hr.onreadystatechange = function(){
		if(hr.readyState == 4 && hr.status == 200){
			var return_data = hr.responseText;
			document.getElementById("status").innerHTML = return_data;
			document.getElementById('chatBtn').onmousedown = view_count;
		}
	}
	//Saadame data php'sse ja ootame staatuse uuendamiseks
	hr.send(kv);
	document.getElementById("status").innerHTML = "processing...";
	document.getElementById("chat").value = "";
}