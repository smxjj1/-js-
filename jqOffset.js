//实现方法一，递归遍历目标元素，目标父元素节点相对于最近祖结点的偏移量

const offset = ele => {
    debugger
    let position
    let result = {
        top: 0,
        left: 0
    }

    const getOffset = (node, init) => {
        // 如果不是元素节点，则直接返回。nodeType=1为元素节点，
        if (node.nodeType !== 1) {
            return
        }

        // window.getComputedStyle获取元素的所有样式
        position = window.getComputedStyle(node)['position']

        // 如不是首次计算，并且position为static，继续计算父级
        if (typeof (init) === 'undefined' && position === 'static') {
            getOffset(node.parentNode)
            return
        }

        // 减去node.scrollTop是因为，如果元素在一个带有滚动条的父元素内，则offsetTop会获取整个高度
        // 如果滚动条不为0则需要减去已滚动的部分。
        result.top += node.offsetTop - node.scrollTop
        result.left += node.offsetLeft - node.scrollLeft

        if (position === 'fixed') {
            return
        }

        // 递归调用
        getOffset(node.parentNode)
    }

    // 当前 DOM 节点的 display === 'none' 时, 直接返回 {top: 0, left: 0}
    if (window.getComputedStyle(ele)['display'] === 'none') {
        return result
    }

    getOffset(ele, true)
    return result
}

//通过getBoundingClientRect方法实现

const offsetB = ele => {
    let result = {
        top: 0,
        left: 0
    }
    if (!ele.getClientRects().length) {
        return result
    }

    if (window.getComputedStyle(ele)['display'] === 'none') {
        return result
    }
    result = ele.getBoundingClientRect()
    var docElement = ele.ownerDocument.documentElement
    return {
        top: result.top + window.pageYOffset - docElement.clientTop,
        left:  result.left + window.pageXOffset - docElement.clientLeft,
    }
}