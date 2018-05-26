### 由map引出的一个问题
- 今天在做项目的时候用到了map函数.
- 我的代码是这样的：
```javascript
let tag = document.getElementsByClassName('content')[0];
let imgs = tag.getElementsByTagName('img');
let arr = [];
arr = imgs.map((item) => {
    return item.src;
})
console.log(arr);
```
- 在我的预想中，使用map就可以拿到img的src集合了，然而却无情的报错： `.map() is not a function`
- 一般报这种错误，应该去找使用map函数的源头，难道我的imgs没获取到还是imgs根本就不是数组？
于是我稍微改动了代码：
```javascript
let tag = document.getElementsByClassName('content')[0];
let imgs = tag.getElementsByTagName('img');
console.log(imgs);
console.log(typeof imgs);
let arr = [];
arr = imgs.map((item) => {
    return item.src;
})
console.log(arr);
```
结果是确实能获取到
![map](https://github.com/anth-angle/my/blob/master/images/map_01.png?raw=true)
- chrome显示的很清楚，imgs能过获取到，而且是个数组！！难道是map方法出错了？于是我改用filter去验证我的想法：
```javascript
let tag = document.getElementsByClassName('content')[0];
let imgs = tag.getElementsByTagName('img');
console.log(imgs);
console.log(typeof imgs);
let arr = [];
arr = imgs.filter((item) => {
    return item.src;
})
console.log(arr);
```
在chrome中打印：
![filter](https://github.com/anth-angle/my/blob/master/images/filter.png?raw=true)
-`imgs.filter is not a function` 咦？ 连filter都错了！！这下确认了这并不是`map`的锅。现在开始怀疑`imgs`到底是不是数组了，于是，我拿`isArray`方法验证了一下，看imgs到底是不是数组？
```javascript
let tag = document.getElementsByClassName('content')[0];
let imgs = tag.getElementsByTagName('img');
imgs = [].slice.call(imgs);
console.log(imgs);
console.log(typeof imgs);
console.log(Array.isArray(imgs));
let arr = [];
arr = imgs.map((item) => {
    return item.src;
})
console.log(arr);
```
在chrome中显示：
![map](https://github.com/anth-angle/my/blob/master/images/map_02.png?raw=true)
- 果然，`imgs`并不是数组!!看来是被chrome的解析误导了！！把demo拿到微软的edge浏览器一测：
![map](https://github.com/anth-angle/my/blob/master/images/map_03.png?raw=true)
- 跟chrome截然不同：出现了一个我没见过的字眼`HtmlCollection`
- 什么是`HtmlCollection`?
    - MDN的解释是：表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合（generic collection），还提供了用来从该集合中选择元素的方法和属性。，通俗的话来说，就是获取DOM对象的集合
    - 它是`伪数组`(这就是chrome为什么会把它解析为数组的原因吧？)
- 原因找到了，那总得解决问题吧：如何获取`imgs`的src？
    - 使用`call/apply` 借用Array的`slice`的方法:`allImgs = Array.prototype.slice.call(allImgs);
// or
allImgs = [].slice.call(allImgs);`
    - ```javascript
        let tag = document.getElementsByClassName('content')[0];
        let imgs = tag.getElementsByTagName('img');
        imgs = [].slice.call(imgs);
        console.log(imgs);
        console.log(typeof imgs);
        console.log('imgs现在是不是数组：');
        console.log(Array.isArray(imgs));
        let arr = [];
        arr = imgs.map((item) => {
            return item.src;
        })
        console.log(arr);
        ```
        在chrom中显示：![map](https://github.com/anth-angle/my/blob/master/images/map_04.png?raw=true)
        - 搞定！！
- 总结
    1. `凡是获取的DOM集合都不是真正的数组，无法使用map等数组方法`
    2. 判断数组 `typeof`不可靠，`isArray`才是王道