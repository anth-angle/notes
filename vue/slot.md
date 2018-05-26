### slot
看了vue官方文档的关于slot部分的讲述，不解其意。在网上翻阅了一些博客和技术文章。解决了我以下几个疑问：<br><br>
1. 什么是slot？
slot 说白了，就是占坑用的。回想一下，我们为什么要定义组件以及怎么使用一个组件？   __定义组件其实就是封装可重用代码__。 而定义一个组件的步骤 
 
* 注册：
```javascript
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// 创建实例
new Vue({
  el: '#example'
})
```
* 使用
```javascript
<div id="example">
  <my-component></my-component>
</div>
```
* 渲染
```html
<div id="example">
  <div>A custom component!</div>
</div>
```
<br>
这样，一个简单的组件就完成了。我们就可以随意在任意地方使用了。<br>

设想一下这样的场景： 一个项目有很多地方要用到button按钮 ，把它定义成组件，这个完全没有问题，但是，button里的文字是不同的，怎么办？ 总不能写很多个button组件吧。怎么去定制组件？这个才是关键！ 而slot就是用于定制组件的一种方式（还有props也是可以的）<br><br>

slot组件能够让我们在已经定义好的组件里插入一些内容【一般都是html】
<br>
类似于这样：
<br>

```html
<template>
    <button>
        <slot></slot>
    </button>
</template>
```
<br>
使用时：
<br>

```html
<my-button>按钮文字</my-button>
```
按钮文字可以随便写了 什么确定啊、取消啊、什么乱七八糟的都可以
是不是跟占坑一样，先把位置占了，要写什么根据具体场合来写。
<br>
<br>
2. 怎么使用slot

* 简单用法

    - 匿名slot  （组件里只有一个slot，不需要区分）
    ```html
    // 定义组件my-component
    <div class="my-component">
        <slot></slot>
    </div>
    
    // 使用
    <my-component>
        <p>我就是slot的替代内容，这里可以放任何html</p>
    </my-component>
    ```
    - 具名slot (（组件里有多个slot，需要区分）)
    ```html
   // 定义组件my-component
    <div class="my-component">
        <slot name=“title”></slot>
        <slot name=“text”></slot>
    </div>
    
    // 使用
    <my-component>
        <p slot=“title”>具名slotl</p>
        <p slot="text">slot和name一一对应</p>
    </my-component>
    ```
    <br>
    无论是匿名slot还是具名slot，都是父组件替换子组件的数据，或者没有替换，用子组件默认的数据。可以看成是父驱动子(father -> child)
    
* 比较深入的用法
    
    - 作用域slot （通过设置作用域槽，让子组件可以在父组件进行分发时获取自己的数据，至于是什么数据，由子组件决定，这样就能解耦了。）
    ```html
    // 定义my-component组件
    <template>
      <div class="my-compontent">
        <ul>
          <slot v-for="item in items" v-bind:text="item.name"></slot>
        </ul>
      </div>
    </template>
    
    <script>
    export default {
      data () {
        return {
          items: [
            {name: 'apple'},
            {name: 'banana'},
            {name: 'pear'}
          ]
        }
      }
    }
    </script>
    ```
    ```html
    // 使用my-component组件
    <template>
      <div id="app">
        <my-component>
          <template scope="data">
            <li>{{ data.text }}</li>
          </template>
        </my-component>
      </div>
    </template>

    <script>
    import MyComponent from './components/mycomponent'
    export default {
      name: 'app',
      components: {
        MyComponent
      }
    }
    </script>
    ```


最终渲染为：
<br>
![Markdow](https://github.com/anth-angle/my/blob/master/images/scope_slot.png?raw=true)

可以看出， 在子组件中，将数据传给slot; 在父组件中具有特殊属性scope的`<template>`元素必须存在,他表示替换slot的模板。 scope对应的值是一个临时变量名（它是一个对象）, 此变量接收从子组件中传递过来的数据（子组件数据作为属性存在）
<br>
<br>
作用域slot的使用场景：
<br>
> 作用域slot本质上就是一个具名slot，将父组件作用域的`<template>`与子组件的具名slot绑定，从而让子组件能直接在slot中写v-for、v-if等渲染DOM结构; 并借`<template>`的scope特性接收子slot传递的数据，在template中填充其内容。与其说有什么应用场景，不如说只是给 开发者提供了一个从子组件渲染DOM结构的选择。[知乎作者：沈江平](https://www.zhihu.com/question/57504896/answer/209519134)
<br>

比如说：子组件是个展示列表，每5分钟需要更换列表。这其实用具名slot和作用域slot都是可以实现的.但作用域slot用起来会更好（这时slot可以使用v-for）

3. slot和props有什么区别？
* slot的使用场景是未知的（随机应变的）；
* props的使用场景是已知的，通过传入的参数来控制子组件的形态；