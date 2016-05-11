
var $grid;

$(function() {

  //laetud

  //getTweets();

  $('#searchbutton').on("click", function(){
      var param = $('#searchfield').val();
      console.log(param);
      getPosts(param);
  });

  $grid = $('#content').isotope({
	  //üks kast
	  itemSelector: ".item"
  });


});


function getPosts(param){

	//ajax
  console.log("loading...");

	$.ajax({
		url: "getsearch.php?search="+param,
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

function printPosts(newPosts){

	var html = '';

	$(newPosts).each(function(i, post){

		html += '<div class="item">'+
		
			'<h1>'+post.title'</h1>'+
			'<p>'+post.image+'</p>'+
			'<p><a href='+post.href+'>'+post.title+'</p>'+
			'<p>'+post.desc+'</p>'+
			

		'</div>';

	});

	//$("#content").append( $(html) );

	var postsHTML = $(html);

	$grid.prepend(postsHTML)
	     .isotope('prepended', postsHTML)
		 .isotope('layout');

	//oota ja siis küsi uuesti
	window.setTimeout(function(){
		getTweets();
	},10000);



}
