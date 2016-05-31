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
                  //console.log($('#results').value);
                  $(tracks).each(function(index, track) {
                    $('#results').append($('<li><a id="list"></a></li>').html(track.title + ' - ' + track.genre));
                    //console.log(track.uri);
                    //document.querySelector('#list').addEventListener("click", function() {document.getElementById('embed').src = "https://w.soundcloud.com/player/?url=" + track.uri + "&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";});
                  });
          });
        }
    },

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

    },

    startCacheListeners: function(){
      window.addEventListener('load', function(e) {

        window.applicationCache.addEventListener('updateready', function(e) {
          if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
              appCache.swapCache();
            }
        }, false);

      }, false);
    }
  };

  window.onload = function(){
      var t = new App();
      };
})();
