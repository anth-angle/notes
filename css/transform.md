### transform
transform的含义是：改变，使…变形；转换
> transform本质上是一系列变形函数，分别是`translate`位移，`scale`缩放，`rotate`旋转，`skew`扭曲，`matrix`矩阵<br>[作者：张歆琳 transform篇](http://www.jianshu.com/p/17e289fcf467)

transform ： none | <`transform-function`> [ <`transform-function`> ]
<br>
<br>
none:表示不进行变换；<`transform-function`>表示一个或多个变换函数，以空格分开；换句话说就是我们可以同时对一个元素进行transform的多种属性操作，例如rotate、scale、translate等等，但这里需要提醒大家的，以往我们叠加效果都是用逗号（“，”）隔开，但transform中使用多个属性时却需要有空格隔开。大家记住了是空格隔开。而且transform的属性声明顺序有一定的要求，不然会导致覆盖。比如说：
我先声明的平移，再声明旋转，结果平移失效
```css
transform: translateZ(50px) rotateY(90deg); // 错误代码

transform: rotateY(90deg) translateZ(50px); //正确代码
```
以下是几个变换函数的总结
 - `transform: translate()`
    - translate 在这里是`平移`的意思，而不是`翻译`的意思。
    - 用法：transform：translate（x，y），当x，y带上单位px时，沿x轴平移`x`px，沿y轴平移`y`px; 当x, y是百分比时，表示平移自身的百分之几 比如说一个元素宽高都为100px，而`transfrom: translate(50%, 100%)`，这表示沿x轴平移`100px * 50% = 50px`, 沿y轴平移`100px * 100% = 100px`
    示例代码：
    <br>
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <style>
        .body{
            padding: 20px;
        }
        .box1{
            width: 30px;
            height: 30px;
            /* margin: 10px; */
            background-color: red;        
        }
        .box2{
            width: 30px;
            height: 30px;
            /* margin: 10px; */
            background-color: green;
            transform: translate(100px, 50%);
        }
    </style>
    <body>
        <div class="box1"></div>
        <div class="box2"></div>
    </body>
    </html>
    ```
    最终渲染为：
    <br>
    ![images](https://github.com/anth-angle/my/blob/master/images/translate_01.png?raw=true)
 - `transform: scale()`
 - `transform: rotate()`
 - `transform: skew()`
 - `transform: matrix()`
