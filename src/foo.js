module.exports.foo = foo;
module.exports.callFunc = callFunc;

function foo() {
    return 13;
}

function callFunc(f){
    f();
}
