(function(){
    "use strict";

    var App = function(){

        if(App.instance){
        return App.instance;
    }

    App.instance = this;

    this.routes = App.routes;
    console.log(this);

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
            if(localStorage.memoArray){
                this.createList(JSON.parse(localStorage.memoArray));
                console.log('Laadisin localstoragest');
            }else{
                console.log('tühi localstorage');
            }
        this.bindEvents();
    },

    bindEvents: function(){

        document.querySelector('#search').addEventListener('keyup', this.search.bind(this));

    },

    search: function(event){
      
        var search = document.querySelector('#search').value.toLowerCase();

        if( search !== null && ' '){
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
      var track_url = 'https://soundcloud.com/wearegalantis/no-money-ultra-edit-126-bpm-1';
      SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
      });
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

    }

  };

  window.onload = function(){
      var t = new App();
      };
})();
