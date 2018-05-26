#### 登录的一些事
1. 登录验证
    - 邮箱、手机号
    - 第三方登录（微信、微博）
2. 自动登录
    - 验证token
        - token的是一个能唯一标示用户身份的一个key token具有时效性。后台会每隔一段时间就会刷新。
        - 在登录页面，第一次登录时，输入正确的用户名和密码，请求后台登录。当登录成功后，返回token
            ```javascript
            this.axios.post('http://xxx.com/login', {
                username: 'jjk',
                password: '123456'
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
            // 根据登录接口（如果请求成功的话）后台返回大概如下的数据:
            {
                status_code: 0, // 状态码
                token: '324#F@#GSDVG#$%^TGVG@$FDF' // token

            }
            ```
        - 拿到token后，用cookie存起来 `setCookie('token', token)`， 下次登录时，先使用token登录，登录成功，重定向index页面，如果token失效了，提示‘请重新登录’
        - 登录（使用vuex）
            ```javascript
            this.$store.dispatch('LoginMessage', this.loginForm).then(() => {
                this.$router.push({ path: '/' }); //登录成功之后重定向到首页
            }).catch(err => {
                this.$message.error(err); //登录失败提示错误
            });

            // action
            LoginMessage({commit}, userInfo) {
                const email = userInfo.email.trim();
                return new Promise((resolve, reject) => {
                    loginByEmail(email, userInfo.password).then(response => {
                        const data = response.data;
                        Cookies.set('Token', response.data.token); //登录成功后将// token存储在cookie之中
                        commit('SET_TOKEN', data.token);
                        resolve();
                    }).catch(error => {
                        reject(error);
                    });
                });
            }
        - 如何使用token登录？
            - 跟后台商量好，把token放到请求头上headers上，后台会根据请求头中的token来判断，token是否过期。 例如： `headers['x-token'] = token`
             
3. 登录权限
     - 用户权限
        - 通过token去获取用户信息和权限
     - 登录失败跳转
     - 登录成功跳转，加载路由