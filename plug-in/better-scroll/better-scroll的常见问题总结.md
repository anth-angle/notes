### 使用better-scroll遇到的常见问题
1. better-scroll如何设置才可以滚动？
    -  better-scroll滚动的先决条件是：`外层的高度小于滚动内容的高度`
    ```html
    // 外层wrapper
    <div class="wrapper_scroll">
        // 滚动内容
        <scroll>
        </scroll>
    </div>
    ```
    - 移动端通常会遇到这样的情况：`整屏滚动`--- 外层wrapper会被滚动内容撑开，造成 `外层高度>=滚动内容高度`， 这样better-scroll是不会滚动的。给wrapper层固定高度吧，但又不适配全部机型，有个很蠢的方法就是：`媒体查询`。真的的很蠢，有没有简单又高效的方法呢？

    - `固定定位`
        - 通过给wrapper层一个固定定位（position: fixed; top: 00;  bottom: 0），height设置为100%
    这样wrapper层就可以拿到高度。这是因为`固定定位固定一个元素 而这个元素相对于浏览器视口本身` 所以设置height: 100%
    相当于获取到了整个屏幕的高度
        ```html
        <style>
            .wrapper{
                position: fixed;
                width: 200px;
                height: 100%;
                background-color: red;
            }
            /* .inner{
                width: 100px;
                height: 100px;
                background-color: green;
            } */
        </style>
        <body>
            <div class="wrapper">
                <div class="inner"></div>
            </div>
        </body>
        ```
        - 而且给wrapper层设置`position: fixed`还有个好处。移动端的一些页面是有bottom_nav（底部导航栏）的。为了不被bottom_nav(固定在底部，层级最高)遮挡部分滚动内容，需要减去bottom_nav的高度。用媒体查询很麻烦，而固定定位可以直接设置wrapper层的bottom：50px (假设bottom_nav的高度为：50px)
        ```html
        <style>
            .wrapper{
                position: fixed;
                width: 200px;
                height: 100%;
                background-color: red;
                botom: 50px;
            }
            /* .inner{
                width: 100px;
                height: 100px;
                background-color: green;
            } */
        </style>
        <body>
            <div class="wrapper">
                <div class="inner"></div>
            </div>
        </body>
        ```
        - 使用js重新设置高度
        ```javascript
        if (判断条件) {
        let bottom = '50px';
        this.$refs.wrapper.bottom  = bottom;
        }
        ```
    - 完成的步骤之后，你会发现，依然无法滚动，那是因为你还没有初始化`better-scroll`，初始化的时机很重要：一定要确定DOM都渲染完毕，再去初始化`better-scroll`， 最好在`$nextTick`函数中去初始化`better-scroll`
2. better-scroll可以滚动，但无法滚动到底部
    - better-scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动。因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。
    - 查看渲染的`dom`是不是很多（是否使用了`v-html`？），这个需要在`$nextTick`函数里设置定时器，在定时器里面初始化`better-scroll`
    > 示例代码：
    
    ```javascript
    this.$nextTick(() => {
          // 当页面内容过多时，DOM并没有全部渲染完 需要加入定时器
          setTimeout(()=>{
            this.$refs.scroll.refresh();
          },10)
        });
    ```

    - 查看渲染的dom是否有图片？一般加载图片完毕之前img标签高度为0，此时better-scroll获取到的高度是不准确的，造成better-scroll可以滚动，但无法滚动到底部。需要在所有图片加载完毕之后，重新refresh一下。
    > 判断图片是否加载完毕的相关代码
  ```javascript
  var loadImg = function (url) {
  return new Promise(function (resolve, reject) {
      var img = new Image();
      img.src = url;
      img.onload = function () {
          resolve()  ;
      };
      img.onerror = function () {
          reject()  ;
      };
  });
};
Promise.all([
    loadImg('xxx.jpg'),
    loadImg('yyy.jpg'),
    loadImg('zzz.jpg'),
]).then(function () {
    alert('all images are loaded!')
    this.$refs.scroll.refresh()
});
```