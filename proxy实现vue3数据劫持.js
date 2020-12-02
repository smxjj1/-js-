const observe = data => {
    if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
        return
    }
    Object.keys(data).forEach(key => {
        let currentValue = data[key]
        if (typeof currentValue === 'object') {
            observe(currentValue) 
            debugger
            data[key] = new Proxy(currentValue, {
                set(target, property, value, receiver) {
                    if (property !== 'length') {
                        console.log(`setting ${key} value now, setting value is`, currentValue)
                    }
                    return Reflect.set(target, property, value, receiver)
                },
                get() {
                    console.log(`getting ${key} value is :`, currentValue)
                    return currentValue
                }
            })
        } else {
            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: false,
                get() {
                    console.log(`getting ${key} value is :`, currentValue)
                    return currentValue
                },
                set(newValue) {
                    currentValue = newValue
                }
            })
        }
    })
}