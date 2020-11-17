//比较优雅的继承方法
function inherit(Child, Parent){
    //子类继承父类的原型链
    Child.prototype = Object.create(Parent.prototype);
    //修复子类constructor的指向问题
    Child.prototype.constructor = Child
    //设置超类,存储超类
    Child.super = Parent
    //静态属性继承
    if(Object.setPrototypeOf){
        Object.setPrototypeOf(Child,Parent)
    }else if(Child.__proto__){
        Child.__proto__ = Parent
    }else{
        for(var k in Parent){ //minix 继承
            if(Parent.hasOwnProperty(k) && !(k in Child)){
                Child[k] = Parent[k]
            }
        }
    }
}