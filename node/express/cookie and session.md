##### 什么是cookie？
在讨论cookie之前，需要知道“会话跟踪”这个概念。

1. 什么是会话 
- 客户端打开与服务器的连接发出请求到服务器响应客户端请求的全过程称之为会话 。

2. 什么是会话跟踪 
- 对同一个用户对服务器的连续的请求和接受响应的监视 。

3. 为什么需要会话跟踪 
- 浏览器与服务器之间的通信是通过HTTP协议进行通信的，而HTTP协议是”无状态”的协议，它不能保存客户的信息，即一次响应完成之后连接就断开了，下一次的请求需要重新连接，这样就需要判断是否是同一个用户，所以才应用会话跟踪技术来实现这种要求。

在程序中，“会话跟踪”是很重要的事情。由于http是无状态的协议（对于事物处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传），一旦数据交换完毕，客户端和服务器端的连接就会关闭，再次交换数据需要建立新的连接。

用户访问同一个站点就会重新加载所有数据，这样不利于交互。比如：用户A购买了一件商品放入购物车内，再次打开该网站购买商品时，服务器就无法判断用户A曾经是否已经将商品加入购物车。所以，“会话跟踪”就是在这种情况下，应运而生。

为了支持客户端与服务器之间的交互，我们就需要通过不同的技术交互存储状态，而这些不同的技术就是`cookie`和`session`了。`cookie`通过在客户端（通常是浏览器）记录信息确定用户身份，而`cession`通过在服务器端记录信息确定用户身份。回到我们的问题上：什么是`cookie`？

`cookie`译为“饼干”，是由W3C组织提出的，最早是由Netscape社区发展的一种机制，目前，所有主流浏览器都支持`cookie` 。前面提到，http是无状态协议，服务器单从网络连接上是无法知道客户身份的。怎么办呢？就给客户端们颁发一个通行证吧。每人一个，无论谁访问都必须携带自己的通行证。这样服务器就可以从通行证上确认客户身份了。这就是`cookie`的工作原理。

##### cookie的弊端
- 不安全
    - cookie是直接存放在浏览器里的。而用户可以直接修改cookie。
- 大小限制
    - 一般限制在4k左右

虽然cookie的弊端非常明显，那为什么还要使用cookie呢？答案就是：session是基于cookie存在的。

##### 理解session的机制
`session`是一种服务器端的机制，服务器使用一种类似于散列表的结构（也可能就是使用散列表）来保存信息。 

当程序需要为某个客户端的请求创建一个`session`的时候，服务器首先检查这个客户端的请求里是否已包含了一个`session`标识：称为`session id`，如果已包含一个`session id`则说明以前已经为此客户端创建过`session`，服务器就按照`session id`把这个`session`检索出来使用（如果检索不到，可能会新建一个），如果客户端请求不包含`session id`，则为此客户端创建一个`session`并且生成一个与此`session`相关联的`session id`，`session id`的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串，这个`session id`将被在本次响应中返回给客户端保存。 

而保存这个`session id`的方式一般都是采用`cookie`，这样在交互过程中,浏览器发送请求都会携带`cookie`。

简而言之：用户第一次访问服务器，服务器会返回一个`cookie`给客户端，这个`cookie`存储了`session_id`，当用户第二次访问服务器时，会携带这个`cookie`，服务器获取到`cookie`后，可以解析`cookie`，从而得到保存在`cookie`里面的`session_id`，根据`session_id`，获取到用户的相关信息。

现在重点看`express`是如何处理`cookie`和`session`的:

> 发送cookie

express本身可以发送cookie给客户端。
```js
const express = require('express');

const app = express();

app.use('/', function (req, res) {
    console.log(req.cookies);
    res.cookie('name', 'yyq');
    });
    res.send('hello world');
});
app.listen(8081);
```
运行文件后，打开chrome，找到Application-cookie:
![iamges](https://github.com/anth-angle/notes/master/images/mixin_02.png?raw=true)

res.cookie(name, value[, options]);
- 参数name 设置cookie名称
- 参数value 设置cookie的值
- options参数可选，path设置cookie的访问路径，maxAge设置cookie的过期时间
```
app.use('/', function (req, res) {
    res.cookie('name', 'yyq', {
        path: '/',
        maxAge: 3600 * 24
    });
    res.send('hello world');
});
```

读取cookie
`express`读`cookie`需要用到`cookie-parser`中间件