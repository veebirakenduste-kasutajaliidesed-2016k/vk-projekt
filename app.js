var SC = require('soundcloud');
console.log(SC);
SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
});
SC.get('/user/183/tracks').then(function(tracks){
  console.log('Latest track: ' + tracks[0].title);
});
