### getBoundingClientRect
- Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
    - 语法： rectObject = object.getBoundingClientRect();
    - 值： 返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。
    - 实例：
        ```html
        <!DOCTYPE html> 
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
                .box{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 200px;
                    height: 200px;
                    transform: translate(-50%, -50%);
                    border: 1px solid red;
                }
            </style>
        </head>
        <body>
            <div class="box">
            </div>
            <script>
                let box = document.getElementsByClassName('box')[0];
                let rect = box.getBoundingClientRect();
                console.log(rect);
            </script>
        </body>
        </html>
        ```
        chrome中显示：![getBoundingClientRect_01](https://github.com/anth-angle/my/blob/master/images/getBoundingClientRect_01.png?raw=true)
    - DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素,返回的是number类型。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。

        - rectObject.top：元素上边到视窗上边的距离;
        - rectObject.right：元素右边到视窗左边的距离;
        - rectObject.bottom：元素下边到视窗上边的距离;
        - rectObject.left：元素左边到视窗左边的距离;
    
    - 示图：
        - ![rect](https://github.com/anth-angle/my/blob/master/images/rect.png?raw=true)
    - 兼容性： IE5以上都支持，IE67的left、top会少2px,并且没有width、height属性。
    - 用法：我们经常遇到的需求 --- 获取html元素相对于视窗的位置。
        - 我们通常想到的是offset, 利用offset获取的偏移量是相对于`定位父级`的。关于什么是offset的定位父级，可以参考 [深入理解定位父级offsetParent及偏移大小](http://www.cnblogs.com/xiaohuochai/p/5828369.html) 这篇博文。而getBoundingClientRect方法获取到的偏移量是相对于视窗的, 没有局限性。
    - 封装：
        ```javascript
            document.documentElement.clientTop;  // 非IE为0，IE为2
            document.documentElement.clientLeft; // 非IE为0，IE为2
            function gGetRect (element) {
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
        ```
