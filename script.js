(function(){
  "use strict";

  var TeadmisteTest = function(){
    if(TeadmisteTest.instance){
      return TeadmisteTest.instance;
    }
    TeadmisteTest.instance = this;
    this.routes = TeadmisteTest.routes;
    this.currentRoute = null;
    this.words = [];
    this.init();
  };

  window.TeadmisteTest = TeadmisteTest;

  TeadmisteTest.routes = {
    'home-view': {
      'render': function(){}
    },
    'insert-view': {
      'render': function(){}
    },
    'test-view': {
      'render': function(){}
    }
  };

  TeadmisteTest.prototype = {

    init: function(){
      window.addEventListener('hashchange', this.routeChange.bind(this));
      if(!window.location.hash){
        window.location.hash = 'home-view';
      }else{
        this.routeChange();
      }
      this.listenToMouse();
    },

    routeChange: function(){
      console.log('this is', location.hash.substr(1));
      this.currentRoute = location.hash.slice(1);
      if(this.routes[this.currentRoute]){
        this.routes[this.currentRoute].render();
      }
    },

    listenToMouse: function(){
      document.querySelector('.add-new-word').addEventListener('click', this.addNewWord.bind(this));
    },

    addNewWord: function(event){
      var estonian_word = document.querySelector('.estonian-word').value;
      var english_word = document.querySelector('.english-word').value;
      var new_word = new Word(estonian_word, english_word);
      this.words.push(new_word);
      localStorage.setItem('words', JSON.stringify(this.words));
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('salvestan selverisse');
        }
      };
      xhttp.open("GET", "saveWords.php?estonian_word=" + estonian_word +  "&english_word=" + english_word, true);
      xhttp.send();
    },



  };

  var Word = function(new_estonian_word, new_english_word){
    this.estonian_word = new_estonian_word;
    this.english_word = new_english_word;
  };

  window.onload = function(){
    var app = new TeadmisteTest();
  };

})();
