SC.initialize({
  client_id: 'af8624e04e20f5c2f2112fa49cada87a'
});

$(document).ready(function() {
  SC.get('/tracks', { genres: 'muse' }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));

      var track_url = 'http://soundcloud.com/forss/flickermood';
      SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
      });

      SC.stream('/tracks/293', function(sound) {
        $('#start').click(function(e) {
          e.preventDefault();
          sound.start();
        });
        $('#stop').click(function(e) {
          e.preventDefault();
          sound.stop();
        });
      });
      });
    });
});
