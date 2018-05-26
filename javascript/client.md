### client --- 客户区尺寸
1. 客户区大小`client`指的是元素内容及其内边距所占据的空间大小
2. 属性
    - `clientHeight` --- 返回不包括`border`的元素高度 （滚动条不计算在内）
    - `clientWidth` --- 返回不包括`border`的元素宽度 （滚动条不计算在内）
    - `clientTop` --- 返回左边框的宽度（`border-left`, 如果display为inline时，clientLeft属性和clientTop属性都返回0）
    - `clientLeft` --- 返回上边框的宽度（`border-top`, 如果display为inline时，clientLeft属性和clientTop属性都返回0）
    - 示例代码：
        ```html
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            .box{
                position: absolute;
                top: 200px;
                left: 200px;
                width: 200px;
                height: 200px;
                transform: translate(-50%, -50%);
                border: 1px solid red;
            }
            .target{
                border: 2px solid green;
                width: 50px;
                height: 50px;
                padding: 20px;
            }
        </style>
        </head>
        <body>
            <div class="box">
                <div class="target"></div>
            </div>
            <script>
                let target = document.getElementsByClassName('target')[0];
                
                console.log('clientHeight: ' +target.clientHeight);
                console.log('clientWidth: ' +target.clientWidth);
                console.log('clientLeft: ' +target.clientLeft);
                console.log('clientTop: ' + target.clientTop);
            </script>
        </body>
        </html>
        ```
    - 在chrome中显示
        - ![client_01](https://github.com/anth-angle/my/blob/master/images/client_01.png?raw=true)

2. 用法
    - client常用来表示页面的大小（包含滚动条） --- 页面高度:`document.documentElement.clientHeight` and 页面宽度：`document.documentElement.clientWidth`
    - 跟`innerHeight`、`innerWidth`的区别
        -  `window.innerWidth` 和`window.innerHeight` 表示的是浏览器窗口大小减去菜单栏、地址栏等剩余的页面尺寸，由于滚动条是属于页面的，所以包含滚动条
        - 如果没有滚动条，这两类属性在电脑端表示同样的值，但是却表示不同的含义。在移动端，`innerWidth`和`innerHeight`表示的是`视觉视口`，即用户正在看到的网站的区域；而`document.documentElement.clientWidth`和`clientHeight`表示的是`布局视口`，指CSS布局的尺寸。

