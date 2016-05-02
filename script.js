(function(){
  "use strict";

  var TeadmisteTest = function(){
    if(TeadmisteTest.instance){
      return TeadmisteTest.instance;
    }
    TeadmisteTest.instance = this;
    //siia ülejäänud muutujad
    this.init();
  };

  window.TeadmisteTest = TeadmisteTest;

  TeadmisteTest.prototype = {

    init: function(){

    },
    //siia ülejäänud meetodid
  };

  window.onload = function(){
    var app = new TeadmisteTest();
  };

})();
