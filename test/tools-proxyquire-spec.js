'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('Tools', function () {

  describe('printName()', function () {

    before(function () {
      this.tools = require('../lib/tools');
    });

    it('should print the last name first - simplest test', function () {
      var results = this.tools.printName({
        firstName: 'Stavros',
        lastName: 'Zavrakas'
      });

      expect(results).to.equal('Zavrakas, Stavros');
    });
  });

  describe.only('greet()', function () {

    beforeEach(function () {
      this.person = {
        firstName: 'Stavros',
        lastName: 'Zavrakas'
      };

      sinon.spy(console, 'log');

      this.tools = require('../lib/tools');
    });

    afterEach(function () {
      console.log.restore();
    });

    it('should call console.log - proxyquire and spy console.log (sync)', function () {
      this.tools.greet(this.person);

      expect(console.log.callCount).to.equal(1);
    });
  });

  describe('requestWebPage()', function () {
    before(function () {

      this.tools = require('../lib/tools');

      this.defaultEndpoint = 'https://en.wikipedia.org';
      this.defaultUrlStub = '/wiki/Main_Page';

      this.endpoint = 'https://www.google.co.uk';
      this.urlStub = '/';

      nock(this.defaultEndpoint)
        .get(this.defaultUrlStub)
        .reply(200, '<b>MockHTML</b>');

      nock(this.endpoint)
        .get(this.urlStub)
        .reply(200, '<b>MockHTML</b>');

    });

    it('should request a web page with custom endpoint - mock http request (async)', function (done) {

      this.tools.requestWebPage(this.endpoint + this.urlStub, function (error, response, body) {
        expect(body).to.be.ok;
        done();
      });

    });

    it('should request a web page with default endpoint - mock http request (async)', function (done) {

      this.tools.requestWebPage(function (error, response, body) {
        expect(body).to.be.ok;
        done();
      });

    });

  });

  describe('stdRequest()', function () {
    before(function () {
      this.error = {
        error: true
      };

      this.request = {
        get: sinon.stub()
      };

      this.tools = proxyquire('../lib/tools', {
        'request': this.request
      });
    });

    it('should request a standard web page - mock http request (async)', function () {

      this.callback = sinon.spy();

      this.request.get.yields(this.error);

      this.tools.stdRequest(this.callback);

      expect(this.callback.calledWith(this.error)).to.equal(true);
    });
  });

});
