### 从函数说起
1. 我们一般书写函数的形式：
```javascript
function checkName () {
    // 验证姓名
}
function checkEmail () {
    // 验证邮箱
}
function checkPassWord () {
    // 验证密码
}
```
这种书写方式，其实是在全局创建变量
```javascript
var checkName = function () {
    // 验证姓名
}
var checkEmail = function () {
    // 验证邮箱
}
var checkPassWord = function () {
    // 验证密码
}
```
 - 从功能上来说，没有任何问题（即使创建了全局变量）。全局变量的问题在于：你的JavaScript应用程序和web页面上的所有代码都共享了这些全局变量，他们在同一个全局命名空间，所以当程序的两个不同部分定义同名但不同作用的全局变量的时候，命名冲突在所难免。
-  把函数放入一个变量里保存，减少覆盖或被覆盖的风险
```javascript
var checkObject = {
    checkName: function () {
        // 验证姓名
    },
    checkEmail: function () {
        // 验证邮箱
    },
    checkPassWord: function () {
        // 验证密码
    }
}
```
将所有的函数作为checkObject对象的方法，这样我们在全局只申明了一个变量，使用也很简单：`checkObject.checkName()`
有没有想过，别人想要使用你写的对象方法时，会造成什么后果？
由于引用的是同一个对象，对同一个对象进行操作，很可能会造成不可预期的bug，为了避免这种情况：我们需要确认每个人使用的checkObject对象是唯一的，如何实现呢？
```javascript
// 函数也是对象
var checkObject = function () {
    return {
        checkName: function () {
            // 验证姓名
        },
        checkEmail: function () {
            // 验证邮箱
        },
        checkPassWord: function () {
            // 验证密码
        }
    }
}
```
- 每次调用checkObject时，都返回一个新的对象，这样每个人在使用时互不影响
```javascript
var a = checkObject();
a.checkEmail();
```
在上面创建的a对象和checkObject对象其实没有任何关系（返回的对象本身就与checkObject对象无关，它只是起到一个容器的作用），所以还需要对其改造，使用类的方式
```javascript
var CheckObject = function () {
    this.checkName = function () {
        // 验证姓名
    }
    this.checkEmail = function () {
        // 验证邮箱
    }
    this.checkPassWord = function () {
        // 验证密码
    }
}
```
- 这样写的好处就是，谁调用了，this就指向谁
```javascript
var a = new CheckObject();
a.checkName();
```
- 我们把所有方法都放在checkObject函数内部，每次new一个对象的时候，新创建的对象都会对类的this上的属性进行复制，所以新创建的对象都会有自己的一套方法。当要创建n个新对象时，也会复制n次，这个并不实际，还需要处理：
```javascript
var CheckObject = function () { 
    CheckObject.prototype.checkName = function () {
        // 验证姓名
    }
    CheckObject.prototype.checkEmail = function () {
        // 验证邮箱
    }
    CheckObject.prototype.checkPassWord = function () {
        // 验证邮箱
    }
}
```
- 这样创建对象实例的时候，创建出来的新对象所拥有的方法就都是一个了。因为他们都要依赖prototype原型依次寻找，而找到的方法都是同一个。简化一下代码：
```javascript
var CheckObject = function () { 
    CheckObject.prototype = {
        checkName: function () {
            // 验证姓名
        },
        checkEmail: function () {
            // 验证邮箱
        },
        checkPassWord: function () {
            // 验证密码
        }
    } 
}
```
- 上面2种方式是有区别的，一个是在以已有的prototype上添加属性，一个是直接创建一个prototype对象。2者不能混用。

2. 链式调用
上面的代码中，要调用方法只需：
```javascript
var a = new CheckObject();
a.checkName()
a.checkEmail()
a.checkPassWord()
```
调用了3个方法，对a对象书写了3遍，这是可以避免的，该如何避免呢？`this`！！在申明的每个方法末尾处将当前对象返回，而`this`指向的就是当前对象。于是，可以这样：
```javascript
var CheckObject = function () { 
    CheckObject.prototype = {
        checkName: function () {
            // 验证姓名
            return this
        },
        checkEmail: function () {
            // 验证邮箱
            return this
        },
        checkPassWord: function () {
            // 验证密码
            return this
        }
    } 
}
```
现在我们就可以链式调用方法了
```javascript
var a = new CheckObject()
a.checkName().checkEmail().checkPassWord()
```
3. 终极写法
- 我们知道所有函数的父亲都是Function,所以写成这样：
```javascript
Function.prototype.checkName = function () {
    console.log('checkName')
}
// 调用的时候
var func = new Function()
func.checkName();
```
- 但这样会有个问题： 别人创建的函数也会checkName这个方法，造成了不必要的开销。如果在Function.prototype上新建一个对象，这个对象统一用于添加公共方法，通过这个对象去调用公共方法就避免了这个问题
```javascript
Function.prototype.addMethods = function (name, fn) {
    this[name] = fn
}
// 如果我们要添加邮箱验证方法
var methods = new Function()
methods.addMethods('checkEmail', function () {
    console.log('check email')
})
methods.checkEmail()
// 如果我们要添加姓名验证方法
var methods = new Function()
methods.addMethods('checkName', function () {
    console.log('check name')
})
methods.checkName()
// 这样写还是有点麻烦,如何链式调用addMethods方法以及如何链式调用公共方法？
Function.prototype.addMethods = function (name, fn) { 
    this[name] = fn
    return this
}
var methods = new Function()
methods.addMethods('checkEmail', function () {
    console.log('check email')
    return this
}).addMethods('checkName', function () { 
    console.log('check name') 
    return this 
})
methods.checkName().checkEmail()
```
 - 上面是函数式调用，稍微修改下，变为类式调用
 ```javascript
Function.prototype.addMethods = function (name, fn) { 
    // this指的是addMethods
    this.prototype[name] = fn
    return this
}
var methods = new Function()
methods.addMethods('checkEmail', function () {
    console.log('check email')
    return this
}).addMethods('checkName', function () { 
    console.log('check name') 
    return this 
})
var m = new methods()
m.checkName().checkEmail()                                                                                  ```
                                                                                                      