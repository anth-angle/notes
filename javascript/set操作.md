### set
1. ES6 提供了新的数据结构 Set。它`类似于数组`，但是成员的值都是唯一的，没有重复的值。
    - 注意：set是新的数据结构，他不是数组，它没有数组对应的方法
    - Set是一个构造函数，它的实例也不是数组。使用Set很简单：`new Set()` 参数`可以是`一个数组
    - 示例代码：
    ```javascript
        let list = new Set([1, 2, 3, 3]);
        console.log(typeof list); // Object;
        console.log(Array.isArray(list)); // false
    ```
2. 通过Set实例化的对象常用的属性和方法
    - 方法：add(value)  向set结构添加成员，如有重复， 会被过滤掉; 注意:引用类型数据，只要引用地址是唯一的，就不会被过滤掉。返回值：返回实例自身
    - 示例代码：
    ```javascript
        console.log(typeof list);
        console.log(Array.isArray(list));
        list.add('3'); // 添加字符串'3'
        console.log(list); // Set(4) {1, 2, 3, "3"}
        list.add('3'); // 再次添加字符串'3'
        console.log(list);// Set(4) {1, 2, 3, "3"}
        list.add({}); // 添加空对象
        console.log(list); // Set(5) {1, 2, 3, "3", {...}}
        list.add({}); // 再次添加空对象
        console.log(list);// Set(6) {1, 2, 3, "3", {...}, {...}}
        var obj = {};// 设置一个对象
        var obj2 = obj; // 引用对象
        list.add(obj); // 添加对象
        console.log(list);// // Set(7) {1, 2, 3, "3", {...}, {...}, {...}}
        list.add(obj2);// 再次添加同一个对象
        console.log(list);// // Set(7) {1, 2, 3, "3", {...}, {...}, {...}}
    ```
    - 属性：size 统计成员个数 返回统计个数
    - 示例代码：
    ```javascript
        let list = new Set([1, 2, 3, 3]);
        console.log(list.size); // 3
    ```
    - 方法： delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
    - 示例代码：
    ```javascript
        var list = new Set([1,3]);
        list.delete(2); // 返回false
        list.delete(3); // 返回true
    ```
    - 方法： has(value)：返回一个布尔值，表示该值是否为Set的成员。
    - 示例代码： 
    ```javascript
        var list = new Set([1, 2, 3]);
        list.has(1)// 返回true
        list.has('1')// 返回false
    ```
    - 方法： clear()：清除所有成员，没有返回值。
    - 示例代码： 
    ```javascript
        var list = new Set([1, 3]);
        list.clear()
        console.log(list);// Set(0) {...}
    ```
3. Set数据结构如何转化为Array?
    - `Array.from`方法可以将 `Set`结构转为数组
    - 示例代码： 
    ```javascript
        var list = new Set([1,3]);
        console.log(list);// Set(2) {1, 3}
        console.log(Array.from(list)); // [1, 3]
        console.log(list);// Set(2) {1, 3}
    ```
    - 根据Set特性, 结合`Array.from`用来数组去重
    - 封装代码
    ```javascript
        function unique(array) {
            return Array.from(new Set(array));
        }
        unique([1, 2, 3, 3]) // [1, 2, 3]
    ```
4. 遍历操作
    - Set 结构的实例有四个遍历方法，可以用于遍历成员
        - keys()：返回键名的遍历器
        - values()：返回键值的遍历器
        - entries()：返回键值对的遍历器
        - forEach()：使用回调函数遍历每个成员
    - keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
    - 示例代码：
    ```javascript
        let set = new Set(['red', 'green', 'blue']);

        for (let item of set.keys()) {
        console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.values()) {
        console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.entries()) {
        console.log(item);
        }
        // ["red", "red"]
        // ["green", "green"]
        // ["blue", "blue"]
    ```
    Set 结构的实例默认可遍历,可以直接用for...of循环遍历 Set。
    - forEach方法
        - Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
        - 示例代码：
        ```javascript
            set = new Set([1, 4, 9]);
            set.forEach((value, key) => console.log(key + ' : ' + value))
            // 1 : 1
            // 4 : 4
            // 9 : 9
        ```
5. 扩展运算符和Set
    - 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。2者组合使用，返回的一个真真确确的数组
    - 示例代码： 
    ```javascript
        [...new Set([1, 2, 3])] // 数组[1, 2, 3]
    ```
    