
var $grid;

$(function() {

  //laetud

  //getTweets();

  $('#searchbutton').on("click", function(){
      var param = $('#searchfield').val();
      console.log(param);
      getTweets(param);
  });

  $grid = $('#content').isotope({
	  //üks kast
	  itemSelector: ".item"
  });


});


function getTweets(param){

	//ajax
  console.log("loading...");

	$.ajax({
		url: "getsearch.php?search="+param,
		success: function(data){
console.log("loaded");
			//stringi teen massiiviks
			//var array = JSON.parse(data).statuses;

			console.log(data);
			//printTweets(array);

		},
		error: function(error){
			console.log(error);
		}
	});

}

function printTweets(newTweets){

	var html = '';

	$(newTweets).each(function(i, tweet){

		html += '<div class="item">'+

			'<div class="profile-image" style="background-image:url('+tweet.user.profile_image_url.replace("_normal", "")+')"></div>'+
			'<p>'+tweet.user.name+'</p>'+
			'<p>'+tweet.text+'</p>'+

		'</div>';

	});

	//$("#content").append( $(html) );

	var tweetsHTML = $(html);

	$grid.prepend(tweetsHTML)
	     .isotope('prepended', tweetsHTML)
		 .isotope('layout');

	//oota ja siis küsi uuesti
	window.setTimeout(function(){
		getTweets();
	},10000);



}
