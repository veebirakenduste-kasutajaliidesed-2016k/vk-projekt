
var $grid;
var tweetHistory = [];


$(function(){
  //leht laetud
  getTweets();

  $grid = $('#content').isotope({
    //üks kast
    itemSelector: ".item"
  });
});

function getTweets(){

  //ajax
  $.ajax({
    url: "getfeed.php",
    success: function(data){

      var array = JSON.parse(data).statuses;


      //console.log(data);
      printTweets(array);
      tweetHistory.push(id);
    },
    error: function(error){
      console.log(error);
    }
  });

}

function printTweets(newTweets){

  var html = '';

  $(newTweets).each(function(i, tweet){

    if(($.inArray(id, tweetHistory)) != -1){
    //html += '<div>'+i+'</div>';
      html += '<div class="item">'+
        '<div class="profile-image" style="background-image:url('+tweet.user.profile_image_url.replace("_normal", "")+')"></div>'+
        '<p>'+tweet.user.name+'</p>'+
        '<p>'+tweet.text+'</p>'+

      '</div>';
    }
  });

  //$("#content").append( $(html) );

  var tweetsHTML = $(html);

  $grid.prepend($(tweetsHTML))
       .isotope('prepended', $(tweetsHTML))
       .isotope('layout');

  //oota ja siis küsi uuesti
  window.setTimeout(function(){
    getTweets();
  },10000);



}
