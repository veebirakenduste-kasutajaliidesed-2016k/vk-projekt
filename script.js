(function(){
  "use strict";

  var TeadmisteTest = function(){
    if(TeadmisteTest.instance){
      return TeadmisteTest.instance;
    }
    TeadmisteTest.instance = this;
    /* cache */
    this.cache = window.applicationCache;
    this.startCacheListeners();
    /* routes */
    this.routes = TeadmisteTest.routes;
    this.currentRoute = null;
    /* queryselector */
    this.estonian_word = document.querySelector('.estonian-word');
    this.english_word = document.querySelector('.english-word');
    this.add_new_word = document.querySelector('.add-new-word');
    this.word_to_guess = document.querySelector('#word-to-guess');
    this.submit_to_guess = document.querySelector('#submit-to-guess');
    this.answer_to_guess = document.querySelector('#answer-to-guess');
    this.result_to_guess = document.querySelector('#result-to-guess');
    /* other */
    this.words = [];
    this.word = null;
    this.random_index = null;
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
      this.loadWords();
    },

    routeChange: function(){
      console.log('this is', location.hash.substr(1));
      this.currentRoute = location.hash.slice(1);
      if(this.routes[this.currentRoute]){
        this.routes[this.currentRoute].render();
      }
    },

    listenToMouse: function(){
      this.add_new_word.addEventListener('click', this.addNewWord.bind(this));
    },

    addNewWord: function(event){
      var estonian_word = this.estonian_word.value;
      var english_word = this.english_word.value;
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

    loadWords: function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        var TeadmisteTest_ref = TeadmisteTest.instance;
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          var result = JSON.parse(xhttp.responseText);
          TeadmisteTest_ref.words = result;
          console.log(TeadmisteTest_ref.words);
          TeadmisteTest_ref.start();
        }
      };
      xhttp.open("GET", "saveWords.php", true);
      xhttp.send();
    },

    start: function(){
      this.displayNewWord();
      console.log(this.words);
    },

    displayNewWord: function(){
      this.random_index = (Math.random()*(this.words.length-1)).toFixed();
      console.log(this.random_index);
      this.word = new Word();
      this.word = this.words[this.random_index];
      console.log(this.word);
      this.word_to_guess.innerHTML = this.word.estonian_word;
      this.submit_to_guess.addEventListener('click', this.submitAnswer.bind(this));
    },

    submitAnswer: function(event){
      event.stopImmediatePropagation();
      if(this.word.english_word == this.answer_to_guess.value){
        this.result_to_guess.innerHTML = "ÕIGE";
      }else{
        this.result_to_guess.innerHTML = "VALE";
      }
      this.displayNewWord();
    },

    startCacheListeners: function(){
      window.applicationCache.addEventListener('updateready', function(){
        window.applicationCache.swapCache();
        console.log('swap cache has been called');
      }, false);
      setInterval(function(){
        TeadmisteTest.instance.cache.update();
      }, 10000);
    }

  };

  var Word = function(new_estonian_word, new_english_word){
    this.estonian_word = new_estonian_word;
    this.english_word = new_english_word;
  };

  window.onload = function(){
    var app = new TeadmisteTest();
  };

})();
