### mixin
当多个组件用到相同的逻辑时，这时可以使用minxin，实际上就是吧共同的js代码写到一个js文件（一般命名为mixin.js,跟commin.js的区别： mixin.js跟vue组件有关，而且相关的写法跟组件类似，都有`methods`、`watch`、`mounted`等等，而common.js偏碎片化，函数化）
mixin.js通过暴露出一个对象
```javascript
export const mixin = {
    // 组件的dom ready的时候触发
    mounted () {

    },
    // 切换组件的时候触发
    activated () {

    },
    watch: {

    }
}
```
借用官方文档的描述就是：
> 混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
```javascript
// 在mixin.js中，定义一个混合对象
export const myMixin = {
  data () {
    return {
      name: 'dk'
    }
  },
  created () {
    // 第一次打印
    this.hello(this.name)
  },
  mounted () {
    // 第二次打印
    this.hello()
  },
  methods: {
    hello (val) {
      if (val) {
        console.log('hello ' + val)
        return
      }
      console.log('hello mixin!')
    }
  }
}
```
```javascript
// 在hello.vue中使用
import {myMixin} from '../common/js/mixin'
export default {
  name: 'hello',
  mixins: [myMixin],
  data () {
    return {
      name: 'jjk'
    }
  },
  mounted () {
    // 第三次打印
    this.showHello()
  },
  methods: {
    showHello () {
      this.hello(this.name)
    }
  }
}
```
在chrome中显示：
![mixin_01](https://github.com/anth-angle/my/blob/master/images/mixin_01.png?raw=true)
上面的代码其实‘长’这样：
```javascript
// hello.vue
export default {
  name: 'hello',
  data () {
    return {
      name: 'jjk'
    }
  },
  created () {
    this.hell0(this.name)
  }
  mounted () {
    this.hello()
    this.showHello()
  },
  methods: {
    showHello () {
      this.hello(this.name)
    },
    hello (val) {
      if (val) {
        console.log('hello ' + val)
        return
      }
      console.log('hello mixin!')
    }
  }
}
```
mixin只不过把hello这个方法给抽出来了。
疑问在于：为什么输出的‘jjk’，而不是‘dk’？原因是：“合并”
> 当组件和混合对象含有同名选项时，这些选项将以`恰当的方式`混合
就像例子中name，组件的选项优先于mixin的选项

`一般来说：组件的选项优先于mixin的选项，但同名钩子函数将混合为一个数组，因此都将被调用。而且，mixin钩子将在组件自身钩子之前调用`
 - 还是上面的例子：
```javascript
export const myMixin = {
  data () {
    return {
      name: 'dk'
    }
  },
  created () {
    this.hello('dk')
  },
  mounted () {
    this.hello()
  },
  methods: {
    hello (val) {
      if (val) {
        console.log('hello ' + val)
        return
      }
      console.log('hello mixin!')
    }
  }
}
```
```javascript
import {myMixin} from '../common/js/mixin'
export default {
  name: 'hello',
  mixins: [myMixin],
  data () {
    return {
      name: 'jjk'
    }
  },
  mounted () {
    this.showHello()
  },
  methods: {
    showHello () {
      this.hello(this.name)
    }
  }
}
```
只是改动
```javascript
created () {
    this.hello('dk')
  }
```
chrome中输出的的结果就变了：
![mixin_02](https://github.com/anth-angle/my/blob/master/images/mixin_02.png?raw=true)
可以看出，使用mixin可以在`created`或者`mounted`等钩子函数中先执行自己的行为（比如说：获取异步数据）
<br>
<br>
以上就是mixin的简单介绍，遇到相关问题再做更新
<p align="right">anth-angle&emsp; 2017-10-15 23：29</p>