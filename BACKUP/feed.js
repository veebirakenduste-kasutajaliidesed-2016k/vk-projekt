
var $grid;

$(function() {

  //laetud

  //getTweets();

  $('#searchbutton').on("click", function(){
      var param = $('#searchfield').val();
      console.log(param);
      getOki(param);
      getSoov(param);
  });

  $grid = $('#content').isotope({
	  //üks kast
	  itemSelector: ".item"
  });


});

function getSoov(param){

	//ajax
  console.log("loading...");

	$.ajax({
		url: "soov.php?search="+param,
		success: function(data){
      console.log("loaded");
			//stringi teen massiiviks
			//var array = JSON.parse(data).statuses;
      var array = JSON.parse(data);
			console.log(array);
			//printTweets(array);

		},
		error: function(error){
			console.log(error);
		}
	});

}

function getOki(param){

	//ajax
  console.log("loading...");

	$.ajax({
		url: "okidoki.php?search="+param,
		success: function(data){
      console.log("loaded");
			//stringi teen massiiviks
			//var array = JSON.parse(data).statuses;
      var array = JSON.parse(data);
			console.log(array);
			//printTweets(array);

		},
		error: function(error){
			console.log(error);
		}
	});

}

function printSoov(newPosts){

	var html = '';

	$(newPosts).each(function(i, post){

		html += '<div class="item"><h1>'+post.title+'</h1><img src='+post.image+'/><p><a href=#>'+post.title+'</p><p>'+post.desc+'</p></div>';

	});

	//$("#content").append( $(html) );

	var postsHTML = $(html);

	$grid.prepend(postsHTML)
	     .isotope('prepended', postsHTML)
		 .isotope('layout');

	//oota ja siis küsi uuesti
	window.setTimeout(function(){
		getSoov();
	},10000);



}

function printOki(newPosts){

	var html = '';

	$(newPosts).each(function(i, post){

    html += '<div class="item"><h1>'+post.title+'</h1><img src='+post.image+'/><p><a href=#>'+post.title+'</p><p>'+post.desc+'</p></div>';


	});

	//$("#content").append( $(html) );

	var postsHTML = $(html);

	$grid.prepend(postsHTML)
	     .isotope('prepended', postsHTML)
		 .isotope('layout');

	//oota ja siis küsi uuesti
	window.setTimeout(function(){
		getOki();
	},10000);



}
