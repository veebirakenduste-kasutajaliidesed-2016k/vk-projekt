(function($) {   //funktsioon läheb kohe tööle (an immediately-invoked function expression)
  "use strict";
  var GameLogic = (function(){
    var instance; //üks koopia klassist, ei kordu

    function init(){  //kogu funktsionaalsus on siin sees, ka muutujad
      var question = [];
      var totalAnswers = 0;  //algväärtus
      var correctAnswers = 0;
      var startTime;
      var difficulty=1;
      function newQuestion(){
        startTime = Date.now();
        if (totalAnswers % 5 === 0 && totalAnswers !==0) {
          difficulty=2;
        }
        question[0] = Math.floor(Math.random()*10 +1);
        question[1] = Math.floor(Math.random()*10 +1)*difficulty;
        $('h2').text(question[0] +'*'+question[1]); //jquery html elementide viitamine, text - elemendi sisu muutmine
      }
      function checkAnswer(){
        if (parseInt($("input:first").val()) == question[0]*question[1]){
          correctAnswers++;
          saveData(true);
        } else {
          saveData(false);
        }
        totalAnswers++;
        $('h3').text(correctAnswers+'/'+totalAnswers); //progress
        $("input:first").val('');  //inputi väärtuse tühjendamine, jquery
      }
      function saveData(correct){        //AJAX salvestamine
        var promise = $.post("info.php", {
          data: {
            question: question,
            answer: correct,
            time: Date.now()-startTime
          }
        });
      }




      return {
       newQuestion: newQuestion,
       checkAnswer: checkAnswer

     };
    }

    return {
      getInstance: function(){
        if(!instance){
          instance=init();
        }
        return instance;
      }
    };
  })();

  var logic=GameLogic.getInstance();
  logic.newQuestion();
  $('form').submit(function(e){   //jQuery funktsionaalsus
     e.preventDefault(); //et ei läheks mujale edasi
     logic.checkAnswer();
     logic.newQuestion();

  });

}(window.jQuery));
