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
    this.to_hide = document.querySelector('#to-hide');
    this.word_to_guess = document.querySelector('#word-to-guess');
    this.change_language = document.querySelector('#change-language');
    this.submit_to_guess = document.querySelector('#submit-to-guess');
    this.answer_to_guess = document.querySelector('#answer-to-guess');
    this.result_to_guess = document.querySelector('#result-to-guess');
    /* other */
    this.words = [];
    this.word = null;
    this.random_index = null;
    this.permission = 1;
    /* eesti keel = 0, inglise keel = 1 */
    this.language_to_guess = 0;
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

      window.addEventListener('keydown', function(){
        if(window.location.hash === '#test-view' && event.keyCode === 13 && TeadmisteTest.instance.permission === 1){
          TeadmisteTest.instance.submitAnswer(event);
        }
        if(window.location.hash === '#insert-view' && event.keyCode === 13){
          TeadmisteTest.instance.addNewWord(event);
        }
      });
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
      this.change_language.addEventListener('click', this.changeGuessLanguage.bind(this));
      this.result_to_guess.addEventListener('click', this.loseWrongAnswerDisplay.bind(this));
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
      this.estonian_word.value = "";
      this.english_word.value = "";
    },

    changeGuessLanguage: function(event){
      if(this.language_to_guess === 0){
        this.language_to_guess = 1;
      }else{
        this.language_to_guess = 0;
      }
      this.displayNewWord();
      this.answer_to_guess.select();
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
    },

    displayNewWord: function(){
      this.random_index = (Math.random()*(this.words.length-1)).toFixed();
      this.word = new Word();
      this.word = this.words[this.random_index];
      console.log(this.word);
      if(this.language_to_guess === 0){
        this.word_to_guess.innerHTML = this.word.estonian_word;
      }else{
        this.word_to_guess.innerHTML = this.word.english_word;
      }
      this.submit_to_guess.addEventListener('click', this.submitAnswer.bind(this));
    },

    submitAnswer: function(event){
      if(this.answer_to_guess.value === "" || this.answer_to_guess.value === " "){
        this.noUserInput();
      }else{
        event.stopImmediatePropagation();
        if(this.language_to_guess === 0){
          if(this.word.english_word == this.answer_to_guess.value){
            this.rightAnswer();
          }else{
            this.wrongAnswer(this.word.estonian_word, this.word.english_word, this.answer_to_guess.value);
          }
        }else{
          if(this.word.estonian_word == this.answer_to_guess.value){
            this.rightAnswer();
          }else{
            this.wrongAnswer(this.word.estonian_word, this.word.english_word, this.answer_to_guess.value);
          }
        }
        this.answer_to_guess.value = "";
        this.displayNewWord();
      }
    },

    noUserInput: function(){
      this.submit_to_guess.style.background = "yellow";
      this.submit_to_guess.style.border = "yellow";
      this.submit_to_guess.style.color = "white";
      window.setTimeout(function(){
        TeadmisteTest.instance.submit_to_guess.style.background = "#DDDDDD";
        TeadmisteTest.instance.submit_to_guess.style.border = "#DDDDDD";
        TeadmisteTest.instance.submit_to_guess.style.color = "black";
      }, 100);
    },

    wrongAnswer: function(estonian_word, english_word, user_guess){
      this.to_hide.style.display = "none";
      if(this.language_to_guess === 0){
        this.result_to_guess.innerHTML = "<center>" + estonian_word + " != " + user_guess + "<br><br><font size='20'>" + estonian_word + " = " + english_word + "</font><br><br>(oota 5 sekundit või vajuta ekraanile)</center>";
      }else{
        this.result_to_guess.innerHTML = "<center>" + english_word + " != " + user_guess + "<br><br><font size='20'>" + english_word + " = " + estonian_word + "</font><br><br>(oota 5 sekundit või vajuta ekraanile)</center>";
      }
      this.permission = 0;
      window.setTimeout(function(){
        TeadmisteTest.instance.to_hide.style.display = "block";
        TeadmisteTest.instance.result_to_guess.innerHTML = "";
        TeadmisteTest.instance.permission = 1;
        TeadmisteTest.instance.answer_to_guess.select();
      }, 5000);
    },

    loseWrongAnswerDisplay: function(event){
        this.to_hide.style.display = "block";
        this.result_to_guess.innerHTML = "";
        this.permission = 1;
        this.answer_to_guess.select();
    },

    rightAnswer: function(){
      this.submit_to_guess.style.background = "green";
      this.submit_to_guess.style.border = "green";
      this.submit_to_guess.style.color = "white";
      window.setTimeout(function(){
        TeadmisteTest.instance.submit_to_guess.style.background = "#DDDDDD";
        TeadmisteTest.instance.submit_to_guess.style.border = "#DDDDDD";
        TeadmisteTest.instance.submit_to_guess.style.color = "black";
      }, 100);
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
