(function($) { //funktsioon läheb kohe tööle (an immediately-invoked function expression)
    "use strict";
    var appCache = window.applicationCache;

    var GameLogic = (function() {
        var instance; //üks koopia klassist, ei kordu

        function init() { //kogu funktsionaalsus on siin sees, ka muutujad
            var question = [];
            var answers = []; // see massiiv hakkab salvestama vastuseid
            var totalAnswers = 0; //algväärtus
            var correctAnswers = 0;
            var startTime;
            var difficulty = 1;
            var player;

            function getPlayer() {
                bootbox.prompt("Palun kirjuta oma nimi:", function(result) {
                    player = result;
                    console.log(player);
                });

            }

            function newQuestion() {
                startTime = Date.now();
                if (totalAnswers % 5 === 0 && totalAnswers !== 0) {
                    difficulty = 2;
                }
                question[0] = Math.floor(Math.random() * 10 + 1);
                question[1] = Math.floor(Math.random() * 10 + 1) * difficulty;
                $('h2').text(question[0] + '*' + question[1]); //jquery html elementide viitamine, text - elemendi sisu muutmine
            }

            function checkAnswer() {
                if (parseInt($("input:first").val()) == question[0] * question[1]) {
                    correctAnswers++;
                    answers.push({
                        player: player,
                        question: question,
                        answer: parseInt($("input:first").val()), //siia saab ainult numbreid panna
                        correct: true,
                        time: Date.now() - startTime
                    });
                } else {
                    answers.push({
                        player: player,
                        question: question,
                        answer: parseInt($("input:first").val()),
                        correct: false,
                        time: Date.now() - startTime
                    });
                }
                totalAnswers++;
                $('h3').text(correctAnswers + '/' + totalAnswers); //progress
                $("input:first").val(''); //inputi väärtuse tühjendamine, jquery
                if (totalAnswers === 10) {
                    saveData();  //alles siin lähevad tulemused serverisse
                    bootbox.confirm("Kokku said " + correctAnswers + " punkti!", function(result) {
                        totalAnswers = 0;
                        correctAnswers = 0;
                        difficulty = 1;
                        $('h3').text("");
                        getPlayer();
                        newQuestion();
                    });
                }
            }

            function saveToStorage() {   //offline salvestus
                if (typeof(Storage) !== "undefined") {  //viisakas vanade brauserite suhtes
                    if (localStorage.getItem('data') === null) {  //kui pole ees midagi
                        localStorage.setItem('data', JSON.stringify(answers));  //muuda json kujule
                    } else {
                        var temp = [];  //kui on midagi ees, hakkame massiive liitma temp on eelmised asjad
                        temp = JSON.parse(localStorage.getItem('data'));  //võtab olemasoleva info localstoragest ja paneb selle temp massiivi
                        temp.concat(answers);  //liitmine, uued asjad (answers) temp massiivile
                        localStorage.setItem('data', JSON.stringify(temp)); //salvestatakse localstoragesse, vanad ja uued kokku
                    }
                }
            }




            return {
                newQuestion: newQuestion,
                checkAnswer: checkAnswer,
                getPlayer: getPlayer

            };
        }

        return {
            getInstance: function() {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        };
    })();

    var logic = GameLogic.getInstance();
    logic.getPlayer();
    logic.newQuestion();

    $('form').submit(function(e) { //jQuery funktsionaalsus
        e.preventDefault(); //et ei läheks mujale edasi
        logic.checkAnswer();
        logic.newQuestion();
    });
    window.addEventListener("load", function(t) {
        window.applicationCache.addEventListener("updateready", function(e) {
            if (appCache.status == window.applicationCache.UPDATEREADY) { //offline loogika
                window.location.reload();
                // appCache.swapCache();
            }
        }, false);
    }, false);


}(window.jQuery));
