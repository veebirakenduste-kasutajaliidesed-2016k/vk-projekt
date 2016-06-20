  (function(){
  "use strict";

  var ToDo = function(){
    // SEE ON SINGLETON PATTERN
    if(ToDo.instance){
      return ToDo.instance;
    }
    //this viitab ToDo fn
    ToDo.instance = this;

    this.routes = ToDo.routes;
    // this.routes['home-view'].render()

    console.log('ToDo sees');

    // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    // hakkan hoidma kõiki ülesandeid
    this.tasks = [];

    // Kui tahan ToDole referenci siis kasutan THIS = ToDo RAKENDUS ISE
    this.init();
  };

  window.ToDo = ToDo; // Paneme muuutuja külge

  ToDo.routes = {
    'home-view': {
      'render': function(){
      }
    },
    'list-view': {
      'render': function(){
        window.setTimeout(function(){
        $(".loading").css({ display: "none" });
        }, 3000);
      }
    },
    'manage-view': {
      'render': function(){
      }
    },
    'archive-view':{
      'render': function(){
      }
    }
  };

  // Kõik funktsioonid lähevad ToDo külge
  var very_important_number = 0;
  var important_number = 0;
  var not_important_number = 0;
  var in_process_number = 0;
  ToDo.prototype = {
    init: function(){
      //kuulan aadressirea vahetust
      window.addEventListener('hashchange', this.routeChange.bind(this));

      // kui aadressireal ei ole hashi siis lisan juurde
      if(!window.location.hash){
        window.location.hash = 'home-view';
        // routechange siin ei ole vaja sest käsitsi muutmine käivitab routechange event'i ikka
      }else{
        //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
        this.routeChange();
      }
      //saan kätte ülesanded localStorage'ist kui on
      if(localStorage.tasks){
        //võtan stringi ja teen tagasi objektideks
        this.tasks = JSON.parse(localStorage.tasks);
        console.log('laadisin localStorageist massiiivi ' + this.tasks.length);

        //tekitan loendi htmli
        this.tasks.forEach(function(item){
          var new_item = new Item(item.id, item.importance, item.title, item.task, item.due_date);
          console.log(item.importance);
          var li = new_item.createHtmlElement();
          var imp = item.importance;
          if(imp == "very_important"){
            $('.list-of-very-important-tasks').append(li);
            very_important_number++;
          }else if(imp == "important"){
            $('.list-of-important-tasks').append(li);
            important_number++;
          }else if(imp == "not_important"){
            $('.list-of-not-important-tasks').append(li);
            not_important_number++;
          }else if(imp == "in_process"){
            $('.list-of-in-process-tasks').append(li);
            in_process_number++;
          }else if(imp == "archive"){
            $('.list-of-archived-tasks').append(li);
          }else{
            console.log("midagi oleks pidanud juhtuma");
          }
          $(".very-important-number").html("["+very_important_number+"]");
          $(".important-number").html("["+important_number+"]");
          $(".not-important-number").html("["+not_important_number+"]");
          $(".in-process-number").html("["+in_process_number+"]");
        });
      }else {
        //küsin AJAXiga
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            ToDo.instance.tasks=JSON.parse(xhttp.responseText);
            console.log(ToDo.instance.tasks);

            //teen ülesanded htmli
            ToDo.instance.tasks.forEach(function(item){
              var new_item = new Item(item.id, item.importance, item.title, item.task, item.due_date);
              var li = new_item.createHtmlElement();
              console.log(item.importance);
              var imp = item.importance;
              if(imp == "very_important"){
                $('.list-of-very-important-tasks').append(li);
                very_important_number++;
              }else if(imp == "important"){
                $('.list-of-important-tasks').append(li);
                important_number++;
              }else if(imp == "not_important"){
                $('.list-of-not-important-tasks').append(li);
                not_important_number++;
              }else if(imp == "in_process"){
                $('.list-of-in-process-tasks').append(li);
                in_process_number++;
              }else if(imp == "archive"){
                $('.list-of-archived-tasks').append(li);
              }else{
                console.log("midagi oleks pidanud juhtuma");
              }
              $(".very-important-number").html("["+very_important_number+"]");
              $(".important-number").html("["+important_number+"]");
              $(".not-important-number").html("["+not_important_number+"]");
              $(".in-process-number").html("["+in_process_number+"]");
            });
            //salvestan localStoragisse
            localStorage.setItem('tasks', JSON.stringify(ToDo.instance.tasks));
          }
        };
        xhttp.open("GET", "save.php", true);
        xhttp.send();
      }
      // esimene loogika oleks see, et kuulame hiireklikki nupul
      this.bindEvents();
    },

    bindEvents: function(){
      $('.add-new-item').on('click', this.addNewClick.bind(this));
      $('.change-item').on('click', this.ChangeClick.bind(this));
      $('.cancel-change-item').on('click', this.CancelChangeClick.bind(this));
      $('.load-notes').on('click', this.LoadNotesClick.bind(this));
      $('.add-new-note').on('click', this.AddNoteClick.bind(this));
      $('.hide-notes').on('click', this.HideNotesClick.bind(this));
      $('.show-notes').on('click', this.ShowNotesClick.bind(this));
      $('#search').on('keyup', this.search.bind(this));
      $('.very-important-title').on('click', this.VeryImportantClick.bind(this));
      $('.important-title').on('click', this.ImportantClick.bind(this));
      $('.not-important-title').on('click', this.NotImportantClick.bind(this));
      $('.in-process-title').on('click', this.InProcessClick.bind(this));
    },
    processItem: function(){
      var tasks = JSON.parse(localStorage.tasks);
      var id, title, task, due_date, importance;
      for(var t=0; t < tasks.length; t++){
        if(tasks[t].id== event.target.dataset.id){
          id = tasks[t].id;
          title = tasks[t].title;
          task = tasks[t].task;
          due_date = tasks[t].due_date;
          importance = "in_process";
          break;
        }
      }
      for(var i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].id == id){
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+id, true);
      xhttp.send();
      location.reload();

      var new_item = new Item(id, importance, title, task, due_date);

      this.tasks.unshift(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp2 = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp2.onreadystatechange = function() {
        console.log(xhttp2.readyState);
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
          console.log(xhttp2.responseText);
        }
      };
      //teeb päringu
      console.log("Importance:" + importance);
      xhttp2.open("GET", "save.php?id="+id+"&importance="+importance+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp2.send();

    },
    archiveItem: function(){
      var c = confirm("Oled kindel, et tahad ülesannet arhiveerida?");
      // vajutas no, pani ristist kinni
      if(!c){	return; }
      var tasks = JSON.parse(localStorage.tasks);
      var id, title, task, due_date, importance;
      for(var t=0; t < tasks.length; t++){
        if(tasks[t].id== event.target.dataset.id){
          id = tasks[t].id;
          title = tasks[t].title;
          task = tasks[t].task;
          due_date = tasks[t].due_date;
          importance = "archive";
          break;
        }
      }
      for(var i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].id == id){
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+id, true);
      xhttp.send();
      location.reload();

      var new_item = new Item(id, importance, title, task, due_date);

      this.tasks.unshift(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp2 = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp2.onreadystatechange = function() {
        console.log(xhttp2.readyState);
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
          console.log(xhttp2.responseText);
        }
      };
      //teeb päringu
      console.log("Importance:" + importance);
      xhttp2.open("GET", "save.php?id="+id+"&importance="+importance+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp2.send();
    },
    deleteItem: function(event){
      var c = confirm("Oled kindel, et tahad ülesannet kustutada?");
      // vajutas no, pani ristist kinni
      if(!c){	return; }

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //KUSTUTAN OBJEKTI ja uuenda localStoragit
      var delete_id = event.target.dataset.id;

      for(var i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].id == delete_id){
          if(this.tasks[i].importance == "very_important"){
            very_important_number--;
            $(".very-important-number").html("["+very_important_number+"]");
          }else if(this.tasks[i].importance == "important"){
            important_number--;
            $(".important-number").html("["+important_number+"]");
          }else if(this.tasks[i].importance == "not_important"){
            not_important_number--;
            $(".not-important-number").html("["+not_important_number+"]");
          }else{
            console.log("Ei muutnud ülesannet arvu");
          }
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };

      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+delete_id, true);
      xhttp.send();
    },
    changeItem: function(event){
      //MUUDAN
      console.log(JSON.parse(localStorage.tasks));

      var tasks = JSON.parse(localStorage.tasks);
      for(var t=0; t < tasks.length; t++){
        if(tasks[t].id== event.target.dataset.id){
          $('.id_holder').html(tasks[t].id);
          $('.change_title').val(tasks[t].title);
          $('.change_task').val(tasks[t].task);
          $('.change_due_date').val(tasks[t].due_date);
          $('.change_importance').val(tasks[t].importance);
          break;
        }
      }
      $(".change").css({ display: "block" });
    },
    search: function(event){
      //otsikasti väärtus
      var needle = $('#search').val().toLowerCase();
      console.log(needle);

      var list = $('ul.united-ul li');
      console.log(list);

      for(var i = 0; i < list.length; i++){
        var li = list[i];
        // ühe listitemi sisu tekst
        var stack = li.querySelector('.content').innerHTML.toLowerCase();
        //kas otsisõna on sisus olemas
        if(stack.indexOf(needle) !== -1){
          //olemas
          li.style.display = 'list-item';
        }else{
          //ei ole, index on -1, peidan
          li.style.display = 'none';
        }
      }
    },
    InProcessClick: function(){
      $('.list-of-in-process-tasks').toggle('1000');
      $('div.in-process-arrow').toggleClass('rotate-reset');
    },
    VeryImportantClick: function(){
      $('.list-of-very-important-tasks').toggle('1000');
      $('div.very-important-arrow').toggleClass('rotate-reset');
    },
    ImportantClick: function(){
      $('.list-of-important-tasks').toggle('1000');
      $('div.important-arrow').toggleClass('rotate-reset');
    },
    NotImportantClick: function(){
      $('.list-of-not-important-tasks').toggle('1000');
      $('div.not-important-arrow').toggleClass('rotate-reset');
    },
    LoadNotesClick: function(){
      $.PostItAll.load();
    },

    AddNoteClick: function(){
      $.PostItAll.new({
        features: {
            savable : true
        }
      });
    },
    HideNotesClick: function(){
      $.PostItAll.hide();
      $(".show-notes").css({ display: "block" });
      $(".hide-notes").css({ display: "none" });
    },
    ShowNotesClick: function(){
      $.PostItAll.show();
      $(".show-notes").css({ display: "none" });
      $(".hide-notes").css({ display: "block" });
    },
    CancelChangeClick: function(){
      $('.change').hide();
    },
    ChangeClick: function(event){
      console.log("ChangeClick");
      var id = $('.id_holder').text();
      var title = $('.change_title').val();
      var task = $('.change_task').val();
      var due_date = $('.change_due_date').val();
      var importance = $('.change_importance').val();
      var delete_id = $('.id_holder').text();

      for(var i = 0; i < this.tasks.length; i++){

        if(this.tasks[i].id == delete_id){
          //kustuta kohal i objekt ära
          this.tasks.splice(i, 1);
          break;
        }
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // KUSTUTAN HTMLI
      var ul = event.target.parentNode.parentNode;
      var li = event.target.parentNode;

      ul.removeChild(li);

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      xhttp.open("GET", "delete.php?delete_id="+delete_id, true);
      xhttp.send();
      location.reload();

      var new_item = new Item(id, importance, title, task, due_date);

      this.tasks.unshift(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp2 = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp2.onreadystatechange = function() {
        console.log(xhttp2.readyState);
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
          console.log(xhttp2.responseText);
        }
      };
      //teeb päringu
      console.log("Importance:" + importance);
      xhttp2.open("GET", "save.php?id="+id+"&importance="+importance+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp2.send();

      // 2) lisan selle htmli listi juurde
      li = new_item.createHtmlElement();
      if(importance == "very_important"){
        $('.list-of-very-important-tasks').append(li);
      }else if(importance == "important"){
        $('.list-of-important-tasks').append(li);
      }else if(importance == "not_important"){
        $('.list-of-not-important-tasks').append(li);
      }else if(importance == "in_process"){
        $('.list-of-in-process-tasks').append(li);
      }
      else{
        console.log("midagi oleks pidanud juhtuma");
      }
      $('.change').hide();
    },

    addNewClick: function(event){
      //salvestame ülesande
      var importance = $('.importance').val();
      console.log("Importance:" + importance);
      var title = $('.title').val();
      var task = $('.task').val();
      var due_date = $('.due_date').val();

      //1) tekitan uue Item'i
      var id = guid();
      var new_item = new Item(id, importance, title, task, due_date);

      //lisan massiiivi ülesande
      this.tasks.push(new_item);
      console.log(JSON.stringify(this.tasks));
      // JSON'i stringina salvestan localStorage'isse
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      //AJAX
      var xhttp = new XMLHttpRequest();
      //mis juhtub kui päring lõppeb
      xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      //teeb päringu
      console.log("Importance: "+importance);
      xhttp.open("GET", "save.php?id="+id+"&importance="+importance+"&title="+title+"&task="+task+"&due_date="+due_date, true);
      xhttp.send();

      // 2) lisan selle htmli listi juurde
      var li = new_item.createHtmlElement();
      if(importance == "very_important"){
        $('.list-of-very-important-tasks').append(li);
        very_important_number++;
      }else if(importance == "important"){
        $('.list-of-important-tasks').append(li);
        important_number++;
      }else if(importance == "not_important"){
        $('.list-of-not-important-tasks').append(li);
        not_important_number++;
      }else if(importance == "in_process"){
        $('.list-of-in-process-tasks').append(li);
        in_process_number++;
      }else{
        console.log("midagi oleks pidanud juhtuma");
      }

      $('.title').val("");
      $('.task').val("");
      $('.due_date').val("");

      $('.adding-message').css({ display: "block" });
      $('.adding-message').text("Ülesanne nimega '"+ title +"' lisatud!");

      window.setTimeout(function(){
      $(".adding-message").css({ display: "none" });
      }, 5000);
      $(".very-important-number").html("["+very_important_number+"]");
      $(".important-number").html("["+important_number+"]");
      $(".not-important-number").html("["+not_important_number+"]");
      $(".in-process-number").html("["+in_process_number+"]");
    },

    routeChange: function(event){
      //kirjutan muuutujasse lehe nime, võtan maha #
      this.currentRoute = location.hash.slice(1);
      console.log(this.currentRoute);

      //kas meil on selline leht olemas?
      if(this.routes[this.currentRoute]){

        //muudan menüü lingi aktiivseks
        this.updateMenu();

        this.routes[this.currentRoute].render();

      }else{
        /// 404 - ei olnud
      }
    },

    updateMenu: function() {
      //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
      //1) võtan maha aktiivse menüülingi kui on
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');
      //2) lisan uuele juurde
      //console.log(location.hash);
      document.querySelector('.'+this.currentRoute).className += ' active-menu';
    }
  }; //ToDo LÕPP


  var Item = function(new_id, new_importance, new_title, new_task, new_due_date){
    this.id = new_id;
    this.importance = new_importance;
    this.title = new_title;
    this.task = new_task;
    this.due_date = new_due_date;
  };

  Item.prototype = {
    createHtmlElement: function(){

      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.task + ' | ' + this.due_date);
      span_with_content.appendChild(content);

      li.appendChild(span_with_content);
      if(this.importance !== "archive"){
        //CHANGE nupp
        var span_change = document.createElement('span');
        span_change.style.color = "green";
        span_change.style.cursor = "pointer";

        //muutmiseks id kaasa
        span_change.setAttribute("data-id", this.id);
        span_change.innerHTML = "  Muuda";
        li.appendChild(span_change);
        //keegi vajutas nuppu
        span_change.addEventListener("click", ToDo.instance.changeItem.bind(ToDo.instance));
      }
      if(this.importance == "very_important" || this.importance == "important" || this.importance == "not_important"){
        var span_process = document.createElement('span');
        span_process.style.color = "grey";
        span_process.style.cursor = "pointer";

        //kustutamiseks panen id kaasa
        span_process.setAttribute("data-id", this.id);

        span_process.innerHTML = "  Lisa tegemisse";

        li.appendChild(span_process);

        //keegi vajutas nuppu
        span_process.addEventListener("click", ToDo.instance.processItem.bind(ToDo.instance));
      }
      if(this.importance == "in_process"){
        var span_archive = document.createElement('span');
        span_archive.style.color = "blue";
        span_archive.style.cursor = "pointer";

        //arhiveerimiseks panen id kaasa
        span_archive.setAttribute("data-id", this.id);

        span_archive.innerHTML = "  Arhiveeri";

        li.appendChild(span_archive);

        //keegi vajutas nuppu
        span_archive.addEventListener("click", ToDo.instance.archiveItem.bind(ToDo.instance));
      }else{
        //DELETE nupp
        var span_delete = document.createElement('span');
        span_delete.style.color = "red";
        span_delete.style.cursor = "pointer";

        //kustutamiseks panen id kaasa
        span_delete.setAttribute("data-id", this.id);

        span_delete.innerHTML = "  Kustuta";

        li.appendChild(span_delete);

        //keegi vajutas nuppu
        span_delete.addEventListener("click", ToDo.instance.deleteItem.bind(ToDo.instance));
      }
      return li;
    }
  };

  //HELPER
  function guid(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
  // kui leht laetud käivitan ToDo rakenduse
  window.onload = function(){
    var app = new ToDo();
  };
})();
