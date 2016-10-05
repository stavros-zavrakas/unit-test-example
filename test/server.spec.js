// We'll use this to override require calls in routes
var proxyquire = require('proxyquire');
// This will create stubbed functions for our overrides
var sinon = require('sinon');
// Supertest allows us to make requests against an express object
var supertest = require('supertest');
// Natural language-like assertions
var expect = require('chai').expect;

var express = require('express');

describe('GET /users/:username', function () {
  var app, request, route;

  beforeEach(function () {
    // A stub we can use to control conditionals
    this.getUserStub = sinon.stub();

    // Create an express application object
    app = express();

    // Get our router module, with a stubbed out users dependency
    // we stub this out so we can control the results returned by
    // the users module to ensure we execute all paths in our code
    route = proxyquire('../lib/server/routes.js', {
      './models': {
        users: {
          getByUsername: this.getUserStub
        }
      }
    });

    // Bind a route to our application
    route(app);

    // Get a supertest instance so we can make requests
    request = supertest(app);
  });

  it('should respond with a 404 and false', function (done) {
    this.getUserStub.yields(null, false);

    request
      .get('/users/nodejs')
      .expect('Content-Type', /json/)
      .expect(404, function (err, res) {
        expect(res.body).to.deep.equal({
          users: false
        });
        done();
      });
  });

  it('should respond with a 200 and true', function (done) {
    this.getUserStub.yields(null, true);

    request
      .get('/users/admin')
      .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        expect(res.body).to.deep.equal({
          users: true
        });
        done();
      });
  });
});
