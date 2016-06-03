var ChatEngine=function(){
     var name=" ";
     var msg="";
     var chatZone=document.getElementById("chatZone");
     var oldata ="";
     var sevr=" ";
     var xhr=" ";

     var gotInternet = navigator.online; //tee sellele appcache juurde

     this.init=function(){
          if(EventSource){
          this.setName();
          this.initSevr();

          } else{
          alert("Use latest Chrome or FireFox");
        }
     };
     //Kasutajanime loomiseks
     this.setName=function(){

          name = prompt("Enter your name:","Anonymous");
          if (!name || name ==="") {
             name = "Anonymous";

          }
          name = name.replace(/(<([^>]+)>)/ig,"");
     };
     //Sonumite saatmiseks

     this.sendMsg=function(){
          msg=document.getElementById("msg").value;
          chatZone.innerHTML+='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
          oldata='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
          this.ajaxSent();

          return false;
     };
     //Sonumite saatmiseks serverisse
     this.ajaxSent=function(){
          try{
               xhr=new XMLHttpRequest();
          }
          catch(err){
               alert(err);
          }
          xhr.open('GET','chatprocess.php?msg='+msg+'&name='+name,false);
          xhr.onreadystatechange = function(){
               if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                         msg.value="";
                    }

               }

          };
          xhr.send();
     };
     this.initSevr=function(){
          sevr = new EventSource('chatprocess.php');
          sevr.onmessage = function(e){

          if(oldata!=e.data){
               chatZone.innerHTML+=e.data;
               oldata = e.data;
          }

          };

     };
};
//Teeb objekte ChatEngine jaoks
var chat= new ChatEngine();

chat.init();
