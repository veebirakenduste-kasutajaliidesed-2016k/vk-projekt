var video = document.getElementById('player1');
var source = document.createElement('source');


window.onload = function(){
  document.getElementById('submitSource').addEventListener('click', getSource);
  document.getElementById('setbrightness').addEventListener('change', setFilter);
  document.getElementById('setcontrast').addEventListener('change', setFilter);
  document.getElementById('setsaturate').addEventListener('change', setFilter);
};

jQuery(document).ready(function() {

    // declare object for video
    var player = new MediaElementPlayer('#player1');
    $('audio,video').mediaelementplayer({
       // automatically create these translations on load
       translations:['es','ar','yi','zh-cn'],
       // allow the user to add additional translations
       translationSelector: true,
       // start with English automatically turned on
       startLanguage: 'en'
   });
});

function getSource(){

  $('#source').attr( 'src', document.getElementById('vid').value );
  //source.setAttribute('src', document.getElementById('vid').value);
  //player1.appendChild(source);


}

function setFilter(){
	brightness = document.getElementById('setbrightness').value;
	contrast = document.getElementById('setcontrast').value;
	saturation = document.getElementById('setsaturate').value;


	player1.style.filter = 'brightness(' + brightness + '%) contrast(' + contrast + '%) saturate(' + saturation + '%)';
	player1.style.WebkitFilter = 'brightness(' + brightness + '%) contrast(' + contrast + '%) saturate(' + saturation + '%)';

}
