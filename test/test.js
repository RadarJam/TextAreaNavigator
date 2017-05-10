var expect = require('expect');
var mod = require('../src/foo');

var sinon = require('sinon');

describe('TestFoo', function() {

    describe('#foo()', function() {
	it('should return 13', function() {
	    actual = mod.foo();
	    expected = 13;
	    expect(actual).toBe(expected);
	});
    });

    describe('#callFunc()', function() {
	it('spy should be called', function() {
	    var callback = sinon.spy();

	    mod.callFunc(callback);

	    expect(callback.called).toBe(true);
	});
    });
    
});

