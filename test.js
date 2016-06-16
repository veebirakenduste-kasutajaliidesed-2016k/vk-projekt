var video = document.getElementById('player1');
var source = document.createElement('source');


window.onload = function(){
  document.getElementById('submitSource').addEventListener('click', getSource);
  document.getElementById('setbrightness').addEventListener('change', setFilter);
  document.getElementById('setcontrast').addEventListener('change', setFilter);
  document.getElementById('setsaturate').addEventListener('change', setFilter);
};

jQuery(document).ready(function() {
	
	createNewVideo('https://www.youtube.com/watch?v=C0DPdy98e4c');

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
	$('#videoDiv').html('');
	createNewVideo(document.getElementById('vid').value);
	
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
	
  //player1.loadVideoById(document.getElementById('vid').value);
  //source.setAttribute('src', document.getElementById('vid').value);
  //player1.appendChild(source);


}

function setFilter(){
	brightness = document.getElementById('setbrightness').value;
	contrast = document.getElementById('setcontrast').value;
	saturation = document.getElementById('setsaturate').value;


	$('.html5-main-video').style.filter = 'brightness(' + brightness + '%) contrast(' + contrast + '%) saturate(' + saturation + '%)';
	$('.html5-main-video').style.WebkitFilter = 'brightness(' + brightness + '%) contrast(' + contrast + '%) saturate(' + saturation + '%)';

}

function createNewVideo(src){
	console.log(src);
	var new_div = '<video width="640" height="360" id="player1" preload="none">'
						+'<source id="source" type="video/youtube" src="'+src+'" />'
						+'<track kind="subtitles" src="subtitles.srt" srclang="en" />'
					+'</video>';
		
	$('#videoDiv').html(new_div);
}