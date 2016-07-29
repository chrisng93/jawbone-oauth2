# jawbone-oauth2

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

> Authentication for the Jawbone API using OAuth 2.0

## Installation

```sh
npm install jawbone-oauth2
```

## Usage

```javascript
var JawboneClient = require('jawbone-oauth2');

var jawboneAuth = new JawboneClient('clientID', 'clientSecret', 'options');
```

* clientID: ID given to you when you register your app on Jawbone
* clientSecret: secret given to you when you register your app on Jawbone
* options: specify a certain redirect_uri or scope

### Sending authentication requests to Jawbone

```javascript
app.get('/auth/jawbone', function(req, res) {
  var redirectUri = 'http://someredirecturi/auth/jawbone/callback';
  // Define data that you want to get back in the scope of your request to Jawbone
  var scope = 'basic_read extended_read move_read sleep_read weight_read heartrate_read';
  var authorizationUri = jawboneAuth.getAuthorizationUrl(redirectUri, scope);
  res.redirect(authorizationUri);
});
```

### Handling the callback from authentication request

```javascript
app.get('/auth/jawbone/callback', function(req, res, done) {
  var code = req.query.code;
  jawboneAuth.getToken(code, redirectUri)
    .then(function(token) {
      // do something
    })
    .catch(function(err) {
      // handle error
    });
});
```

Special thanks to [thegameofcode](https://github.com/thegameofcode) for their [fitbit-client-oauth2](https://github.com/thegameofcode/fitbit-client-oauth2) as inspiration.
