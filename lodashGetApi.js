const obj = {
    user: {
        posts: [{
                title: 'Foo',
                comments: ['Good one!', 'Interesting']
            },
            {
                title: 'bar',
                comments: ['OK']
            },
            {
                title: 'house',
                comments: ['beautiful']
            }
        ]
    }
}

//简易es5实现方法
var get = function get(p, o) {
    return p.reduce(function (xs, x) {
        return xs && xs[x] ? xs[x] : null;
    }, o);
};
//转化成es6的写法
const get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
//使用方法
console.log(get(['user', 'posts', 0, 'comments'], obj)) //['Good one!', 'Interesting']
console.log(get(['user', 'post', 0, 'comments'], obj)) //null

//柯里化 ps柯里化含义 把一个多参数的函数转化为单参数函数的方法。
//es6 写法
const get = p => o => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

//es5 
var get = function get(p) {
    return function (o) {
        return p.reduce(function (xs, x) {
            return xs && xs[x] ? xs[x] : null;
        }, o);
    };
};
//使用方法
const getUserComments = get3(['user', 'posts', 0, 'comments'])
console.log(getUserComments(obj))
console.log(getUserComments({
    user: {
        posts: []
    }
})) // null

// //lodash get API 源码解读
// /**
//  * Gets the value at `path` of `object`. If the resolved value is
//  * `undefined`, the `defaultValue` is returned in its place.
//  *
//  * @since 3.7.0
//  * @category Object
//  * @param {Object} object The object to query.
//  * @param {Array|string} path The path of the property to get.
//  * @param {*} [defaultValue] The value returned for `undefined` resolved values.
//  * @returns {*} Returns the resolved value.
//  * @see has, hasIn, set, unset
//  * @example
//  *
//  * const object = { 'a': [{ 'b': { 'c': 3 } }] }
//  *
//  * get(object, 'a[0].b.c')
//  * // => 3
//  *
//  * get(object, ['a', '0', 'b', 'c'])
//  * // => 3
//  *
//  * get(object, 'a.b.c', 'default')
//  * // => 'default'
//  */
// function get(object, path, defaultValue) {
//     const result = object == null ? undefined : baseGet(object, path)
//     return result === undefined ? defaultValue : result
// }

// function baseGet(object, path) {
//     path = castPath(path, object)

//     let index = 0
//     const length = path.length

//     while (object != null && index < length) {
//         object = object[toKey(path[index++])]
//     }
//     return (index && index == length) ? object : undefined
// }

// function castPath(value, object) {
//     if (Array.isArray(value)) {
//         return value
//     }
//     return isKey(value, object) ? [value] : stringToPath(value)
// }
// /** Used to match property names within property paths. */
// const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
// const reIsPlainProp = /^\w*$/

// function isKey(value, object) {
//     if (Array.isArray(value)) {
//         return false
//     }
//     const type = typeof value
//     if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
//         return true
//     }
//     return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
//         (object != null && value in Object(object))
// }

// function isSymbol(value) {
//     const type = typeof value
//     return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
// }
// const toString = Object.prototype.toString

// /**
//  * Gets the `toStringTag` of `value`.
//  *
//  * @private
//  * @param {*} value The value to query.
//  * @returns {string} Returns the `toStringTag`.
//  */
// function getTag(value) {
//     if (value == null) {
//         return value === undefined ? '[object Undefined]' : '[object Null]'
//     }
//     return toString.call(value)
// }
// /** Used as references for various `Number` constants. */
// const INFINITY = 1 / 0

// /**
//  * Converts `value` to a string key if it's not a string or symbol.
//  *
//  * @private
//  * @param {*} value The value to inspect.
//  * @returns {string|symbol} Returns the key.
//  */
// function toKey(value) {
//     if (typeof value === 'string' || isSymbol(value)) {
//         return value
//     }
//     const result = `${value}`
//     return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
// }
// const charCodeOfDot = '.'.charCodeAt(0)
// const reEscapeChar = /\\(\\)?/g
// const rePropName = RegExp(
//     // Match anything that isn't a dot or bracket.
//     '[^.[\\]]+' + '|' +
//     // Or match property names within brackets.
//     '\\[(?:' +
//     // Match a non-string expression.
//     '([^"\'][^[]*)' + '|' +
//     // Or match strings (supports escaping characters).
//     '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
//     ')\\]' + '|' +
//     // Or match "" as the space between consecutive dots or empty brackets.
//     '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g')

// /**
//  * Converts `string` to a property path array.
//  *
//  * @private
//  * @param {string} string The string to convert.
//  * @returns {Array} Returns the property path array.
//  */
// const stringToPath = memoizeCapped((string) => {
//     const result = []
//     if (string.charCodeAt(0) === charCodeOfDot) {
//         result.push('')
//     }
//     string.replace(rePropName, (match, expression, quote, subString) => {
//         let key = match
//         if (quote) {
//             key = subString.replace(reEscapeChar, '$1')
//         } else if (expression) {
//             key = expression.trim()
//         }
//         result.push(key)
//     })
//     return result
// })
// /** Used as the maximum memoize cache size. */
// const MAX_MEMOIZE_SIZE = 500

// /**
//  * A specialized version of `memoize` which clears the memoized function's
//  * cache when it exceeds `MAX_MEMOIZE_SIZE`.
//  *
//  * @private
//  * @param {Function} func The function to have its output memoized.
//  * @returns {Function} Returns the new memoized function.
//  */
// function memoizeCapped(func) {
//     const result = memoize(func, (key) => {
//         const {
//             cache
//         } = result
//         if (cache.size === MAX_MEMOIZE_SIZE) {
//             cache.clear()
//         }
//         return key
//     })

//     return result
// }

// function memoize(func, resolver) {
//     if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
//         throw new TypeError('Expected a function')
//     }
//     const memoized = function (...args) {
//         const key = resolver ? resolver.apply(this, args) : args[0]
//         const cache = memoized.cache

//         if (cache.has(key)) {
//             return cache.get(key)
//         }
//         const result = func.apply(this, args)
//         memoized.cache = cache.set(key, result) || cache
//         return result
//     }
//     memoized.cache = new(memoize.Cache || Map)
//     return memoized
// }

// memoize.Cache = Map
// const object = {
//     'a': [{
//         'b': {
//             'c': 3
//         }
//     }]
// }
// get(object, 'a[0].b.c')
// get(object, ['a', '0', 'b', 'c'])