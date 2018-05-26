### keep-alive
- vue的内置组件
- props
    - include -- 字符串或者正则表达式。只有匹配的组件会被缓存
    - exclude -- 字符串或者正则表达式。任何匹配的组件都不会被缓存
- 匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。
- 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。