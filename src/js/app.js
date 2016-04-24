var SC = require('soundcloud');
SC.initialize({
  client_id: client_id
});

promise = SC.get('/playlists/217746411', {
});
