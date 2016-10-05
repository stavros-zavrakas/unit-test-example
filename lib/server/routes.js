var express = require('express');

var models = require('./models');

module.exports = function (app) {
  var usersRouter = express.Router();

  var users = models.users;

  usersRouter.get('/:username', function (req, res) {
    users.getByUsername(req.params.username, function (err, found) {
      if (!found) {
        res.status(404);
      }

      res.json({ users: found });
    });
  });

  usersRouter.post('/', function (req, res) {
    if (!req.body) {
      return res.json({ err: true });
    }

    var matches = [];
    req.body.forEach(function (element, index) {
      matches.push(element);
    });

    res.json(matches);
  });

  app.use('/users', usersRouter);
}
