var video = document.getElementById('player1');
var source = document.createElement('source');


window.onload = function(){
  document.getElementById('submitSource').addEventListener('click', getSource);

};

jQuery(document).ready(function() {

    // declare object for video
    var player = new MediaElementPlayer('#player1');

});

function getSource(){

  $('#source').attr( 'src', document.getElementById('vid').value );
  //source.setAttribute('src', document.getElementById('vid').value);
  //player1.appendChild(source);


}
