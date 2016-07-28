var expect = require('chai').expect;
var JawboneClient = require('../src/client');
var config = require('../src/config');

describe('JawboneClient Authentication', function() {

  var client;

  beforeEach(function() {
    client = new JawboneClient('clientID', 'clientSecret');
  });

  describe('Defaults', function() {

    it('has default oauth2 properties', function() {
      var clientOAuth2 = client.oauth2;
      var defaultKeys = ['authCode', 'password', 'client', 'accessToken', 'api'];

      expect(clientOAuth2).have.keys(defaultKeys);
    });

    it('has default oauth2 token properties', function() {
      var clientOAuth2Token = client.oauth2_token;
      var defaultKeys = ['authCode', 'password', 'client', 'accessToken', 'api'];

      expect(clientOAuth2Token).have.keys(defaultKeys);
    });

    it('has default scope', function() {
      var clientScope = client.scope;
      var defaultScope = config.JAWBONE_DEFAULT_SCOPE;

      expect(clientScope).to.equal(defaultScope);
    });

  });

  describe('Options', function() {

    it('allows for changing of redirect uri', function() {
      var newRedirectURI = 'http://testredirecturi';
      var clientRedirectURI = client.getAuthorizationUrl(newRedirectURI);
      var newAuthorizationUrl = 'https://jawbone.com/auth/oauth2/auth?redirect_uri=http%3A%2F%2Ftestredirecturi&scope=basic_read&response_type=code&client_id=clientID'

      expect(clientRedirectURI).to.equal(newAuthorizationUrl);
    });

    it('allows for changing of scope', function() {
      var newScope = 'basic_read extended_read move_read sleep_read weight_read heartrate_read';
      var newRedirectURI = 'http://testredirecturi';
      var clientRedirectURI = client.getAuthorizationUrl(newRedirectURI, newScope);
      var newAuthorizationUrl = 'https://jawbone.com/auth/oauth2/auth?redirect_uri=http%3A%2F%2Ftestredirecturi&scope=basic_read%20extended_read%20move_read%20sleep_read%20weight_read%20heartrate_read&response_type=code&client_id=clientID'

      expect(clientRedirectURI).to.equal(newAuthorizationUrl);
    });

  });

});
