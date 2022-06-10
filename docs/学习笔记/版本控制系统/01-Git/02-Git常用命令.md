| 命令名称                             | 作用           |
| ------------------------------------ | -------------- |
| git config --global user.name 用户名 | 设置用户签名   |
| git config --global user.email 邮箱  | 设置用户签名   |
| git init                             | 初始化本地库   |
| git status                           | 查看本地库状态 |
| git add 文件名                       | 添加到暂存区   |
| git commit -m '日志信息' 文件名      | 提交到本地库   |
| git reflog                           | 查看历史记录   |
| git reset --hard 版本号              | 版本穿梭       |



## 01-设置用户签名

```bash
git config --global user.name [用户名]
```

安装好`git`后要设置此项，否则之后操作会报错。

配置是否成功可查看`C:\Users\当前用户`下的`.gitconfig`文件。

```gitconfig
[user]
	name = 无声
	email = ivestszheng@qq.com
```



## 02-初始化本地库

```bash
git init
```

执行成功后会在目录下生成一个`.git`文件夹。



## 03-历史版本

```bash
git reflog  // 查看版本信息
git log // 查看版本详细信息
```



