#### 面向对象编程
- 通俗的解释
    - 作者有个‘精彩’的比喻：大学毕业后来到公司携带的行李物品没有一件一件拿过来的，而是将他们放在一个行李箱里，这样不论携带还是管理都方便一些。这就是面向过程和面向对象的区别，也同时揭露的面向对象的一大特性：封装！！
- 通过this添加属性和方法与在prototype中添加属性和方法的区别？
    - 通过this添加的属性和方法是在当前对象添加的，所以每次new一个新的对象时，this指向的属性和方法都会得到相应的创建（复制），而通过prototype的方式添加属性、方法是每个新建的对象通过prototype访问到的，不需要再次创建。下面通过例子在仔细区分一下：
    ```javascript
        // 创建一个Book类，这个Book类可以展示id、价格、书名
        var Book = function (id, price, name) {
            this.id = id
            this.price = price
            this.name = name
            this.display = function () {
                console.log('id:' + this.id + ' price:' + this.price + ' name:' + this.name)
            }
        }
        var book1 = new Book(1, 36, '你不知道的Javascript')
        var book2 = new Book(2, 50, 'Python编程大全')
        book1.display()
        book2.display()
    console.log(book1) // 打印 display : ƒ () id : 1 name : "你不知道的Javascript" price : 36
            console.log(book2) // 打印 display : ƒ () id : 2 name : "Python编程大全" price : 50
    ```
    - 比较发现，id、price、name都是每个对象独有的，唯有display方法是共有的。如果采用上面的的方式，每次new一个对象，display都会重新复制一次，这不划算。所以使用prototype的方式既可以避免这个问题
    ```javascript
       // 创建一个Book类，这个Book类可以展示id、价格、书名
        var Book = function (id, price, name) {
            this.id = id
            this.price = price
            this.name = name
            Book.prototype.display = function () {
                console.log('id:' + this.id + ' price:' + this.price + ' name:' + this.name)
            }
        }
        var book1 = new Book(1, 36, '你不知道的Javascript')
        var book2 = new Book(2, 50, 'Python编程大全')
        book1.display()
        book2.display() 
        console.log(book1) // 打印 id:1 name:"你不知道的Javascript" price:36
        console.log(book2)//打印 id:2 name:"Python编程大全" price:50
    ```
    - 可以看出 在prototype上添加display方法，所有对象都可以继承。
- 属性和方法
    - 由于Javascript的函数作用域的特性：外部无法访问内部的变量和方法。借由此特性可以创建类的私有变量和私有方法，而在类的内部通过this创建的属性和方法，是所有对象共用的，所以凡是通过this添加的变量和方法被称为公有属性和公有方法，而他们又可以将私有变量和私有方法暴露出去，这时，公有方法又叫做特权方法。在创建对象时，执行了特权方法，又被称为构造器（我的理解就是，初始化对象，有点构造的意思，所以该方法被称为构造器）
    ```javascript
        var Person = function () {
            // 私有变量_id
            var _id=  '007'
            // 私有方法_showName  
            var _showName = function () {
                console.log('邦德')
            }
            // 通过this添加showId方法 特权方法
            this.showId = function (){
                console.log(_id)
            }
            // 通过this添加showName方法 特权方法
            this.showName = function () {
                _showName()
            }
            // 通过this添加id 公有属性
            this.id = '008'
             //在创建对象时执行 构造器
            this.showName()
        }
        person = new Person()
        person.showId() // 成功访问到私有变量_id 007
        person.showName() // 成功访问到私有方法_showName
    ```
    -另外， 通过点语法给类添加的属性和方法是无法被实例化的对象使用的 如：
    ```javascript
    var Person = funtion () {
        console.log('create person')
    }
    Person.isMan = true
    Person.callName = function () {
        console.log('i am jjk')
    }
    var person = new Person()
    person.isMan // 报错
    person.callName() // 报错
    ```
    - 而这些方法被称为静态公有方法和静态公有属性。 怎么理解呢？所有实例对象都是从类‘演变’过来的，类就像公社一样。所以，所有附在类身上的属性和方法都是公有的。而静态就是不以时间地点而转移的意思，他就在那里，不离不弃。
    - 通过prototype给类添加属性和方法是可以被实例化的对象使用的，这些属性和方法被称为公有属性和公有方法

- 继承
    - 类式继承
        - 子类的原型 === 实例化的父类:`sub.prototype = new super()`
        ```javascript
        // 创建父类
        var Super = function () {
            this.isBook = true
            this.callName = function () {
                consle.log('i am a book')
            }
        }
        Super.name = 'js'
        // 创建子类
        var Sub = function () {
            console.log('i am child')
        }
        // 类式继承
        Sub.prototype = new Super();
        // 实例化
        var instance = new Sub();
        console.log(instance.isBook) // true
        console.log(instance.callName()) // i am a book
        console.log(instance.name) // undefind
        ```
        - 类式继承的缺点
            - 子类通过其原型继承实例化后的父类，父类的所有公有属性和方法都会被继承（多余的属性和方法都会被继承）。而且公有属性是引用类型，子类可能会改写
    - 构造函数继承
        -  call方法 `super.call(this, params)`
        ```javascript
        // 声明父类
        var Super = function (id) {
            this.books = ['css', 'javascript', 'html'];
            this.id = id;
        }
        // 添加公有方法
        Super.prototype.showBooks = function () {
            console.log(this.books);
        }
        // 声明子类
        var Sub = function (id) {
            Super.call(this, id);
        }
        // 创建实例
        var instance1 = new Sub(10);
        var instance2 = new Sub(11);
        instance1.books.push('node');
        console.log(instance1.books); // ['css', 'javascript', 'html', 'node']
        console.log(instance1.id); // 10
        console.log(instance2.books);  // ['css', 'javascript', 'html']
        console.log(instance2.id); 11

        instance1.showBooks(); // TypeError
        ```
        - 使用了call方法，将this的指向父类，子类变相继承了父类所有的公有属性和方法（这里没有体现公有方法）父类的原型方法并没有被子类继承，故调用出错！
        - 构造函数继承的缺点：
            - 实例化对象都会单独拥有共有属性，没有做到代码复用，开销大
    - 组合继承

        