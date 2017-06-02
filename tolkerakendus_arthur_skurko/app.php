<?php
	session_start();
	include "../../../php/db.php";
	include "../../2.tund-I-ruhm/functions.php";
	include "update_en.php";
?>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src='https://code.responsivevoice.org/responsivevoice.js'></script>
		<link rel="stylesheet" href="style.css" />
		<style>
			.blue{
	color:blue;
}
		</style>
	</head>
	<body onload="background_check();">
		<i style="color:lightcoral;">See on tõlkerakendus. Siin saab siduda omavahel ingliskeelseid sõnu ja eestikeelseid sõnu.</i>
		<?php
			$result=$connection->query("SELECT id, en, et FROM translations");
				while($row=$result->fetchObject()){
					echo"
						<div contenteditable='true'>
							<p class='en_ajax editable'>".$row->en."</p>
						</div>
						<input type='submit' value='salvesta' name='' class='save_en flat' />
							
					";
					echo "
						<form action='?' method='POST'>
							<p style='font-weight:bold;'>Tõlgi siia:</p>
							<div contenteditable='true'>
								<p class='editable'>".stripslashes($row->et)."</p>
							</div>
							<textarea type='text' name='et' class='target'>".stripslashes($row->et)."</textarea>
							<input type='hidden' value='".$row->id."' name='id' />
							<input type='submit' value='salvesta' name='update_et' class='save flat' />
						</form>
					";
				}
		?>
		
		<p class="split_here"></p>
		<p class="array_here"></p>
		<p style="font-weight:bold;">Vali paarid siin:</p>
		<div onclick="select_en(event);" class="value_en"></div>
		<div onclick="select_et(event);" class="value_et"></div>
		
		<form id="equals">
			<input type="text" class="en" /> </br>
			<input type="text" class="et" />
		</form>
		<button class="add-new-translation pull-right flat green inactive" onclick="click_count();color_blue();">Pair</button>
		<button class="seperate flat red inactive" onclick="seperate();">Seperate</button>
		<div class="section_en" style="pointer-events:none;"></div>
		<div class="section_et" style="pointer-events:none;"></div>
		<button class="flat" onclick="background_check();check_if_correct();">Check</button>
		<button class="flat replace purple_button inactive" onclick="">Replace</button>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>	
	<script>
			
			<?php
				$result=$connection->query("SELECT id, en, et FROM translations");
				while($row=$result->fetchObject()){
					echo "var text_en = '".$row->en."';";
					echo "var text_et = '".stripslashes($row->et)."';";
				}
			?>
			
			var text_en_tag_start = text_en.replace(/<span>/g, "#"); //splits sentences on dot. Not necessary to use
			var word_en_split = text_en.split(" "); //Splits sentence into words
			var text_et_tag_end = text_et.replace(/<\/span>/g, "");
			var word_et_split = text_et.split(" ");
			var word_array = [word_en_split]; //creates an array of split words
			var array = JSON.stringify(word_en_split); // creates a stringified array
			
			//document.querySelector(".split_here").innerHTML = text_split;
			//document.querySelector(".array_here").innerHTML = word_split;
			
			console.log(text_en);
			console.log(text_et);
			console.log(text_et_tag_end+"tere");
			
			console.log(word_array);
			console.log(word_en_split);
			console.log(array);
			
			var i; //counter of times gone through the array
			var value_en = document.querySelector(".value_en"); //element where split words are written seperately <span>word</span>
			var value_et = document.querySelector(".value_et");
			for(i=0; i<word_en_split.length; i++){ 
				
				// Goes through the array of words and writes them seperately into a <div>
				
				console.log(word_en_split[i]);
				value_en.innerHTML += "<span class='first'>"+word_en_split[i]+" </span>"
				
			}
			
			for(i=0; i<word_et_split.length; i++){
				
				// Goes through the array of words and writes them seperately into a <div>
				
				console.log(word_et_split[i]);
				value_et.innerHTML += "<span class='first'>"+word_et_split[i]+" </span>"
				
			}
			i = 1;
			function click_count(){
				//this is used to count the current matching for each turn. ex: you click three words, then each gets the same class 'match_1(i)'. After confirmation the next words clicked will get the class match_2(i++).
				i++;
			}
			
			function select_en(event) {
				
				//Function to allow selection of words seperately
				
				var to_click = event.target;
				var en = to_click.textContent;
				
				if($(".replace").hasClass("inactive")){
					
					$(".add-new-translation").removeClass("inactive");
					if(to_click.classList.contains("in")){
						
						console.log("should remove from input only: "+en);
						if(to_click.classList.contains("blue")){
							$(".seperate").removeClass("inactive");
						}else{
							to_click.style.color = "";
							to_click.className = "first";
							document.querySelector(".en").value = "";
						}
					}
					else{
						event.target.style.color = "green";
						var en = event.target.innerHTML;
						to_click.className = "in match_"+i;
						document.querySelector(".en").value += en;
					}
				}
				else{
					$(".add-new-translation").addClass("inactive");
				}
				responsiveVoice.speak(en);
			}
			
			function select_et(event) {
				
				//Function to allow selection of words seperately
				
				var to_click = event.target;
				var et = to_click.textContent;
				
				if($(".replace").hasClass("inactive")){
					if(to_click.classList.contains("in")){ 
						
						console.log("should remove from input only: "+et);
						if(to_click.classList.contains("blue")){
							$(".seperate").removeClass("inactive");
						}else{
							to_click.style.color = "";
							to_click.className = "first";
							document.querySelector(".et").value = "";
						}
						
					}
					else{
						to_click.style.color = "green";
						var et = to_click.innerHTML;
						to_click.className = "in match_"+i;
						document.querySelector(".et").value += et;
					}
				}
				else{
					$(".add-new-translation").addClass("inactive");
				}
				responsiveVoice.speak(et);
			}
			
			$(".add-new-translation").click(function(){
				$(this).addClass("inactive");
			});
			
			function color_blue(){//these functions activate when pairs are confirmed. each function for a match class.
				$(".match_1").unbind("hover").hover(function(){
					$(".match_1").toggleClass("blue");
					$(this).click(function(){
						$(".match_1").toggleClass("red");
					});
				});
				$(".match_2").unbind("hover").hover(function(){
					$(".match_2").toggleClass("blue");
					$(this).click(function(){
						$(".match_2").toggleClass("red");
					});
				});
				$(".match_3").unbind("hover").hover(function(){
					$(".match_3").toggleClass("blue");
					$(this).click(function(){
						$(".match_3").toggleClass("red");
					});
				});
				$(".match_4").unbind("hover").hover(function(){
					$(".match_4").toggleClass("blue");
					$(this).click(function(){
						$(".match_4").toggleClass("red");
					});
				});
				$(".match_5").unbind("hover").hover(function(){
					$(".match_5").toggleClass("blue");
					$(this).click(function(){
						$(".match_5").toggleClass("red");
					});
				});
				$(".match_6").unbind("hover").hover(function(){
					$(".match_6").toggleClass("blue");
					$(this).click(function(){
						$(".match_6").toggleClass("red");
					});
				});
				$(".match_7").unbind("hover").hover(function(){
					$(".match_7").toggleClass("blue");
					$(this).click(function(){
						$(".match_7").toggleClass("red");
					});
				});
				$(".match_8").unbind("hover").hover(function(){
					$(".match_8").toggleClass("blue");
					$(this).click(function(){
						$(".match_8").toggleClass("red");
					});
				});
				$(".match_9").unbind("hover").hover(function(){
					$(".match_9").toggleClass("blue");
					$(this).click(function(){
						$(".match_9").toggleClass("red");
					});
				});
			}

			function seperate(){
				$(".seperate").addClass("inactive");
				if($(".match_1").hasClass("red")){
					$(".match_1").addClass("first");
					$(".match_1").css("color", "");
					$(".match_1").removeClass("in match_1 green red");
				}
				if($(".match_2").hasClass("red")){
					$(".match_2").addClass("first");
					$(".match_2").css("color", "");
					$(".match_2").removeClass("in match_2 green red");
				}
				if($(".match_3").hasClass("red")){
					$(".match_3").addClass("first");
					$(".match_3").css("color", "");
					$(".match_3").removeClass("in match_3 green red");
				}
				if($(".match_4").hasClass("red")){
					$(".match_4").addClass("first");
					$(".match_4").css("color", "");
					$(".match_4").removeClass("in match_4 green red");
				}
				if($(".match_5").hasClass("red")){
					$(".match_5").addClass("first");
					$(".match_5").css("color", "");
					$(".match_5").removeClass("in match_5 green red");
				}
				if($(".match_6").hasClass("red")){
					$(".match_6").addClass("first");
					$(".match_6").css("color", "");
					$(".match_6").removeClass("in match_6 green red");
				}
				if($(".match_7").hasClass("red")){
					$(".match_7").addClass("first");
					$(".match_7").css("color", "");
					$(".match_7").removeClass("in match_7 green red");
				}
				if($(".match_8").hasClass("red")){
					$(".match_8").addClass("first");
					$(".match_8").css("color", "");
					$(".match_8").removeClass("in match_8 green red");
				}
				if($(".match_9").hasClass("red")){
					$(".match_9").addClass("first");
					$(".match_9").css("color", "");
					$(".match_9").removeClass("in match_9 green red");
				}
			}
			
			h = 0;
			
			$("body").on("click", ".paired", function(e){
				var width_of_span = $(this).width();
				var class_ = $(this).attr("class");
				class_.replace(" ", " .");
				console.log(class_);
				$(this).not(".first").not(".in").toggleClass("purple");
				$("."+class_+"").not(".first").not(".in").toggleClass("purple");
				h = 0;
				console.log("hhhhhh: "+h);
				$(".paired").not(this).removeClass("purple");
				$(".replace").toggleClass("inactive");
			});
			
			$("body").on("click", ".replace", function(){
				$(".paired").removeClass("purple");
				$(".replace").addClass("inactive");
			});
			
			$(".first").on("click", function(event){//replace function
				console.log("hhhhhh: "+h);
				var to_click_element = event.target;
				console.log(to_click_element);
				var to_click_text = event.target.textContent;
				var write_over = $(".paired");
				var value_of_purple = document.querySelector(".purple");
				if(write_over.hasClass("purple") && h==0){
					value_of_purple.innerHTML = to_click_text;
					h++;
				}
				else if(write_over.hasClass("purple") && h>0){
					
					if(to_click_element.classList.contains("in")){
						console.log("vajutatav: "+to_click_text);
					}
					else{
						value_of_purple.innerHTML += to_click_text;
					}
				}
				
			});
			
			
			$(".first").mouseover(function(){
				$(this).addClass("green");
			});
			$(".first").mouseout(function(){
				$(this).removeClass("green");
			});
			
			function background_check() {
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (xhttp.readyState == 4 && xhttp.status == 200) {
						user = xhttp.responseText;
						console.log(user);
						
					}
				};
				xhttp.open("GET", "christmas.txt", true);
				xhttp.send();
				
				var xhttp2 = new XMLHttpRequest();//selle asemele peab tegema, et loeks ilma id-ta
				xhttp2.onreadystatechange = function() {
					if (xhttp2.readyState == 4 && xhttp2.status == 200) {
						answer = JSON.parse(xhttp2.responseText);
						answer_without_id = answer.splice(2,3);
						console.log(answer);
						for(i=0; i<answer.length; i++){
							console.log(answer.splice(i, 5));//mingi taoline loogika id-ta lugemiseks?
						}
						
					}
				};
				xhttp2.open("GET", "christmas_correct.txt", true);
				xhttp2.send();
			}
			
			function check_if_correct(){
				setTimeout(function(){
					var et_source = document.querySelector(".section_et");
					var et_source_text = et_source.innerText || et_source.textContent;
					var et_answer = document.querySelector(".value_et");
					var et_answer_text = et_answer.innerText || et_answer.textContent;
					console.log(et_answer_text+" "+et_source_text); //NOT INCLUDED! because it compares raw text. Not taking into account pairs seperately.
					console.log(user);
					console.log(answer);
					console.log(answer_without_id);
					if(user == answer){
						alert("õige");
					}else{
						alert("vale");
					}
				}, 1000);
			}
		</script>
		<script src="app.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		<script src="script.js"></script>
		<script>
			$(".save_en").click(function(){

				$.ajax({
					type: 'POST',
					url: 'update_en.php',
					data:{action:'update_en'},
					success: function(data) {
						alert(data);
					}
				});
			});
		</script>
	</body>
</html>