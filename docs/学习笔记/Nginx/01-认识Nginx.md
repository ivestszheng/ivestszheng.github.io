## 01-什么是Nginx

Nginx是一个高性能的HTTP和反向代理服务器，特点是占有内存少，并发能力强，事实上Nginx的并发能力确实在同类型的网页服务器中表现较好。

Nginx专为性能优化而开发，性能是其最重要的考量，实现上非常注重效率，能经受高负载的考验，有报告表明能支持高达50,000个并发连接数。

### 反向代理

- 正向代理：

  在客户端（浏览器）配置代理服务器，通过代理服务器进行互联网访问。

- 反向代理：

  将请求你发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端。此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，**隐藏了真实服务器IP地址**。

![正向代理与反向代理](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514194924.jpg)

### 负载均衡

> 负载均衡是高可用网络基础架构的关键组件，通常用于将工作负载分布到多个服务器来提高网站、应用、数据库或其他服务的性能和可靠性。

一个没有负载均衡的 web 架构类似下面这样：

![没有负载均衡的架构](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514200748.png)

单个服务器解决不了，增加服务器的数量，然后**将请求分发到各个服务器上**，将原先请求集中到单个服务器上的情况改为将请求颁发到多个服务器上，将负载分发到不同的服务器，这就是所谓的负载均衡。

![负载均衡的架构](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514200840.jpg)

### 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。

![动静分离](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514201811.jpg)

## 02-Windows环境下Nginx安装

- 进入[官网](http://nginx.org/en/download.html)，下载稳定版并解压到指定目录

- 添加环境变量

  ![Nginx安装环境变量](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514214319.png)

- 运行`nginx.exe`文件，在浏览器输入`http://localhost`出现 `Welcome to nginx!`，说明启动成功。

  ![Nginx启动成功](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210514214527.png)

## 03-Nginx操作的常用命令

> 使用Nginx操作命令前提条件：必须进入Nginx目录

| 命令            | 含义            |
| --------------- | --------------- |
| nginx -v        | 查看nginx版本号 |
| nginx           | 启动nginx       |
| nginx -s stop   | 关闭nginx       |
| nginx -s reload | 重新加载nginx   |

## 04-配置全局命令

每次使用命令都要进入nginx目录太麻烦了，经查阅使用另一种方式——使用bat文件

>注意点：
>\- 你需要先配置环境变量来全局使用 nginx 这个命令
>\- nginx 的命令选项中，除了需要用到配置文件的 start stop reload 等控制命令在非安装路径下使用时会报错外（前言讲到了），其他都可直接使用。比如 nginx -v 查看版本

创建一个 bat 文件（我的是` nginxd.bat`），使用 bat 来运行 nginx 命令。创建了之后，就可以使用如下命令：

```bash
nginxd [-h,help] [-v,version] [start] [stop] [stop -a] [reload] [reopen] [find]
```

具体使用 `nginxd -h `查看，当然 nginxd 命令根据 bat 文件名来定的。文件位置随意，但是要能全局使用（即指定环境变量）。代码如下：

```
@echo off
if "%1"=="help" (goto help) else (if "%1"=="-h" goto help)
if "%1"=="version" (goto version) else (if "%1"=="-v" goto version)
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="reload" goto reload
if "%1"=="find" goto find
goto error

:help
nginx -v
echo Usage: nginxd [-h,help] [-v,version] [start] [stop] [stop -a] [reload] [reopen] [find]
echo=
echo Options:
echo   help,-h         : this help
echo   version,-v      : show current nginx version
echo   start           : start nginx master process
echo   stop            : stop the newest nginx master process
echo   stop -a         : stop all nginx master processes
echo   reload          : reload configuration
echo   find            : show the nginx master process list
echo=
exit /B

:version
nginx -v
exit /B

:start
start nginx -p D:\Environment\nginx-1.20.0
exit /B

:stop
if "%2"=="-a" (taskkill /F /IM nginx.exe) else (if "%2"=="" (nginx -s stop -p D:\Environment\nginx-1.20.0) else goto error)
exit /B

:reload
nginx -s reload -p D:\Environment\nginx-1.20.0
exit /B

:find
tasklist /fi "imagename eq nginx.exe"
exit /B

:error
echo nginxd: invalid option: "%1 %2"
echo=   
exit /B
```

## 05-Ngixn配置文件

nginx配置文件`conf\nginx.conf`组成

### 全局块

> 从配置文件开始到events块之间的内容，主要会设置一些影响nginx服务器整体运行的配置指令。

例如: `worker_process 1;`

worker_process的值越大，可以支持的并发处理量也越多。

### events块

> events块涉及的指令主要影响nginx服务器与用户的网线连接

例如：`worker_connections 1024;`

代表支持的最大连接数

### http块

> Nginx服务器配置中最频繁的部分

http块也可以包括http全局块、server块