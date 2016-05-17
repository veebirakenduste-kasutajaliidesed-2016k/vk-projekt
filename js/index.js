window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 'õ','ä','ö','ü'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var data;
  var index;

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  var audio = new Audio("sound.mp3");
  var win = new Audio("win.mp3");
  var lose = new Audio("lose.mp3");





  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };


  // Select Category
  /*var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Kategooriaks on Eesti korvpalliklubid";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Kategooriaks on Eesti filmid";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Kategooriaks on Eesti linnad";
    }
  };*/

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
   comments = function () {
    showLives.innerHTML = "Sul on " + lives + " elu";
    if (lives < 1) {
      showLives.innerHTML = "Mäng läbi";
      lose.play();

    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "Sa võitsid";
        win.play();
        localStorage.setItem("guessed word",word);
      }
    }
  };

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  };


   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    };

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
    audio.play();

};

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 100, 50);
   };

   leftArm = function() {
     draw (60, 46, 20, 50);
   };

   rightLeg = function() {
     draw (60, 70, 100, 100);
   };

   leftLeg = function() {
     draw (60, 70, 20, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for ( i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    },

    document.onkeypress = function () {
      var key;
      var char;
      var geuss = (this.innerHTML);
      if (window.event)
              key = window.event.keyCode;
          else if (e)
              key = e.which;
          else
              return true;
      char = String.fromCharCode(key);
      console.log(char);

      var list = document.querySelectorAll("ul#alphabet li");
      //console.log(list);

      var allow = true;

      for(var k = 0; k < list.length; k++){
        if(list[k].innerHTML == char && list[k].className =="active"){
          allow = false;
        }
      }

      if(!allow){
        console.log(char+ " juba vajutatud");
        return;
      }else{
        for(var l = 0; l < list.length; l++){
          if(list[l].innerHTML == char){
            list[l].className = "active";
          }
        }
      }


      this.onkeyup = null;
      for ( i = 0; i < word.length; i++) {
        if (word[i] === char) {
          geusses[i].innerHTML = char;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss=char));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  };


  // Play
  play = function () {
  /*  categories = [
        ["rakvere-tarvas", "avis-rapla", "tartu-rock", "kalev-cramo", "audentes", "bc-valga"],
        ["suvi", "mandariinid", "klassikokkutulek", "vehkleja", "viimne-reliikvia", "raju-reede"],
        ["rakvere", "narva", "viljandi", "kuressaare", "paide", "rapla", "tamsalu", "tapa", "tartu"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];*/

    data = [{"word":"paks","syns":["ebasünnis","mahukas","pära","rase","suur","tihe","umbne"]},{"word":"armas","syns":["heatahtlik","kena","kena"]},{"word":"kallis","syns":["armas","kulukas","kõrge","väärtuslik","õilis"]},{"word":"kahvel","syns":["ehmunud","kahevahel","plaat"]},{"word":"hunt","syns":["julmur","kogenud","väga"]},{"word":"nupp","syns":["aru","kirjutis","pea"]},{"word":"pilt","syns":["film","foto","kujutlus","maal","seisund","vaade","ülevaade"]},{"word":"kiri","syns":["dokument","epistolaarne","kirjaoskus","kuulutus","käekiri","muster","mustriline","piibel","tekstuur","tõend"]},{"word":"vesi","syns":["higi","kusi","lurr","paljusõnalisus","veekogu"]},{"word":"hapnik","syns":["ainus","edev","haigutus","haruldus","hellik","herilane","hõre","hüpiknukk","hüppaja","katkendlik","kelk","lapergune","lihtsameelne","lõke","naine","pirtsakas","pops","pärg","rakkekohustuslane","võitlus"]},{"word":"meri","syns":["avameri","kiitlema","tusane"]},{"word":"ookena","syns":["enne","heatahtlik","kiiresti","noorelt","nõus","rohke"]},{"word":"juhe","syns":["autojuht","dirigent","hirmus","hoog","juhtiv","juhtum","kohev","koit","lõhn","nägu","saatja","suur","taipamatu","väga","värving"]},{"word":"valgus","syns":["headus","optiline","rõõm"]},{"word":"gravitatsioon","syns":["laevandus","laevasõit","lennundus","õnnitlus"]},{"word":"tume","syns":["madal","must","rõhuv","segane","tuhm","võhiklik"]},{"word":"s\u00e4rav","syns":["efektne","ere","rõõmus","tore"]},{"word":"j\u00e4me","syns":["ebasünnis","madal","paks","rohmakas","rohmakas","suur","sõmer"]},{"word":"kandiline","syns":["nurgeline","purjus","rohmakas"]},{"word":"kole","syns":["hirmus","suur","väga"]},{"word":"kiire","syns":["jõudus","kiirgus","rutt"]},{"word":"karvane","syns":["ebasünnis","karvik","rikas","vihane","õel"]},{"word":"hele","syns":["blond","ere","terav","valge","õnnelik"]},{"word":"kiilakas","syns":["kiilas","kõrvakiil","nudi"]},{"word":"paindlik","syns":["elastne","järeleandlik","nõtke","nõtke"]},{"word":"ilus","syns":["rohke","sobilik","tore"]},{"word":"hing","syns":["elu","hingamine","hingeelu","inimene","rind","õhk"]},{"word":"\u00fchendus","syns":["kommunikatsioon","liit","side"]},{"word":"nupp","syns":["aru","kirjutis","pea"]},{"word":"tark","syns":["kaine","keeruline","nõid"]},{"word":"loll","syns":["nõrgamõistuslik","piinlik","rumal","tobe","tobu","võhiklik"]},{"word":"\u00fcksik","syns":["ainus","haruldane","konkreetne","paaritu","ühene","üksildane"]},{"word":"libe","syns":["kaval","kiilas","leelis","pugejalik"]},{"word":"kuri","syns":["halb","halbus","karm","kurat","raske","ränk","suur","vihane","õel"]},{"word":"armas","syns":["heatahtlik","kena","kena"]},{"word":"sujuv","syns":["harmooniline","ladus","nõtke"]},{"word":"rumal","syns":["ebasünnis","nõrgamõistuslik","tobe","võhiklik"]},{"word":"tark","syns":["kaine","keeruline","nõid"]},{"word":"a\u0122\u20ac","syns":["aabits","abiline","aedik","aimus","ainult","ajaline","ajend","ajujaht","akumulaator","algne","algteadmised","algus"]},{"word":"\u0106\u00a0","syns":["eba-","ei","just","kas"]},{"word":"aa","syns":["abil","agraarne","ainult","ajaline","alumine","austus","eba-","eesti","esimene","ikka","isegi","kuidas","lahtine","maailm","maakoht"]},{"word":"aabitsakursus","syns":["algteadmised","koolitarkus","teadmised"]},{"word":"aabitsatarkus","syns":["algteadmised","koolitarkus","teadmised"]},{"word":"aabitsat\u0106\u00bckk","syns":["algteadmised","koolitarkus","lihtne","teadmised","truism"]},{"word":"aadama","syns":["kummutama","lobisema","mees"]},{"word":"aadlineiu","syns":["aadel","aadlik","naaber"]},{"word":"aakrik","syns":["adratalupoeg","kahekordne","peenutsev","pitsiline","puhmastik","rakkekohustuslane","saar","sassis","tihnik","virvarr","võsa"]},{"word":"aaloe","syns":["ahne","avaldus","härdameelne","kae","kahvatu","kaldumine","kalk","karm","karm","kurb","kõle","kõva","kõva","lang","loss","lumine","maneer","matmispaik","mõte","nägu","nägu","olemus"]},{"word":"aamor","syns":["korras","laager","laboratoorium","maapind","tünn","vasar","veresoon"]},{"word":"aanika","syns":["hirm","viljakas","ähm"]},{"word":"aar","syns":["haru","joove","kali","kohupiim","kord","lai","leil","mõni","pinge","ring","ruumikas","silmus","taat","tegu","tünn","vanaisa","vara","vara","võlviline"]},{"word":"aara","syns":["elamu","kiskraud","kuur","loba","rikkus","rõngas","tila"]},{"word":"aarde","syns":["mõte","vara","vara"]},{"word":"aarine","syns":["arg","armastajapaar","austatud","ebaõiglane","elegantne","halb","hoog","igapäevane","iidne","kare","karm","karvane","katkine","konstruktsioon","kurb","kõlbeline","kähe","lihtne","luupainaja","materjal","must","mürin"]},{"word":"aarja","syns":["ebaõnnestuma","jumalaema","karjatama","näljane","pesamuna","ründama","sarnane","surema","surmama","vajama","vihastama","vihastuma","ühepikkune"]},{"word":"aarjalased","syns":["juuksed","karjaõu","vistrik"]},{"word":"aasa","syns":["aastane","abielunaine","abikaasa","aeglaselt","hulka","reetur","salaja","silmus","viigiline"]},{"word":"aasakujuline","syns":["kausjas","munajas","ubajas","ümmargune"]},{"word":"Aasia","syns":["aastane","pilkama","pilkav"]},{"word":"aasia","syns":["aastane","pilkama","pilkav"]},{"word":"aastakasv","syns":["pastapliiats","taibukas","tõrges","vastupidine"]},{"word":"aastak\u0106\u00a4ik","syns":["aasta","vaenlane","vastamisi","vastupidine","ükskõik"]},{"word":"aastapalk","syns":["asjamees","hüvitus","sajand"]},{"word":"aastapidu","syns":["ammu","kaua","vana"]},{"word":"aastapoiss","syns":["karjus","kosilane","kurat","puhkpillimängija","saapasulane","seakarjus","sulane","varas"]},{"word":"aastaselt","syns":["aeglaselt","tasa","äsja"]},{"word":"aastatulu","syns":["dividend","klahvistik","lisateenistus","vana"]},{"word":"aate","syns":["astang","etapp","järk","kraad","käimine","mõte","samm","tase","täht","vara","vara","ümbris"]},{"word":"aateliselt","syns":["järguti","katkendlikult","primitiivselt"]},{"word":"aatetu","syns":["ebamaine","iseeneslik","loid","otsene","siiras","tahtejõuetu","vaene","vilets","väeti"]},{"word":"aatlemine","syns":["arutlus","deklamatsioon","ideeline","tüli","vestlus"]},{"word":"aatman","syns":["hüvitama","julgestama","kaasnema","korras","kulutama","kurat","läbima","lähetama","lämmatama","paiskama","tasku","täitma","uputama","veetma","viskama"]},{"word":"aatom","syns":["kuupäev","lõhn","mees","saatus","tünn"]},{"word":"ab","syns":["aabits","abiline","algteadmised","ase-","asetäitja","austus","eba-","kuidas","pihik","piht","ääris"]},{"word":"aba","syns":["aabits","abiline","ainult","ajaline","algteadmised","alumine","anti-","ase-","asetäitja","esimene","ikka","järjekord","kvaasi-","käepide","lahtine","mõte","nuhk","pihik","piht","puudulik","pära"]},{"word":"abaasi","syns":["ahne","alaspidi","alus","himur","hoidla","innukas","kohustus","laht","saladus"]},{"word":"abajasopp","syns":["aju","hing","laht"]},{"word":"abakala","syns":["dissonants","graafik","kakofoonia","lahkheli","raba","sobimatus"]},{"word":"abakus","syns":["aas","alam","autu","ava","avameelsus","ebasündsus","hädas","julgus","kahtlus","laht","laius","löök","löök","mitmekülgsus","nõidus","petislik","pulstis","sigadus","tarkus","vanus"]},{"word":"abar","syns":["kidur","lai","ruumikas","väeti"]},{"word":"abhaas","syns":["abikaasa","ahne","alus","himur","hoidla","innukas","kitsas","laht","lõik"]},{"word":"abi","syns":["abiline","ase-","asetäitja"]},{"word":"abiaeg","syns":["kooliaeg","muinsus","ürgaeg"]},{"word":"abiallikas","syns":["hall","põhjus","tuluallikas"]},{"word":"abiandmine","syns":["abi","alistumine","amnestia","andestus","halastus","lang","lunastus","pealmine","reetmine","suudlus"]},{"word":"abiellu","syns":["abielluma","laulatama","laulatus"]},{"word":"abieluk\u0106\u00bctke","syns":["abielu","abieluinimene","agaamia"]}];
    console.log(data);
    index = Math.floor(Math.random() * data.length);
    word = data[index].word;


  //arvatav sõna
  /*data.forEach(function(entry){
    console.log(entry);
    word = entry.word;
    word = word.replace(/\s/g, "-");
  });*/


    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
  //  selectCat();
    canvas();
  };

  play();

  // Hint

    hint.onclick = function() {

  /*    hints = [
        ["Peatreeneriks Andres Sõber", "Peatreener Aivar Kuusmaa", "Heade mõtete linna koduklubi", "Kommivabrik", "Samanimeline spordikool", "Eesti kõige lõunapoolsem kossutiim"],
        ["Oskar Lutsu meistriteos", "Oscarile kandideerinud Eesti film", "Komöödia, kus üks peaosatäitja on Genka", "Peaaegu kandideeris Oscarile", "Gabriel", "Film 90-ndate Eestist"],
        ["Lääne-Virumaal", "Ida-Virumaal", "Viljandimaal", "Saaremaal", "Eesti süda", "Raplamaal", "Lääne-Virumaal", "Lääne-Virumaal", "Tartumaal"]
    ];*/

//    var catagoryIndex = categories.indexOf(chosenCategory);
  //  var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Sünonüümid: - " +  data[index].syns;
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
