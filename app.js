var SC = require('soundcloud');
SC.initialize({
  client_id: '11ef1f02126a87ce1e2f29238977e930'
});

promise = SC.get('/playlists/217746411', {
});
