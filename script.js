(function(){
    "use strict";

    var App = function(){

        if(App.instance){
        return App.instance;
    }

    App.instance = this;

    this.routes = App.routes;

    this.currentRoute = null;

    this.memoArray = [];

    this.run();

    };


    SC.initialize({
      client_id: 'af8624e04e20f5c2f2112fa49cada87a',
      redirect_uri: 'http://sc-callback.azurewebsites.net/callback.html'
    });

    SC.connect(function(){
      SC.get("/me", function(me){
        $("#username").text(me.username);
        $("#first_name").text(me.first_name);
        $("#last_name").text(me.last_name);
        $("#country").text(me.country);
        $("#description").text(me.description);
        $("#followers_count").text(me.followers_count);
        document.getElementById('permalink_url').href = me.permalink_url;
        document.getElementById("avatar_url").src = me.avatar_url;
      });
    });

    soundcloud.addEventListener('onPlayerReady', function(player, data) {
      player.api_play();
    });

    window.App = App;

    App.routes = {
        'home-view':{
            'render': function(){
            }
        },
        'listen-view':{
            'render': function(){
            }
        },
        'account-view': {
            'render': function(){
            }
        }
    };

  App.prototype = {
    run: function(){

        window.addEventListener('hashchange', this.routeChange.bind(this));
        if(!window.location.hash){
            window.location.hash = 'home-view';
        }else{
            this.routeChange();
        }

        this.bindEvents();
    },

    bindEvents: function(){

        document.querySelector('#search').addEventListener('keyup', this.search.bind(this));

    },

    search: function(event){
        var search = document.querySelector('#search').value.toLowerCase();

        if(search === null || search === ' ' || search === '' || typeof(search) === 'undefined'){
          console.log('tühi otsing');
          $('#results').empty();
        }else{
          console.log(search);
          SC.get('/tracks', { genres: search }, function(tracks) {
              $('#results').empty();
                  console.log($('#results').value);
                  $(tracks).each(function(index, track) {
                    $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
                  });
          });
        }
    },

    player: function() {
      window.onload = function(){
            var iframe = document.querySelector('#widget');
            iframe.src = 'http://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/43315398&auto_play=true';

            var widget = SC.Widget(iframe);

            widget.bind(SC.Widget.Events.PLAY, function(eventData) {
                alert('Playing...');
            });
    };},

    routeChange: function(event){
        this.currentRoute = location.hash.slice(1);
        console.log(this.currentRoute);
        if(this.routes[this.currentRoute]){
            this.updateMenu();
            this.routes[this.currentRoute].render();
        }else{
        }
    },

    updateMenu: function() {

      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

      document.querySelector('.'+this.currentRoute).className += ' active-menu';

    }

  };

  window.onload = function(){
      var t = new App();
      };
})();
