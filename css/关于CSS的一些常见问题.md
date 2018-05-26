### 关于CSS的一些常见问题
1. flex布局
    - 移动端使用flex布局是目前最好的布局方式，语法可以看阮一峰老师的教程: [flex语法](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
2. 1px问题
    - 主要是移动端的Retine屏的分辨率是普通屏幕的2倍，1px的边框在devicePixelRatio=2的retina屏下会显示成2px。
    解决方案：
        - ```html
            <div class="border-1px"></div>

            <style type="text/scss">
            .border-1px {
                position: relative;
                &:after{
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    border-top: 1px solid #000;
                    content: '';
                }
            }
            @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
                .border-1px{
                    &::after{
                        -webkit-transform: scaleY(0.7);
                        transform: scaleY(0.7);
                    }
                }
            }
            @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
                .border-1px{
                    &::after{
                        -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                    }
                }
            }
            </style>
3. 修改插件的样式
    - 在vue中，修改插件的默认样式首先要把`scope`去掉，才能成功的替换样式
4. 修改input、textarea的默认字体样式
    - `input::-webkit-input-placeholder`{
        // 修改样式
    }
    - `textarea::-webkit-input-placeholder`{
       // 修改样式
    }
        
5. 文字与图片水平居中对齐
    - 使用`background-image`、使用flex中的`justify-content`和`align-items`属性即可实现图片文字单行文本对齐
6. background-size
    - 对图片进行等比例缩放
7. first-child/last-child
    - :first-child 这个伪类，只有当元素是其父元素的第一个子元素时才能匹配。
8. reset css时， 记得设置: 
    - html, body{height: 100%}
    - line-height: 1