/**
 * @description: 获取html元素相对于视窗的位置，不兼容IE
 * @author {anth-angle}
 * @param {element} element 
 * @returns {offset}
 */
function GetRect (element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left= document.documentElement.clientLeft;
    return{
        top: rect.top - top,
        bottom: rect.bottom - top,
        left: rect.left - left,
        right:  rect.right - left
    }
}

/**
 * @description: 数组去重 不兼容es5
 * @author {anth-angle}
 * @param {array} element 
 * @returns {array}
 */
function unique (array) {
    return Array.from(new Set(array));
    // return [...new Set(array)];
}