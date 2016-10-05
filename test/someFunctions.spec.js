'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');

var funcs = rewire('../lib/someFunctions');

describe('testing the rewire with stubs', function () {
  
  it('should call the someFunction2', () => {
    var someFunction2Stub = sinon.stub();
    funcs.__set__({
      someFunction2: someFunction2Stub,
    });

    someFunction2Stub.returns(null);

    funcs.someFunction1();

    expect(someFunction2Stub.calledOnce).to.equal(true);
  });
  
});
