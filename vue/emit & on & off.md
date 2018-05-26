### emit & on & off
父组件利用props可以向子组件传递数据，子组件向父组件传递数据相对复杂点：在子组件触发（emit）事件，父组件的监听器（on）监听事件，执行回调（callback）。而off可以移除监听器（on）
1. emit
    - 解析：触发当前实例上的事件。附加参数[...args]都会传给监听器on的回调函数。
    - 语法
        - vm.$emit(event, [...args])

    - 参数： 
        - event[string] -- 事件名
        - [...args] -- 被$on接收的参数

2. on
    - 解析： 监听当前实例上的事件，当对应的事件触发时，接收来自触发器的参数并执行对应的回调函数
    - 语法
        - vm.$on(event, callback)
    - 参数
        - event[string] -- 需要监听的事件名
        - callback -- 当监听的事件触发时，接收来自触发器的参数作为参数并执行
3. off
    - 解析： 移除对应事件的监听器
        - 如果没有提供参数， 择移除所有事件监听器（on）
        - 如果只提供了事件，则移除该事件的所有监听器（on）
        - 如果同时提供了事件和回调，则只移除这个回调的监听器（on）
    - 语法：
        - vm.$off(event, callback)
    - 参数
        - event[string] -- 对应的事件名
        - callback -- 对应事件的回调

<br>
实例代码：

```html
// 子组件
<template>
  <div class="content">
    <button @click="change">emit</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '发送数据'
    }
  },
  methods: {
    // 点击事件
    change () {
      console.log(this.msg)
      // 点击btn时，触发事件自定义事件getMsg
      this.$emit('getMsg', this.msg)
    }
  }
}
</script>
```
```html
// 父组件
<template>
  <div id="app">
    {{title}}
   <p> {{message}}</p>
   //监听自定义事件getMsg，当getMsg事件触发时 执行getMessge函数
    <example @getMsg="getMessage"></example>
  </div>
</template>

<script>
import Example from './components/emitAndOnAndOff'
export default {
  name: 'app',
  data () {
    return {
      title: 'on&emit&off',
      message: '没有数据'
    }
  },
  methods: {
      // type为getMsg的参数
    getMessage (type) {
      console.log(type)
      this.message = type
    }
  },
  components: {
    Example
  }
}
</script>
```
最终渲染为：
<br>
![image](https://github.com/anth-angle/my/blob/master/images/emit_01.png?raw=true)
