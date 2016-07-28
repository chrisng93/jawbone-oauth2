var oauth2 = require('simple-oauth2');
var config = require('./config');
var auth = require('./auth');

var JawboneClient = function(clientId, clientSecret, options) {

  options = options || {};

  if (!clientId) {
    throw new Error('Missing clientId parameter');
  }

  if (!clientSecret) {
    throw new Error('Missing clientSecret parameter');
  }

  this.oauth2 = oauth2({
    clientID: clientId,
    clientSecret: clientSecret,
    site: config.JAWBONE_BASE_API_URL,
    authorizationPath: config.JAWBONE_AUTH_PATH,
    tokenPath: config.JAWBONE_TOKEN_PATH,
    useBasicAuthorizationHeader: true,
    Authorization: 'Bearer',
  });

  this.oauth2_token = oauth2({
    clientID: clientId,
    clientSecret: clientSecret,
    site: config.JAWBONE_BASE_API_URL_TOKEN,
    authorizationPath: config.JAWBONE_AUTH_PATH,
    tokenPath: config.JAWBONE_TOKEN_PATH,
    useBasicAuthorizationHeader: true,
    Authorization: 'Bearer',
  });

  this.redirect_uri = options.redirect_uri;
  this.scope = options.scope || config.JAWBONE_DEFAULT_SCOPE;

};

auth(JawboneClient.prototype);

module.exports = JawboneClient;
