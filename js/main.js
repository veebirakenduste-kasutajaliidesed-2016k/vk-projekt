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
      var player;
      function getPlayer(){
        bootbox.prompt("Palun kirjuta oma nimi:", function(result){
          player=result;
          console.log(player);
        });

      }
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
        $('h3').text(correctAnswers + '/' + totalAnswers); //progress
        $("input:first").val('');  //inputi väärtuse tühjendamine, jquery
        if(totalAnswers === 10) {
          bootbox.confirm("Kokku said " + correctAnswers + " punkti!", function(result) {
            totalAnswers=0;
            correctAnswers=0;
            difficulty=1;
            $('h3').text("");
            getPlayer();
            newQuestion();
          });
        }
      }
      function saveData(correct){        //AJAX salvestamine
        var promise = $.post("info.php", {
          data: {
            player: player,
            question: question,
            answer: correct,
            time: Date.now()-startTime
          }
        });
      }




      return {
       newQuestion: newQuestion,
       checkAnswer: checkAnswer,
       getPlayer: getPlayer

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
  logic.getPlayer();
  logic.newQuestion();

  $('form').submit(function(e){   //jQuery funktsionaalsus
     e.preventDefault(); //et ei läheks mujale edasi
     logic.checkAnswer();
     logic.newQuestion();
  });

}(window.jQuery));
