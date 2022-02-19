在开发阶段进行ESLint校验，效果是一件靠自觉的事。因此我们需要在代码提交前再次执行ESLint，加强校验力度以保证Git上得到的都是优美的代码。

我们本次需要用到的工具有两个：[husky](https://link.juejin.cn/?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F%23%2F) 和 [lint-staged](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fokonet%2Flint-staged%23readme)

# husky

它的主要作用就是关联git的钩子函数，在执行相关git hooks时进行自定义操作，比如在提交前执行eslint校验，提交时校验commit message等等。

## Install

husky官网推荐使用[自动初始化命令](https://link.juejin.cn?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F%23%2F%3Fid%3Dautomatic-recommended)，因为我们就按照官网推荐的方式进行安装，以npm为例

```js
// && 连接符在vscode中会报错，建议在windows的powershell执行
npx husky-init && npm install
```

执行完成后，项目根目录会多出来 .husky 文件夹。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6c5fb2670e343f5b820eeb9fbde93d1~tplv-k3u1fbpfcp-watermark.awebp)

内部的_文件夹我们在此无需关心，pre-commit文件便是在git提交前会执行的操作，如图。我们可以在当前目录创建钩子文件来完成我们想要的操作。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37e626b950694197a44b3e39b6e99d36~tplv-k3u1fbpfcp-watermark.awebp)

**需要注意的是，新版husky的配置方式做出了破坏性的改变，如果在使用过程中发现配置完以后没有生效，可以注意查看一下安装版本**

升级方式可以查看官方文档：[typicode.github.io/husky/#/?id…](https://link.juejin.cn?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F%23%2F%3Fid%3Dmigrate-from-v4-to-v7)

## 配置

我们想要在提交前执行eslint校验代码，因此修改husky的pre-commit文件即可。我们在文件中添加如下代码

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

eslint . --ext .js,.ts,.vue --fix #++ 校验所有的.js .ts .vue文件，并修复可自动修复的问题
git add . #++ 用于将自动修复后改变的文件添加到暂存区
exit 1 #++ 终止命令，用来测试钩子
```

此时提交代码执行commit是可以看到已经进入了pre-commit文件执行命令。但是会报错

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bd16f2e524344f79a2443f9c3bc85fe~tplv-k3u1fbpfcp-watermark.awebp)

这是因为此处执行shell命令，需要我们全局安装eslint。执行 npm install -g eslint。 安装完成后再次执行git commit，可以看到已经可以正常运行了

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15fd304a43504f30bfdad497dab43d42~tplv-k3u1fbpfcp-watermark.awebp)

## 错误处理

- 截图中第一个报错是书写错误，直接改掉就好。
- 第二个错误，是因为我们的ESLint中没有配置TS的解析器，导致ESLint不能正常识别并校验TS代码。解决它，我们安装 @typescript-eslint/parser，并修改ESLint配置即可。

```
npm install @typescript-eslint/parser --save-dev
 
// .eslintrc.js
...
parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser', // ++
},
...
```

- 第三个错误，它说的是我们引入的vite和@vitejs/plugin-vue两个包在 package.json 中应该是dependencies而不是devDependencies依赖。这个错误是因为airbnb-base规则设置了不允许引入开发依赖包，但是很明显我们不应该修改这两个框架生成的依赖结构。那我们看一下[airbnb关于这条规则的定义](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript%2Fblob%2Fmaster%2Fpackages%2Feslint-config-airbnb-base%2Frules%2Fimports.js%23L71)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee596b29bb5b49f987f2bf092970595e~tplv-k3u1fbpfcp-watermark.awebp) 可以看到，airbnb对这条规格做了列外处理，那就很好办了，我们只需要在它的基础上，添加上上面报错的两个包。

在eslint中添加如下规则：

```js
// .eslintrc.js
...
rules: {
    ...
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          ... // 保持airbnb-base中的规则不变
          '**vite**', // ++
          '**@vitejs**', // ++
        ],
        optionalDependencies: false,
      },
    ],
}
...
```

修改完上述错误后，我们去掉 .husky/pre-commit 文件中 exit 1 这行代码，再次执行提交操作，可以看到，已经可以提交成功了。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b0d684b84f49fb9bc3e2c11d374f49~tplv-k3u1fbpfcp-watermark.awebp)

## 思考

通过配置husky，我们已经实现了在提交前对代码进行检查。但是eslint配置的是 eslint . --ext .js,.ts,.vue --fix，检查所有的js、ts、vue文件，随着项目代码越来越多，每次提交前校验所有代码显然是不现实的。所以需要一个办法每次只检查新增或修改的文件。

这就需要开头提到的第二个工具来祝我们一臂之力了。

# lint-staged

lint-staged的作用就是对暂存区的文件执行lint，可以让我们每次提交时只校验自己修改的文件。

```
npm install lint-staged --save-dev
```

## 配置lint-staged

安装完成后，在package.json文件中添加lint-staged的配置

```json
// package.json
...
"scripts": {
    ...
    "lint-staged": "lint-staged"
},
"lint-staged": {
    // 校验暂存区的ts、js、vue文件
    "*.{ts,js,vue}": [
      "eslint --fix",
      "git add ."
    ]
}
```

添加scripts里的lint-staged命令，是因为不建议全局安装lint-staged，以防在其他同学电脑上没有全局安装导致运行报错。

## 修改husky

添加lint-staged配置后，husky就不在需要直接调用eslint了。修改pre-commit文件如下：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# eslint . --ext .js,.ts,.vue --fix
# git add .
# exit 1
npm run lint-staged
```

lint-staged配置后，我们不再需要配置husky时全局安装的eslint，因为lint-staged可以检测项目里局部安装的脚本。同时，不建议全局安装脚本，原因同上。

# 测试

到此，提交阶段对代码执行lint需要的配置我们已经完成了。再次提交代码测试，可以看到commit后执行的命令已经变成了lint-staged。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61d2e4bd840d499dba21ed646ca35558~tplv-k3u1fbpfcp-watermark.awebp)
