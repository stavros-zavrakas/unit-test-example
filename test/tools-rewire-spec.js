'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var rewire = require('rewire');
var sinon = require('sinon');

var tools = rewire('../lib/tools');

describe('Tools', function () {

  describe('printName()', function () {
    it('should print the last name first - simplest test', function () {
      var results = tools.printName({
        firstName: 'Stavros',
        lastName: 'Zavrakas'
      });

      expect(results).to.equal('Zavrakas, Stavros');
    });
  });

  describe('greet()', function () {
    beforeEach(function () {
      this.person = {
        firstName: 'Stavros',
        lastName: 'Zavrakas'
      };

      this.console = {
        log: sinon.spy()
      };

      tools.__set__('greeting', 'Hi');
      tools.__set__('console', this.console);
    });

    it('should call console.log - rewire and spy console.log (sync)', function () {
      tools.greet(this.person);

      expect(this.console.log.callCount).to.equal(1);
    });
  });

  describe('requestWebPage()', function () {
    before(function () {

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

      tools.requestWebPage(this.endpoint + this.urlStub, function (error, response, body) {
        expect(body).to.be.ok;
        done();
      });

    });

    it('should request a web page with default endpoint - mock http request (async)', function (done) {

      tools.requestWebPage(function (error, response, body) {
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

      tools.__set__('request', this.request);
    });

    it('should request a standard web page - mock http request (async)', function () {

      this.callback = sinon.spy();

      this.request.get.yields(this.error);

      tools.stdRequest(this.callback);

      expect(this.callback.calledWith(this.error)).to.equal(true);
    });
  });

});
