
var $grid;
  var done = 0;
$(function() {
//välja kuvamine



//



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
			for(var i = 0; i<array.length;i++){
				console.log(array[i].desc.length);
				if(array[i].desc.length > 175){
					array[i].desc.substring(0, 175);
					array[i].desc += "...";
				}
				$('body').append("<a class='item soov' href="+array[i].href+"><img src="+array[i].image+"/><h1>"+array[i].title+"</h1><p>"+array[i].desc+"</p></a>");
			}
      done++;
      doneRequest();
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
		//url: "okidoki.php?search="+param,
		url: "okidoki.php?search="+param,
		success: function(data){
      console.log("loaded");
			//stringi teen massiiviks
			//var array = JSON.parse(data).statuses;
      var array = JSON.parse(data);
			console.log(array);
			for(var i = 0; i<array.length;i++){
				$('body').append("<a href="+array[i].href+" class='item oki'><img src="+array[i].image+"/><h1>"+array[i].title+"</h1><p>"+array[i].desc+"</p></a>");
			}
			//printTweets(array);
      done++;
      doneRequest();

		},
		error: function(error){
			console.log(error);
		}
	});

}

function  doneRequest(){
  console.log("tehtud", done);
  if(done==2){
    console.log("Mõlemad päringud tehtud");
  }
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
