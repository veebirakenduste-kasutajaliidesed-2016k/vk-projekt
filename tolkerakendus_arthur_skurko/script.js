setTimeout(function(){
	$(document).ready(function(){
		$("span.paired").mouseover(function(e){
			setTimeout(function(){
				var speaks = e.target.textContent;
				responsiveVoice.speak(speaks);
				console.log(speaks);
			}, 500);
		});
		
		$("body").on("hover", "span.match0", function(e){
			$(".match0").toggleClass("blue");
		});
		$("body").on("hover", "span.match1", function(e){
			$(".match1").toggleClass("blue");
		});
		$("body").on("hover", "span.match2", function(e){
			$(".match2").toggleClass("blue");
		});
		$("body").on("hover", "span.match3", function(e){
			$(".match3").toggleClass("blue");
		});
		$("body").on("hover", "span.match4", function(e){
			$(".match4").toggleClass("blue");
		});
		$("body").on("hover", "span.match5", function(e){
			$(".match5").toggleClass("blue");
		});
		$("body").on("hover", "span.match6", function(e){
			$(".match6").toggleClass("blue");
		});
		$("body").on("hover", "span.match7", function(e){
			$(".match7").toggleClass("blue");
		});
		$("body").on("hover", "span.match8", function(e){
			$(".match8").toggleClass("blue");
		});
		$("body").on("hover", "span.match9", function(e){
			$(".match9").toggleClass("blue");
		});
		$("body").on("hover", "span.match10", function(e){
			$(".match10").toggleClass("blue");
		});
		
		$(".section_en").css("pointerEvents","initial");
		$(".section_et").css("pointerEvents","initial");
		console.log("JQUERY saab valmis setTimeout-iga");
	});
		
/* 	$(".add-new-translation").click(function(){
		$(".match_1").hover(function(){
			$(".match_1").toggleClass("blue");
		});
		$(".match_2").hover(function(){
			$(".match_2").toggleClass("blue");
		});
		$(".match_3").hover(function(){
			$(".match_3").toggleClass("blue");
		});
		$(".match_4").hover(function(){
			$(".match_4").toggleClass("blue");
		});
		$(".match_5").hover(function(){
			$(".match_5").toggleClass("blue");
		});
		$(".match_6").hover(function(){
			$(".match_6").toggleClass("blue");
		});
	});
 */}, 1000);