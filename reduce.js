// reduce的使用方法
/**
 * 
 * @param {*} func A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
 * @param {*} initialValue
 */
Array.prototype.myreduce = function (func, initialValue) {
    if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }
    var arr = this
    var base = typeof initialValue === 'undefined' ? arr[0] : initialValue
    var startPoint = typeof initialValue === 'undefined' ? 1 : 0
    for (let i = startPoint; i < arr.length; i++) {
        const cur = arr[i]
        base = func(base, cur, i, arr)
    }
    return base
}