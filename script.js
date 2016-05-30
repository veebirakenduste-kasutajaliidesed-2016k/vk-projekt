SC.initialize({
  client_id: 'af8624e04e20f5c2f2112fa49cada87a',
  redirect_uri: 'http://sc-callback.azurewebsites.net/callback.html'
});

SC.connect(function(){
  SC.get("/me", function(me){
    $("#username").text(me.username);
  });
});

(function(){
    "use strict";

    var App = function(){

        if(App.instance){
        return App.instance;
    }

    App.instance = this;

    this.run();

    };

    window.App = App;

/*var track_url = 'https://soundcloud.com/wearegalantis/no-money-ultra-edit-126-bpm-1';
SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
});*/



  App.prototype = {

    search: function(event){
        var search = document.querySelector('#search').value.toLowerCase();
        console.log(search);

        SC.get('/tracks', { genres: search }, function(tracks) {
          $(tracks).each(function(index, track) {
            $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
          });
        });
    }

  };

  window.onload = function(){
      var t = new App();
      };
})();
