### set
关于set的用法，其实我自己从来没有用到，只是在看到Vue官方文档时，看到这个提示：
<br>
由于JavaScript的限制，Vue不能检测以下变动数组：
> 当你利用索引直接设置一个项时
<br>

> 当你修改数组的长度时

这个让我比较好奇,所以特意捣鼓了一下。
<br>
<br>
例如在data属性里：
```javascript
export default {
    name: 'app',
    data () {
        return {
            content: {
                title: 'set的用法',
                text: 'balabala'
            },
            list:[
                'apple', 'banana', 'pear'
            ]
        }
    }
}
```
当你利用索引直接设置一个项时：
`this.list[3] = cherry`
<br>
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <button @click="changeList">改变list</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
  },
  methods: {
    changeList () {
      this.list[3] = 'cherry'
      console.log(this.list)
    }
  }
}
</script>
```
在chrome中显示：
<br>
![set_01](https://github.com/anth-angle/my/blob/master/images/set_01.png?raw=true)
<br>
当你修改数组的长度时: `this.list.length = 4`
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <button @click="changeList">改变list</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
  },
  methods: {
    changeList () {
      this.list.length = 4
      console.log(this.list)
    }
  }
}
</script>
```
在chrome中显示：
<br>
![set_02](https://github.com/anth-angle/my/blob/master/images/set_02.png?raw=true)
<br>

为什么会出现这种情况呢？
> `因为 Vue 不能侦测直接对数组的某个索引赋值`，例如 replys[1] = {}，但是对数组里面的某个元素赋值， Vue是可以侦测到的，Vue是通过监测 get, set 来得知数据是否更新，而数组的索引是没有get、set


类似的情况:`Vue不能检测到对象属性的添加或删除`
<br>
当你改变对象的属性时：
`this.content.author = 'anth-angle'`
```html
<template>
  <div id="app">
    <!-- <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul> -->
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <button @click="changeList">改变list</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.content)
  },
  methods: {
    changeList () {
      this.content.anthor = 'anth-angle'
      delete this.content.title
      console.log(this.content)
    }
  }
}
</script>
```
在chrome中显示：
<br>
![set_03](https://github.com/anth-angle/my/blob/master/images/set_03.png?raw=true)
<br>
可以看出，vue无法检测到对象属性的变化，原因是：因为Vue在初始化时候将属性转化为getter/setter，所以属性必须在data对象才能让Vue转换它，才能让它是响应的。所以结果就是：`我们可以使用，但不能更改数据.`
<br>
但很多情况下，我们需要在已有的属性上添加一些属性，例如使用 Object.assign() 或 _.extend() 添加属性。但是，添加到对象上的新属性同样不会触发更新。这时可以创建一个新的对象，包含原对象的属性和新的属性：`this.content = Object.assign({}, this.content, {author: 'anth-angle'})`
```html
<template>
  <div id="app">
    <!-- <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul> -->
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <button @click="changeList">改变list</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.content)
  },
  methods: {
    changeList () {
      this.content = Object.assign({}, this.content, {author: 'anth-angle'})
      console.log(this.content)
    }
  }
}
</script>
```
![set_04](https://github.com/anth-angle/my/blob/master/images/set_04.png?raw=true)
<br>
可以看出，数据和视图都发生了变化，所以结果就是：`我们可以创建，使用，但不能更改数据.` 这样确保了数据的流动是明确的，可追踪的。
<br>
<br>
但是，到底有没有什么方法可以直接更改已经定义的原始数据呢？
<br>
答案是有的！（终于说到点子上了）
它就是:`set`
- 语法: vm.$set(target, key, value)
- 参数: 
    - target: {object|array}
    - key: {string|number}
    - value: {any}
-返回值：设置的值
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <button @click="changeList">改变list</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
    console.log(this.content)
  },
  methods: {
    changeList () {
      this.$set(this.list, 3, 'cherry')  
      this.$set(this.content, 'author', 'anth-angle')
      console.log(this.list)
      console.log(this.content)
    }
  }
}
</script>
```
在chrome显示：
<br>
![set_05](https://github.com/anth-angle/my/blob/master/images/set_05.png?raw=true)
<br>
这就是set的强大之处：`它可以直接修改原始数据，vue也会持续监控修改之后数据`
<br>
有趣的是，如果使用set修改数据的同时，去添加/删除一些属性，仍然会触发vue的监控
<br>
代码示例：
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <button @click="changeList">改变数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
    console.log(this.content)
  },
  methods: {
    changeList () {
      // 修改数组长度的方式添加元素
      this.list[3] = 'water'
      // 使用set添加元素
      this.$set(this.list, 4, 'cherry')
      // 再次使用修改数组长度的方式添加元素
      this.list[5] = 'cat'
      // this.$set(this.content, 'author', 'anth-angle')
      console.log(this.list)
      console.log(this.content)
    }
  }
}
</script>
```
点击前：
<br>
![set_06](https://github.com/anth-angle/my/blob/master/images/set_06.png?raw=true)
点击后：
<br>
![set_07](https://github.com/anth-angle/my/blob/master/images/set_07.png?raw=true)
<br>
很神奇吧！！在set之前改动数组，在set之后改动数组（这个比较难理解）,都触发了视图的跟新。那如果添加属性（不使用set）有会如何呢？
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <p>{{content.date ? content.date : 'sorry'}}</p>
    <p>{{content.url ? content.url : 'sorry'}}</p>
    <button @click="changeList">改变数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
    console.log(this.content)
  },
  methods: {
    changeList () {
      // 修改数组长度的方式添加元素
      this.list[3] = 'water'
      // 使用set添加元素
      this.$set(this.list, 4, 'cherry')
      // 再次使用修改数组长度的方式添加元素
      this.list[5] = 'cat'
      // 添加属性（不是用set）
      this.content.url = 'https://github.com/anth-angle'
      // this.$set(this.content, 'author', 'anth-angle')
      // this.content.date = '2017-9-26'
      console.log(this.list)
      console.log(this.content)
    }
  }
}
</script>
```
答案是：会!!
<br>
chrome显示：
<br1>
![set_08](https://github.com/anth-angle/my/blob/master/images/set_08.png?raw=true)
<br>
现在`set`一下对象
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <p>{{content.date ? content.date : 'sorry'}}</p>
    <p>{{content.url ? content.url : 'sorry'}}</p>
    <button @click="changeList">改变数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear']
    }
  },
  mounted () {
    console.log(this.list)
    console.log(this.content)
  },
  methods: {
    changeList () {
      // 修改数组长度的方式添加元素
      this.list[3] = 'water'
      // 使用set添加元素
      this.$set(this.list, 4, 'cherry')
      // 再次使用修改数组长度的方式添加元素
      this.list[5] = 'cat'
      // 添加属性（不使用set）
      this.content.url = 'https://github.com/anth-angle'
      this.$set(this.content, 'author', 'anth-angle')
      // 添加属性（不使用set）
      this.content.date = '2017-9-26'
      console.log(this.list)
      console.log(this.content)
    }
  }
}
</script>
```

点击后：
<br>

![set_09](https://github.com/anth-angle/my/blob/master/images/set_09.png?raw=true)
<br>
`似乎是set触发整个页面的刷新！` 然而真的是这样吗，添加个`count`属性，验证一下
```html
<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
    <p>{{content.title}}</p>
    <p>{{content.text}}</p>
    <p>{{content.author ? content.author : 'sorry'}}</p>
    <p>{{content.date ? content.date : 'sorry'}}</p>
    <p>{{content.url ? content.url : 'sorry'}}</p>
    <button @click="changeList">改变数据</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      content: {
        title: 'set的用法',
        text: 'balabala'
      },
      list: ['apple', 'banana', 'pear'],
      num: 1
    }
  },
  mounted () {
    console.log(this.list)
    console.log(this.content)
    console.log(this.num)
  },
  methods: {
    changeList () {
      // 修改数组长度的方式添加元素
      this.list[3] = 'water'
      // 使用set添加元素
      this.$set(this.list, 4, 'cherry')
      // 再次使用修改数组长度的方式添加元素
      this.list[5] = 'cat'
      // 添加属性（不是用set）
      this.content.url = 'https://github.com/anth-angle'
      this.$set(this.content, 'author', 'anth-angle')
      this.content.date = '2017-9-26'
      console.log(this.list)
      console.log(this.content)

      this.num++
      console.log(this.num)
    }
  }
}
</script>
```
点击前，`count=1`  这是毋庸置疑的
点击后呢？
<br>
![set_10](https://github.com/anth-angle/my/blob/master/images/set_10.png?raw=true)
<br>
可以看出，`count=2` 这说明：`set触发的不是整个页面，vue只是data重新添加到watch队列`, 当然这要看vue源码才知道！
<br>
OK，对set的说明就到这里了，有问题以后会补充
<p align="right">anth-angle &emsp;2017-9-27</p>
