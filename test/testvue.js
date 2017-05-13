var expect = require('expect');

var sinon = require('sinon');

var mod = require('../src/area');

var MockBrowser = require('mock-browser').mocks.MockBrowser;

var x = {a:2,b:2, c:function(){return 1;}}

describe('TextArea', function() {

    describe('Initialation of TextArea', function() {
	    it(' should use a property named "value" ', function() {
            a = mod.Area.prop[0];
            e = 'value'
            
            expect(a).toBe(e);
	    });
        
        it(' should contain data which is a function', function() {
            a = mod.Area.data;
            e = 'function'
            
            expect(typeof(a)).toBe(e);
	    });

        it(' The initial value of selected should be 0',function(){
            data = mod.Area.data;
            returned = data();
            
            eSelected = 0
            expect(returned.selected).toBe(eSelected);
        });
        
    });

    describe('updateInfo', function(){
        it(' should be a function', function() {
            a = mod.Area.methods.updateInfo;
            e = 'function'
            
            expect(typeof(a)).toBe(e);
	    });

    });

    describe('testSelectText', function(){
        
        var mock, doc, inputField, window, start, end, interval;
        
        function setUp(){
            start, end = 0;
            
            interval = new Object();
            interval.start = start
            interval.end = end
            
            
            mock = new MockBrowser();
            doc = mock.getDocument();
            inputField = doc.createElement('input');
            
            window = mock.getWindow();
            
            inputField.focus();
        }

        function assertMarkedIs(str){
            actual = inputField.value.substring(inputField.selectionStart, inputField.selectionEnd)
            expect(actual).toBe(str)
        }

        
        it('should be possible to mark one', function() {
            setUp();

            var text = "foo {{bar}} baz";
            var expected = "{{bar}}"

            inputField.value = text;

            mod.markNext(inputField, interval);
            
            assertMarkedIs(expected);
            
            expect(interval.start).toBe(4)
            expect(interval.end).toBe(11)
            
	    });

        it('should be possible to traverse the input', function() {
            setUp();

            var text = "foo {{bar}} {{baz}}";
            var expected = "{{baz}}"

            inputField.value = text;
            
            mod.markNext(inputField, interval);
            mod.markNext(inputField, interval);
            
            assertMarkedIs(expected);
            
            expect(interval.start).toBe(12)
            expect(interval.end).toBe(19)
            
	    });

        it('should be possible to skip fields', function() {
            setUp();

            var text = "foo {{bar}} skipped {{baz}}";
            var expected = "{{baz}}"

            inputField.value = text;
            
            mod.markNext(inputField, interval);
            mod.markNext(inputField, interval);
            
            assertMarkedIs(expected);
            
            expect(interval.start).toBe(20)
            expect(interval.end).toBe(27)
            
	    });

        it('should be possible to traverse backwards', function() {
            setUp();

            var text = "1 {{2}} 3";
            var expected = "{{2}}"

            interval.start = text.length-1
            interval.end = text.length-1
            
            inputField.value = text;
            
            mod.markPrevious(inputField, interval);

            assertMarkedIs(expected);
            
            expect(interval.start).toBe(2)
            expect(interval.end).toBe(7)

            
	    });

        it('should be possible to go to the previous bracket pair', function() {
            setUp();

            var text = "{{2}} {{3}}";
            var expected = "{{2}}"

            interval.start = 6
            interval.end = 10
            
            inputField.value = text;
            
            mod.markPrevious(inputField, interval);

            assertMarkedIs(expected);
            expect(interval.start).toBe(0)
            expect(interval.end).toBe(5)

            
	    });

        it(' a forward and backward should endup at the same position', function() {
            setUp();

            var text = "{{2}} {{3}}";
            var expected = "{{3}}"

            interval.start = text.length-1
            interval.end = text.length-1
            
            inputField.value = text;
            
            mod.markPrevious(inputField, interval);
            mod.markPrevious(inputField, interval);

            mod.markNext(inputField, interval);


            assertMarkedIs(expected);
            expect(interval.start).toBe(6)
            expect(interval.end).toBe(11)

            
	    });        
        
    });
    
});
