'use strict';

var greeting = 'Hello';

var request = require('request');

module.exports = {
  printName: function (person) {
    return person.lastName + ', ' + person.firstName;
  },

  greet: function (person) {
    console.log(greeting + ' ' + person.firstName + ' ' + person.lastName);
  },

  requestWebPage: function (url, callback) {
    if (typeof url === 'function') {
      callback = url;

      url = 'https://en.wikipedia.org/wiki/Main_Page';
    }

    request.get(url, function (error, response, body) {
      return callback(error, response, body)
    });
  },

  stdRequest: function (callback) {
    var url = 'https://en.wikipedia.org/wiki/Main_Page';

    request.get(url, function (error, response, body) {
      return callback(error, response, body)
    });
  }
};
