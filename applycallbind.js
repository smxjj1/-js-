//call 方法的作用
var obj = {
    name: 'lilith',
}

function logName(){
    console.log(this.name)
}

logName.call(obj)
//两个作用 
//1. logName 的this指向了obj
//2. logName 执行了
//改变this指向等价于,然后再删除这个对象里面的函数值
var obj = {
    name: 'lilith',
    logName: function(){
        console.log(this.name)
    }
}
//第一版本的代码
Function.prototype.myCall = function(content){
    content.fn = this;//给调用的对象添加一个键，值为函数自身
    content.fn(); //执行这个函数
    delete content.fn // 删除这个键，还原对象
}
logName.call(obj) //'lilith'
//处理传参的问题
//思路，根据arguments获取不确定传参的个数
var foo = {
    value: 1
};

function logInfo(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

logInfo.myCall(foo, 'kevin', 18);
//第二版本的代码
Function.prototype.myCall = function(content){
    content.fn = this;//给调用的对象添加一个键，值为函数自身
    var argus = [];
    for(var i =1;i<arguments.length;i++){ //通过arguments 获取不确定个数的实参,并生成数组 argus =["arguments[1]", "arguments[2]", "arguments[3]"],i等于1开始,因为call第一个参数是调用的对象 arguments 是个伪数组 
        var item = 'arguments[' + i + ']';
        argus.push(item)
    }
    eval('content.fn('+ argus +')'); //执行这个函数
    delete content.fn // 删除这个键，还原对象
}
//call函数在第一个参数为null或者undefined的时候,this指向window
//第三版本代码
Function.prototype.myCall = function(content){
    var context = context || window; // 兼容null 和 undefined场景
    content.fn = this;//给调用的对象添加一个键，值为函数自身
    var argus = [];
    for(var i =1;i<arguments.length;i++){ //通过arguments 获取不确定个数的实参,并生成数组 argus =["arguments[1]", "arguments[2]", "arguments[3]"],i等于1开始,因为call第一个参数是调用的对象 arguments 是个伪数组 
        var item = 'arguments[' + i + ']';
        argus.push(item)
    }
    eval('content.fn('+ argus +')'); //执行这个函数
    delete content.fn // 删除这个键，还原对象
}
//apply 实现方法和call一致，区别在于apply第二个参数是个数组，不需要通过arguments去获取不确定的参数个数
Function.prototype.myApply = function(content,arr){
    var context = context || window; // 兼容null 和 undefined场景
    content.fn = this;//给调用的对象添加一个键，值为函数自身
    //如果传的是空值
    var result;
    if(!arr){
        result = content.fn()
    }else{
        if(arr instanceof Array){//判断一下非数组情况
            var args = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                args.push('arr[' + i + ']');
            }
            result = eval('context.fn(' + args + ')')
        }else{
            throw Error('CreateListFromArrayLike called on non-object')
        }
        
    }
   
    //执行这个函数
    delete content.fn // 删除这个键，还原对象
    return result
}
//bind方法的实现
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}