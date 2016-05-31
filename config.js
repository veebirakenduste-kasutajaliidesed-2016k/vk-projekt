const config = {
  oauth_token: undefined,
  baseURL: 'https://api.soundcloud.com',
  connectURL: '//connect.soundcloud.com',
  client_id: 'af8624e04e20f5c2f2112fa49cada87a',
  redirect_uri: 'http://sc-callback.azurewebsites.net/callback.html'
};

module.exports = {
  get(key) {
    return config[key];
  },

  set(key, value) {
    if (value) {
      config[key] = value;
    }
  }
};
