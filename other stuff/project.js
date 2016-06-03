(function(){
  "use script";

  var Project = function(){

    if(Project.instance){
      return Project.instance;
    }

    Project.instance = this;

    this.routes = Project.routes;

    console.log("Projekti sees");

    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    this.messages=[];

    this.init();

  };

  window.Project = Project;

  Project.routes = {
    'home-view': {
      'render': function(){
        console.log('>>>>avaleht');
      }
    },
    'list-view': {
      'render': function(){
        console.log('>>>>loend');

        window.setTimeout(function(){
          document.querySelector('.loading').innerHTML = 'Laetud!';
        }, 3000);
      }
    },
    'manage-view': {
      'render': function(){

      }
    }
  };

  Project.prototype = {
    init: function(){
      console.log("Rakendus läks tööle");

      window.addEventListener('hashchange', this.routeChange.bind(this));

      if(!window.location.hash){
        window.location.hash = 'home-view';
      }else{
        this.routeChange();
      }

      if(localStorage.messages){
        this.createListFromArray = JSON.parse(localStorage.messages);
        console.log('laadisin localStorageist massiivi ' + this.messages.length);

      }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          console.log(xhttp.readyState);

          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var result = JSON.parse(xhttp.responseText);
            console.log(result);

            Project.instance.createListFromArray(result);
            console.log('laadisin serverist');
          }
        };
        xhttp.open("GET", "data.php", true);
        xhttp.send();
      }
    },
    createListFromArray: function(arrayOfObjects){
      this.messages = arrayOfObjects;

      this.messages.forEach(function(message){
        var new_message = new Message(message.title, message.message);
        var li = new_message.createHtmlElement();
        document.querySelector('.list-of-messages').appendChild(li);
      });

      this.bindEvents();
    },

    bindEvents: function(){
      document.querySelector('.add-new-message').addEventListener('click',this.addNewClick.bind(this));

    },

    addNewClick: function(title, message){

      var new_message = new Message(title, message);

      this.messages.push(new_message);
      console.log(JSON.stringify(this.messages));

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
          console.log('salvestas serverisse');
        }
      };
      console.log("data.php?title="+title+"&message="+message);
      xhttp.open("GET","data.php?title="+title+"&message="+message,true);
      xhttp.send();

      var li = new_message.createHtmlElement();
      document.querySelector('.list-of-messages').appendChild(li);
    },
    routeChange: function(event){
      this.currentRoute = location.hash.slice(1);
      console.log(location.currentRoute);

      if(this.routes[this.currentRoute]){
        this.updateMenu();
        this.routes[this.currentRoute].render();
      }else{

      }
    },
    updateMenu: function(){
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('.active-menu', '');

      document.querySelector('.'+this.currentRoute).className += ' active-menu';
    },
  };

  var Message = function(new_title, new_message){
    this.title = new_title;
    this.message = new_message;
    console.log('created new message');
  };

  Message.prototype = {
    createHtmlElement: function(){
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'letter';

      //var letter = document.createTextNode(this.team.charAt(0));
      //span.appendChild(letter);

      li.appendChild(span);

      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.message);
      span_with_content.appendChild(content);

      li.appendChild(span_with_content);

      return li;
    }
  };

  window.onload=function(){
    var app = new Project();
  };
})();
