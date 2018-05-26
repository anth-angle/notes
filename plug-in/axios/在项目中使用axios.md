#### 在vue项目中使用axios
1. 可以在main.js入口文件引入axios
```javascript
    // main.js
    import axios from 'axios';

    // 设置axios的默认项（所有请求默认使用）
    // 设置baseUrl
    axios.defaults.baseURL = 'http://www.x-bull.com';
    // 设置timeout
    axios.defaults.baseURL = 5000;
    // 设置请求头
    axios.defaults.headers = {'Authorization': `token`};
    
    // axios拦截
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
2. 独立出一个文件，在引入到main.js即可，这样方便管理
