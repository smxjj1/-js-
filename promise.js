//手动实现Promise步骤
    //promise函数是一个构造函数，具有resolve， reject方法
    function Promise(executor){

    }
    //Promise对象实例，具有一个then方法，分别有两个参数 onfulfilled 和 onrejectd， onfulfilled获取Promise对象经过resolve处理后的值， onreject可以获取Promised对象经过reject处理后的值
    //如果写成 /那么我们每次new 一个 Promise 对象的时候，都会分配一个内存给这个对象下then这个方法，这显然是对内存的浪费
      function Promise(executor){
          this.then = function(onfulfilled, onrejected){

        }
    }
    //因为每个Promise实例的then方法逻辑都一致，调用该方法是，通过原型链调用，不需要每次都实例化新建一个then方法
    Promise.prototype.then = function(onfulfilled, onrejected){

    }
    //第二阶段
    //三个参数表示reject参数，resolve参数，以及当前promisede的状态,分别为 reason value status（三个值 pending fulfill reject）
    function Promise(executor){
        const self = this
        this.status = 'pediing'
        this.value = null
        this.reason = null
        function resolve(value){
            self.value = value
        }
        function reject(reason){
            self.reason = reason
        }
        executor(resolve,reject)
    }
    //为了使代码健壮，给onfulfilled, onrejected 设置默认值
    Promise.prototype.then = function(onfulfilled = Funcion.prototype, onrejected = Funcion.prototype){
        onfulfilled(this.value)
        onrejected(this.reason)
    }
  //第三阶段 
  //promise函数状态是不可逆的，即status只能从pedding 到 fulfill，或者pedding 到reject，不可逆的,所以得加判断区分
   function Promise(executor){
        const self = this
        this.status = 'pediing'
        this.value = null
        this.reason = null
        function resolve(value){
            if(self.status==='pedding'){
                self.value = value,
                self.status = 'fulfilled'
            }
        }
        function reject(reason){
            if(self.status==='pedding'){
                self.reason = reason
                 self.status = 'rejected'
            }
            
        }
        executor(resolve,reject)
    }
    //为了使代码健壮，给onfulfilled, onrejected 设置默认值
    Promise.prototype.then = function(onfulfilled = Funcion.prototype, onrejected = Funcion.prototype){
        onfulfilled(this.value)
        onrejected(this.reason)
    }
    //第四阶段 我们的then方法是同步实行的，并没有异步执行，这是需要将状态在peding的时候将onfulfilled方法存储起来
        function Promise(executor) {
            debugger
            const self = this
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.onFulfilledFunc = Function.prototype
            this.onRejectedFunc = Function.prototype

            function resolve(value) {
                if (self.status === 'pending') {
                    self.value = value,
                        self.status = 'fulfilled'
                    self.onFulfilledFunc(self.value)
                }
            }

            function reject(reason) {
                if (self.status === 'pending') {
                    self.reason = reason
                    self.status = 'rejected'
                    self.onRejectedFunc(self.reason)
                }

            }
            executor(resolve, reject)
        }
        //上面在padiing状态的时候，执行了then里面的值，
        Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            if (this.status === 'fulfilled') {
                onfulfilled(this.value)
            }
            if (this.status === 'rejected') {
                onrejected(this.reason)
            }
            if (this.status === 'pending') {
                this.onFulfilledFunc = onfulfilled
                this.onRejectdFunc = onrejected
            }

        }
        //举例使用，到了这里我们可以打印出 data 和 1 ，然而真正的Promise打印的是 1， data，这里需将resolve 和 reject方法暂且放在setTimeout中，保证异步的执行，但是实际Promise是使用了MutationOberver来模仿nextTick
        let promiseTest = new Promise((resolve, reject) => {
            resolve('data')
        })
        promiseTest.then(data => {
            console.log(data)
        })
        console.log(1)
        //第五阶段，这里需将resolve 和 reject方法暂且放在setTimeout中，保证异步的执行
        function Promise(executor) {
            const self = this
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.onFulfilledFunc = Function.prototype
            this.onRejectedFunc = Function.prototype

            function resolve(value) {
                if(value instanceof Promise){ //判断了value值是不是一个Promise的判断，如果是的话将继续执行下一个Promise后then的resolve方法
                    return value.then(resolve, reject)
                }
                setTimeout(function(){
                    if (self.status === 'pending') {
                        self.value = value,
                            self.status = 'fulfilled'
                        self.onFulfilledFunc(self.value)
                    }
                })
            }

            function reject(reason) {
                setTimeout(function(){
                     if (self.status === 'pending') {
                        self.reason = reason
                        self.status = 'rejected'
                        self.onRejectedFunc(self.reason)
                    }
                })
            }
            executor(resolve, reject)
        }
        //上面在padiing状态的时候，执行了then里面的值，
        Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            if (this.status === 'fulfilled') {
                onfulfilled(this.value)
            }
            if (this.status === 'rejected') {
                onrejected(this.reason)
            }
            if (this.status === 'pending') {
                this.onFulfilledFunc = onfulfilled
                this.onRejectdFunc = onrejected
            }

        }
        //尝试执行如下的代码
        let promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve('data')
            },20000)
        })
        promise.then(data=>{
            console.log(`1:${data}`)
        })
        promise.then(data=>{
            console.log(`2:${data}`)
        })
        //我们代码只是输出了 2： data
        //why？ 因为 我们的方法内是异步的。当执行时第二个then的方法将第一个覆盖掉了，所以我们需要将onFulfilledFunc存到一个数组onFulfilledArray中，onRejectedFunc同理
        //第六阶段，将onFulfilledFunc存到一个数组onFulfilledArray中，onRejectedFunc同理
        function Promise(executor) {
            const self = this
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.onFulfilledArray = []
            this.onRejecteArray = []

            function resolve(value) {
                if(value instanceof Promise){ //判断了value值是不是一个Promise的判断，如果是的话将继续执行下一个Promise后then的resolve方法
                    return value.then(resolve, reject)
                }
                setTimeout(function(){
                    if (self.status === 'pending') {
                        self.value = value,
                            self.status = 'fulfilled'
                        self.onFulfilledArray.forEach(func=>{
                            func(value)
                        })
                    }
                })
            }

            function reject(reason) {
                setTimeout(function(){
                     if (self.status === 'pending') {
                        self.reason = reason
                        self.status = 'rejected'
                        self.onRejecteArray.forEach(func=>{
                            func(reason)
                        })
                    }
                })
            }
            //顺便加入构造函数如果出错，直接将Promise实例改变为reject的try...catch判断
            try{
                 executor(resolve, reject)
            }catch(e){
                reject(e)
            }
           
        }
        //上面在padiing状态的时候，执行了then里面的值，
        Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            if (this.status === 'fulfilled') {
                onfulfilled(this.value)
            }
            if (this.status === 'rejected') {
                onrejected(this.reason)
            }
            if (this.status === 'pending') {
                this.onFulfilledArray.push(onfulfilled)
                this.onRejecteArray.push(onrejected)
            }

        }
        //步骤七 实现Promise的链式调用，真正的promise函数是支持返回一个新promise对象或者非promise对象的
        //这里处理返回值为promise对象的方法
        function Promise(executor) {
            const self = this
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.onFulfilledArray = []
            this.onRejecteArray = []

            function resolve(value) {
                if(value instanceof Promise){ //判断了value值是不是一个Promise的判断，如果是的话将继续执行下一个Promise后then的resolve方法
                    return value.then(resolve, reject)
                }
                setTimeout(function(){
                    if (self.status === 'pending') {
                        self.value = value,
                            self.status = 'fulfilled'
                        self.onFulfilledArray.forEach(func=>{
                            func(value)
                        })
                    }
                })
            }

            function reject(reason) {
                setTimeout(function(){
                     if (self.status === 'pending') {
                        self.reason = reason
                        self.status = 'rejected'
                        self.onRejecteArray.forEach(func=>{
                            func(reason)
                        })
                    }
                })
            }
            //顺便加入构造函数如果出错，直接将Promise实例改变为reject的try...catch判断
            try{
                 executor(resolve, reject)
            }catch(e){
                reject(e)
            }
           
        }
        //上面在padiing状态的时候，执行了then里面的值，
        Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            let promise2
            if (this.status === 'fulfilled') {
                return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onfulfilled(this.value)
                            resolve(result)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'rejected') {
                 return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onrejected(this.value)
                            resolve(result)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'pending') {
                return promise2 = new Promise((resolve, reject)=>{
                    this.onFulfilledArray.push(()=>{
                        try{
                            let result = onfulfilled(this.value)
                             resolve(result)
                        }catch(e){
                             reject(e)
                        }
                    })
                    this.onRejecteArray.push(()=>{
                         try{
                            let result = onrejected(this.reason)
                            resolve(result)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
               
            }

        }
         //尝试执行如下的代码,这只是执行了返回值为Promise对象的方法，如果返回值为普通值需要进一步处理
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('lucas')
            }, 2000)
        })
        promise.then(data => {
            console.log(`1:${data}`)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(`${data} next then`)
                }, 4000)
            })
        }).then(data => {
            console.log(data)
        })
        //步骤八 实现Promise的链式调用，真正的promise函数是支持返回一个非promise对象的，这里的思路是将一个普通的值变为Promise对象，抽出resolvePromise统一处理
         function Promise(executor) {
            const self = this
            this.status = 'pending'
            this.value = null
            this.reason = null
            this.onFulfilledArray = []
            this.onRejecteArray = []

            function resolve(value) {
                if(value instanceof Promise){ //判断了value值是不是一个Promise的判断，如果是的话将继续执行下一个Promise后then的resolve方法
                    return value.then(resolve, reject)
                }
                setTimeout(function(){
                    if (self.status === 'pending') {
                        self.value = value,
                        self.status = 'fulfilled'
                        self.onFulfilledArray.forEach(func=>{
                            func(value)
                        })
                    }
                })
            }

            function reject(reason) {
                setTimeout(function(){
                     if (self.status === 'pending') {
                        self.reason = reason
                        self.status = 'rejected'
                        self.onRejecteArray.forEach(func=>{
                            func(reason)
                        })
                    }
                })
            }
            //顺便加入构造函数如果出错，直接将Promise实例改变为reject的try...catch判断
            try{
                 executor(resolve, reject)
            }catch(e){
                reject(e)
            }
           
        }
         const resolvePromise = (promise2, result, resolve, reject)=>{
             //如果循环调用，即在onfulfilled返回promise2时，执行reject
            if(result === promise2){
                reject(new TypeError('error due to circular reference'))
            }
            //是否已经执行过onfulfilled或者onrejected
            let consumed = false
            let thenable
            if(result instanceof Promise){
                //如果没有执行那么递归调用pending
                if(result.status === 'pending'){
                    result.then(function(data){
                         resolvePromise(promise2, result, resolve, reject)
                    },reject)
                }else{
                    result.then(resolve, reject)
                }
                return
            }
            let isComplexResult = target =>(typeof target === 'function' || typeof target === 'object') && (target !== null)
            if(isComplexResult(result)){
                try{
                    thenable = result.then
                    //判断返回值是否是Promise类型，如果是，那么result.then 是一个函数类型
                    if(typeof thenable === 'function'){
                        thenable.call(result, function(data){
                            if(consumed){
                                return
                            }
                            consumed = true
                            return resolvePromise(promise2,data,resolve,reject)
                        },function(error){
                            if(consumed){
                                return 
                            }
                            consumed = true
                            return reject(error)
                        })
                    }else {
                        reolve(result)
                    }
                }catch(e){
                    if(consumed){
                        return
                    }
                    consumed = true
                    return reject(e)
                }
            }else{
                resolve(result)
            }
         }
        //上面在padiing状态的时候，执行了then里面的值，
        Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            let promise2
            if (this.status === 'fulfilled') {
                return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onfulfilled(this.value)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'rejected') {
                 return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onrejected(this.value)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'pending') {
                return promise2 = new Promise((resolve, reject)=>{
                    this.onFulfilledArray.push(()=>{
                        try{
                            let result = onfulfilled(this.value)
                            //  resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                             reject(e)
                        }
                    })
                    this.onRejecteArray.push(()=>{
                         try{
                            let result = onrejected(this.reason)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
               
            }
        }
        //完成promise穿透实现
        //promise穿透例子
        const promise = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('lucas')
            },2000)
        })
        promise.then(null)
               .then(data=>{
                   console.log(data)
               })
        //输出结果 2s后输出lucas
        //实际上我们以上的代码已经实现了穿透的判断
         Promise.prototype.then = function (onfulfilled, onrejected) {
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data //当.then方法中如果非函数值,则解析为.then(null),上一个结果直接穿透到下一个then方法参数中
            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                throw error
            }
            let promise2
            if (this.status === 'fulfilled') {
                return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onfulfilled(this.value)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'rejected') {
                 return promise2 = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        try{
                            let result = onrejected(this.value)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
            if (this.status === 'pending') {
                return promise2 = new Promise((resolve, reject)=>{
                    this.onFulfilledArray.push(()=>{
                        try{
                            let result = onfulfilled(this.value)
                            //  resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                             reject(e)
                        }
                    })
                    this.onRejecteArray.push(()=>{
                         try{
                            let result = onrejected(this.reason)
                            // resolve(result)
                            resolvePromise(promise2, result, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
               
            }
        }
        //promise其他静态方法实现
        //promise.prototype.catch 其实就是通过reject抓取错误信息
        const promise1 = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject('lucas error')
            },2000)
        })
        promise1.then(data=>{
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
        promise.prototype.catch = function(catchFunc){
            return this.then(null,catchFunc)
        }
        promise.resolve = function(value){
            return new Promise((resolve,reject)=>{
                resolve(value)
            })
        }
        promise.reject = function(value){
            return new Promise((resolve,reject)=>{
                reject(value)
            })
        }
        promise.all = function(promiseArray){
            if(!Array.isArray(promiseArray)){
                throw new typeError('The arguments should be an array')
            }
            return new Promise((resolve, reject)=>{
                try{
                    let resultArray = []
                    const length = promiseArray.length
                    for(let i =0; i<length; i++){
                        promiseArray[i].then(data=>{
                            resultArray.push(data)
                            if(resultArray.length === promiseArray){
                                resolve(resultArray)
                            }
                        },reject)
                    }
                }catch(e){
                    reject(e)
                }
            })
        }
        promise.race = function(promiseArray){
            if(!Array.isArray(promiseArray)){
                throw new typeError('The arguments should be an array')
            }
            return new Promise((resolve, reject)=>{
                try{
                    let resultArray = []
                    const length = promiseArray.length
                    for(let i =0; i<length; i++){
                        promiseArray[i].then(resolve,reject)
                    }
                }catch(e){
                    reject(e)
                }
            })
        }