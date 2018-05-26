### 关于数组的一些疑问和总结
1. 格式为 `arr = ['apple', 'pear', 'banana'] ===>? arr = [{type: 'apple'}, {type: 'pear'}, {type: 'banana'}]`
2. 向数组添加元素
    - 常规方法使用push、unshift等方法来添加元素到数组。其实更快的方法是：`array[array.length] = 'xxx'`
