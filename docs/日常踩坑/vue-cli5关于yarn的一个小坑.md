# vue-cli5关于yarn的一个小坑

## 问题

昨天有小伙伴下了我的 DEMO之后反映运行报错。

![小伙伴反映报错](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/0.png)

因为这个项目环境我测试过许多次，不管是`npm`还是`yarn`都能正常运行，所以听到运行报错时下意识地就认为是依赖没有安装成功的问题，建议他配一个淘宝镜像。

当他把报错贴上来的时候，我发现原来真不是依赖的问题，`vue-cli`抛出了错误如下：

```bash
Error: The project seems to require yarn but it's not installed.
```

## 解决方案

报错信息已经把原因说的很清楚了：`这个项目可能需要yarn但是它并没有安装`。解决方案就我所知有两种：

1. 安装`yarn`
2. 删掉`yarn.lock`文件

亲测这两种方法都能解决问题，但是正常的多人协作项目肯定不能用第二种方法，真要这么干了就等着被批斗吧。

## 原因

问题很快就解决了，但是令我疑惑的是，同样的依赖如果没有`yarn.lock`文件项目运行项目完全是 OK 的。这说明压根不需要`yarn`，那为什么`vue-cli`会认为需要`yarn`呢？

定位后看到错误是`node_modules\@vue\cli-shared-utils\lib\env.js`中的`checkYarn`方法抛出的，具体代码如下：

```js
exports.hasYarn = () => {
  if (process.env.VUE_CLI_TEST) {
    return true
  }
  if (_hasYarn != null) {
    return _hasYarn
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return (_hasYarn = true)
  } catch (e) {
    return (_hasYarn = false)
  }
}

exports.hasProjectYarn = (cwd) => {
  if (_yarnProjects.has(cwd)) {
    return checkYarn(_yarnProjects.get(cwd))
  }

  const lockFile = path.join(cwd, 'yarn.lock')
  const result = fs.existsSync(lockFile)
  _yarnProjects.set(cwd, result)
  return checkYarn(result)
}

function checkYarn (result) {
  if (result && !exports.hasYarn()) throw new Error(`The project seems to require yarn but it's not installed.`)
  return result
}
```

简单来说，在`development`环境下，调用`checkYarn`方法后：

1. 先执行`hasProjectYarn`方法，通过`path.join`生成一个目标路径，例如：`D:\GitCode\vue2-typescript-starter\yarn.lock`。
2. 再通过`fs.existsSync`方法来检测这个路径是否真实存在。若存在，则调用`hasYarn`方法。
3. `hasYarn`方法检查是否安装了`yarn`，若没有，则抛出错误`The project seems to require yarn but it's not installed.`中断程序。

大致过程便是如此，如果我对细节理解不到位，还望指正。
