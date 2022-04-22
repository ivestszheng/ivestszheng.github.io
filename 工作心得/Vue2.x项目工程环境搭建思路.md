## 前言

去年年底，公司的前端团队确立了代码规范。然而离开了实际项目环境加上普遍紧张的开发周期，规范终究是纸上谈兵。鉴于此，一位同事去开发脚手架。我也花了几天时间搭建了一套 Vue2.x 的工程环境尝试给予一些支持，~~虽然后面看来对他的实际帮助不大。~~

由于公司目前使用 Vue3 的项目几乎没有，所以选择搭建 Vue2 的模板。我希望这个模板能强制代码规范、提交规范；保证代码的可靠性的同时提升开发效率；并且为未来可能升级 Vue3 提供一些便利。 

本文将主要描述我在搭建环境与封装的整体思路，不会详细描述搭建细节，需要具体实现的小伙伴可以查看文末的参考。但是我不建议照搬这些操作，由于版本的差异会导致踩奇奇怪怪的坑，最可靠的方法的仍是直接去查阅官方文档。

## 技术栈

- 编程语言：TypeScript 4.x + Javascript
- 构建工具： Vue Cli 5
- 前端框架： Vue2.x + Vue/CompositionApi
- 路由工具：Vue Router 3.x
- 状态管理：Pinia 2.x
- CSS 预编译：Less
- HTTP 工具：Axios
- Git Hook 工具：Husky + LintStaged
- 代码规范：Eslint + Prettier + EditorConfig
- 提交规范：Commitizen + Commitlint
- 单元测试：Jest
- 依赖检测工具：Depcheck

## 架构搭建

### 使用 Vue Cli 快速初始化项目雏形

使用 Vue Cli 快速搭建基础模板，选择 `vue-ts` ，其他的例如 Eslint 等由于要修改配置与封装，我更倾向于自己看文档手动添加。

### 修改 vue.config.js 文件

```javascript
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 配置别名后需要重启项目
    config.resolve.alias.set('@', path.resolve('src'));
  },
  publicPath: './',
});
```

由于我对 webpack 缺乏系统的认知，所以只是做了最简单的配置。`publicPath`解决的是打包后资源文件路径错误的问题，`chainWebpack`中设置了路径别名。之前我看网上的方法增加了一个`webpack.config.js`将别名配置在里面，我认为这样不好，`vue.config.js`与`webpack.config.js`本就在功能上有很大的重复，完全没有必要如此。

### 规范目录结构

```
├── public/
└── src/
    ├── assets/                    // 静态资源目录
    ├── api/                       // 接口方法目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
// 配置文件放在 src 同级目录下
```

额外说下`public`和`assets`的区别：打包后`public`文件夹中的文件会原封不动地放到`dist`文件夹中，`assets`文件夹中的文件会被合并到一个文件中。图片、字体等静态资源我会放在`assets`，第三方程序则是放在`public`。

### Vue Router

在路由文件中，登录页、首页、`Layout`组件我会直接引入，其他的页面则使用按需加载。

### 状态管理工具 Pinia

简单介绍，Pinia 是新一代 Vuex ,3月份尤大直播时说过不会有 Vuex5 了。相较于 vuex4，使用更加简单。但是我碰到了个坑，在我有一个同事的电脑上项目中的 Pinia 会报错，但是其他人的则没有问题，初步猜测跟版本号有关系。

###  HTTP 工具 Axios

纠结了一下午如何去封装，看了许多封装的思路，最后还是选择直接从`vue-element-admin`中抄了一份。

```js
// utils/request
import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  // do something before request is sent
  (config) => config,
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const { data } = response;

    return data;
  },
  (error) => {
    console.log(`err${error}`); // for debug

    return Promise.reject(error);
  },
);

export default service;
```

`api`则单独抽一个文件夹出来 ，不要全部放在一个文件与注册到原型链中。否则如果有几百个接口会不好维护，并且这样搞原型链也太大了。

另外，我以前会单独封装`post`和`get`方法，没有必要这样，`axios`本身就有相应的`api`了，我的用法如下：

```typescript
// api/example
import request from '@/utils/request';

export function useAxiosGet(param1: unknown, param2: unknown) {
  return request.get('/banner', { params: { param1, param2 } });
}

export function useAxiosPost(data: unknown) {
  return request.post('/banner', data);
}
```

###  CSS 预编译器 Less

Less/Sass/Stylus 都差不多，sass 会有版本号的问题，所以同事更倾向于使用 less 。

### Vue/CompositionApi

`composition-api`会提高代码的聚合度，在一些场景下非常好用。另外如果有未来升级 Vue3 的打算，也可以使用。

## 代码规范

### EditorConfig

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。我主要是需要这个来配置换行符，由于公司使用的都是 windows ，所以换行符设置`crlf`。

### ESLint + Prettier

我在配置这两者上花费了相当多的时间。~~我看到许多项目会二者都全部配上，但在实际体验后说句真心话，我认为单纯的 ESLint 已经够用了。毕竟二者本质上也只是在`rules`上的些许不同而已，引入它们其实只是想解决团队成员代码风格差异带来的维护困难。~~ （2022-4-12 修改）单纯用 ESLint 也不是不行，但 prettier 可以为 ESLint 补充一些规则，例如 css 的格式化。我的 ESLint 配置如下：

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      webpack: {
        // 此处config对应webpack.config.js的路径，我这个路径是vue-cli3默认的路径
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'res', // for Express responses
          'item', // for Express responses
          'state', // for vuex state 解决assignment to property of function parameter 'state'
          'config',
          'args', // for vue.config.js change options.title
        ],
      },
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    complexity: [
      'error',
      {
        max: 40,
      },
    ],
    'linebreak-style': 0,
  },
};
```

可以看到我的配置是采用airbnb风格的规则以及一些官方推荐的风格，尽管我如此配置，但不代表我完全喜欢这些规则。例如在我看来`++`与`&&`运算符非常简洁却不被推荐；`no-param-reassign`这条规则影响了我处理接口拿到数据。具体在配置规则时，还是要从团队的角度出发，考虑如何减少维护成本。

### Husky + LintStaged

> [husky](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fhusky) —— Git Hook 工具，可以设置在 git 各个阶段（`pre-commit`、`commit-msg`、`pre-push` 等）触发我们的命令。
> [lint-staged](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fokonet%2Flint-staged) —— 在 git 暂存的文件上运行 linters。

在编码时，ESLint 和 Prettier，会对我们写的代码进行实时校验，在一定程度上能有效规范我们写的代码，但可能会有人觉得这些限制很麻烦，选择无视这些提示。

所以，我们还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，我们需要用到 Git Hook，在本地执行 `git commit` 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 `eslint --fix`），如果这些代码没通过 ESLint 规则校验，则禁止提交。

## 提交规范

`git commit`的描述信息精准，在后期维护和 Bug 处理时会变得有据可查。我选用的是社区最流行、最知名、最受认可的 Angular 团队提交规范。

### Commitizen

初次接触提交规范的同学可能会头晕，不知道怎么写。Commitizen 解决的就是这个问题，项目中通过`npx cz`命令，跟着提示走就可以完成一次规范的提交。需要自定义配置提交，修改`.cz-config.js`文件即可。我的配置如下：

```js
module.exports = {
    // type 类型（定义之后，可通过上下键选择）
    types: [
        { value: 'feat', name: 'feat:     新增功能' },
        { value: 'fix', name: 'fix:      修复 bug' },
        { value: 'docs', name: 'docs:     文档变更' },
        { value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
        { value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
        { value: 'perf', name: 'perf:     性能优化' },
        { value: 'test', name: 'test:     添加、修改测试用例' },
        { value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
        { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
        { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
        { value: 'revert', name: 'revert:   回滚 commit' }
    ],

    // scope 类型（定义之后，可通过上下键选择）
    scopes: [
        ['components', '组件相关'],
        ['hooks', 'hook 相关'],
        ['utils', 'utils 相关'],
        ['element-ui', '对 element-ui 的调整'],
        ['styles', '样式相关'],
        ['deps', '项目依赖'],
        ['auth', '对 auth 修改'],
        ['other', '其他修改'],
        // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
        ['custom', '以上都不是？我要自定义']
    ].map(([value, description]) => {
        return {
            value,
            name: `${value.padEnd(30)} (${description})`
        }
    }),

    // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
    // allowCustomScopes: true,

    // allowTicketNumber: false,
    // isTicketNumberRequired: false,
    // ticketNumberPrefix: 'TICKET-',
    // ticketNumberRegExp: '\\d{1,5}',


    // 针对每一个 type 去定义对应的 scopes，例如 fix
    /*
    scopeOverrides: {
      fix: [
        { name: 'merge' },
        { name: 'style' },
        { name: 'e2eTest' },
        { name: 'unitTest' }
      ]
    },
    */

    // 交互提示信息
    messages: {
        type: '确保本次提交遵循 Angular 规范！\n选择你要提交的类型：',
        scope: '\n选择一个 scope（可选）：',
        // 选择 scope: custom 时会出下面的提示
        customScope: '请输入自定义的 scope：',
        subject: '填写简短精炼的变更描述：\n',
        body:
            '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
        breaking: '列举非兼容性重大的变更（可选）：\n',
        footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
        confirmCommit: '确认提交？'
    },

    // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
    allowBreakingChanges: ['feat', 'fix'],

    // 跳过要询问的步骤
    skipQuestions: ['body', 'footer'],

    // subject 限制长度
    subjectLimit: 100,
    breaklineChar: '|', // 支持 body 和 footer
    // footerPrefix : 'ISSUES CLOSED:'
    // askForBreakingChangeFirst : true,
}
```

### CommitLint

尽管加入了 Commitizen 降低了规范提交的难度，但总是架不住有人我行我素。CommitLint 可以限制只让符合 Angular 规范的 commit 通过。

## 单元测试

选择了目前流行的 Jest 作为测试框架。目前还没有实践，打算之后补上。不得不说，看了网上非常多的文章讲单测只是单纯讲 api ，我觉得意义不大，就算学会了那些也只是有术无道。单测真正的难点在于到底在于测试点的选择与颗粒度的把握，分享一篇前两天看的文章：[掘金 - 《前端单测，为什么不要测 “实现细节”？》](https://juejin.cn/post/7079232962025226277)。该文的作者主张多关注`prosp`以及`render`出来的内容。

## 遇到的问题

1. Pinia 在某位同事电脑上报错
2. 同样在某位同事电脑上热部署相当慢，要10s左右的时间，而我自己基本上是秒更新。

目前猜测这两个问题都是由版本号问题导致的，准备忙完手上的项目就去好好找找原因。

## 最后

这篇文章早在一个月前就想写了，但是一来最近总是加班（~~周末又摸鱼打游戏~~），二是觉得搭好的环境总得上项目实际用一下才行。模板我已经放在仓库 [ivestszheng](https://github.com/ivestszheng)/**[vue2-typescript-starter](https://github.com/ivestszheng/vue2-typescript-starter)**，感兴趣的小伙伴可以查看，也希望能给我提出一些改进的建议。

## 参考

1. [掘金 - 从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622)