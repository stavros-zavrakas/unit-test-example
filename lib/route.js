// Before starting with the unit test you have to move the `var models = require('../models');` at the top of the file. You are requiring this on every 
// request and it will have bad impact to the performance. Also, I would suggest to export the middlewares as well and then you will be able to test them
// independently.

var express = require('express');
var models = require('./models');

module.exports = function (inject) {
  var router = express.Router();
  var app = inject.app;

  function editContentCheck(req, res, next) {
    if (req.authInfo.scope.indexOf('readOwnUser') == -1) {
      res.statusCode = 403;
      return res.end('Forbidden');
    }
    return next();
  }

  function getUser(req, res) {

    var authHeader = req.headers.authorization.split(' ');
    var token = authHeader[1];

    models.AccessToken.getAccessToken(token, function (err, tokenObj) {
      models.User.getUser(tokenObj.userId, function (err, user) {
        if (err) {
          return done(err);
        }
        
        if (!user) {
          return done(null, false);
        }
        
        res.send(JSON.stringify(user));
      });
    });

  }

  return router.get('/', app.passport.authenticate('bearer', { session: false }), [editContentCheck, getUser]);
};
