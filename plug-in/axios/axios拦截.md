### interceptor
- 拦截器的作用是在请求或响应被 then 或 catch 处理前拦截它们。
```javascript
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
```
- interceptor必须在请求前设置才有效。

- 直接为axios全局对象创建interceptor，会导致全局的axios发出的请求或接收的响应都会被拦截到，可以使用axios.create()来创建单独的axios实例。
```javascript
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```