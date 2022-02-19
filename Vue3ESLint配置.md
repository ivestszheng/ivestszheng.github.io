# 添加ESLint支持

## 安装ESLint

- eslint只有开发阶段需要，因此添加到开发阶段的依赖中即可

```javascript
npm install eslint --save-dev
```

- 在VS Code中安装eslint插件，以在开发中自动进行eslint校验

## 配置ESLint

### 创建 .eslintrc.js 文件

### 添加基础配置

```javascript
module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 12,
  },
}
```

### 引入规则

为了规范团队成员代码格式，以及保持统一的代码风格，项目采用当前业界最火的 [Airbnb规范](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript) ，并引入代码风格管理工具 [Prettier](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2F) 。

#### eslint-plugin-vue

ESLint官方提供的Vue插件，可以检查 .vue文件中的语法错误

```javascript
npm install eslint-plugin-vue

// .eslintrc.js
...
extends: [
    'plugin:vue/vue3-recommended' // ++
]
...

```

#### eslint-config-airbnb-base

Airbnb基础规则的eslint插件

```javascript
// npm version > 5
npx install-peerdeps --dev eslint-config-airbnb-base

// .eslintrc.js
...
extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base', // ++
],
...

```

这个时候就应该可以看到一些项目原有代码的eslint报错信息了，如果没有的话，可以尝试重启编辑器的eslint服务。

#### eslint-plugin-prettier

本次项目不单独引入prettier，而是使用eslint插件将prettier作为eslint规则执行。

```javascript
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier

// .eslintrc.js
...
plugins: ['prettier'], // ++
rules: {
    'prettier/prettier': 'error', // ++
},
...

```

配置到此时，大概率会遇到 eslint 规则和 prettier 规则冲突的情况，比如下图。eslint告诉我们要使用单引号，但是改为单引号以后，prettier有告诉我们要使用双引号。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/299319db7ca34edda9143e7b5d357e18~tplv-k3u1fbpfcp-watermark.awebp)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cac8b254413040edad14f6d20355ad91~tplv-k3u1fbpfcp-watermark.awebp)

这时候就需要另一个eslint的插件 eslint-config-prettier，这个插件的作用是禁用所有与格式相关的eslint规则，也就是说把所有格式相关的校验都交给 prettier 处理。

```
npm install --save-dev eslint-config-prettier

// .eslintrc.js
...
plugins: ['prettier'],
extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended', // ++
],
rules: {
    'prettier/prettier': 'error',
},
...
```

plugin:prettier/recommended 的配置需要注意的是，一定要放在最后。因为extends中后引入的规则会覆盖前面的规则。

我们还可以在根目录新建 .prettierrc.js 文件自定义 prettier 规则，保存规则后，重启编辑器的eslint服务以更新编辑器读取的配置文件。

```js
// .prettierrc.js
module.exports = {
  singleQuote: true, // 使用单引号
}
```

到此，我们的ESLint基本配置结束了，后续需要时可以对规则进行调整。

作者：猿叨叨
链接：https://juejin.cn/post/6982529246480564238
来源：稀土掘金

