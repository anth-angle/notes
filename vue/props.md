### props
组件之间的作用域是**孤立的**， 这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的 props 选项。
<br>
<br>
子组件要**显式地**用 props 选项声明它期待获得的数据：
```html
<template>
  <div class="content">
      {{msg}}
  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
```
<br>
props是在子组件申明的， 它是一个数组（它还可以是一个对象）， 它期待获取的数据为msg, msg将作为子组件的动态属性去获取父组件给的值

```html
<template>
  <div id="app">
    {{title}}
    <show-props :msg="text">

    </show-props>
  </div>
</template>

<script>
import ShowProps from './components/showprops'
export default {
  name: 'app',
  data () {
    return {
      title: 'props选项',
      text: 'kkkk'
    }
  },
  components: {
    ShowProps
  }
}
</script>
```
text是父组件的数据，传给了动态属性:msg，这样子组件就获取到了text并渲染到子组件中
<br>
<br>
最终渲染：
<br>
![image](https://github.com/anth-angle/my/blob/master/images/props_01.png?raw=true)
<br>
<br>
prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。
但有时候，子组件需要props的数据。为什么我们会有修改 prop 中数据的冲动呢？通常是这两种原因：
- prop 作为初始值传入后，子组件想把它当作局部数据来用；
- prop 作为初始值传入，由子组件处理成其它数据输出。
对这两种原因，正确的应对方式是：
1. 定义一个局部变量，并用 prop 的值初始化它：
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
2. 定义一个计算属性，处理 prop 的值并返回。
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
**注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。**
<br>
<br>
props验证
<br>
我们可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue 会发出警告。
要指定验证规格，需要用对象的形式，而不能用字符串数组
```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且类型是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
**注意 props 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。**
<br>
<br>
props的使用场景：
<br>
通过props可以唤醒子组件的一些功能，从而可以定制子组件。它一定是父组件传入数据给子组件（跟slot的区别）