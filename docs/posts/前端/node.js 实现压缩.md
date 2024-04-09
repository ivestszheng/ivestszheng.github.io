---
title: node.js 实现压缩文件
date: 2023-04-16
abstract: 开发钉钉 H5 微应用中，不同于平常的 build，前端需要把文件打成压缩包上传至平台。同样的机制在另外一些阿里系产品也类似，例如浙里办、浙政钉。相较于一键执行脚本，手动压缩文件容易出错。我通过 node-archiver 这个包简单地实现了压缩，并在此向大家介绍。
tags:
- Node.js
---

# node.js 实现压缩文件

开发钉钉 H5 微应用中，不同于平常的`build`，前端需要把文件打成压缩包上传至平台。同样的机制在另外一些阿里系产品也类似，例如浙里办、浙政钉。相较于一键执行脚本，手动压缩文件容易出错。我通过`node-archiver`这个包简单地实现了压缩，并在此向大家介绍。

## 使用 node-archiver 压缩

### 安装依赖

```bash
npm install archiver -D
```

由于不会在生产环境使用，安装在`devDependencies`即可。

### 阅读官方示例，快速上手

```js
// require modules
const fs = require("fs");
const archiver = require("archiver");

// create a file to stream archive data to.
const output = fs.createWriteStream(__dirname + "/example.zip");
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed."
  );
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on("end", function () {
  console.log("Data has been drained");
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on("error", function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append a file from stream
const file1 = __dirname + "/file1.txt";
archive.append(fs.createReadStream(file1), { name: "file1.txt" });

// append a file from string
archive.append("string cheese!", { name: "file2.txt" });

// append a file from buffer
const buffer3 = Buffer.from("buff it!");
archive.append(buffer3, { name: "file3.txt" });

// append a file
archive.file("file1.txt", { name: "file4.txt" });

// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory("subdir/", "new-subdir");

// append files from a sub-directory, putting its contents at the root of archive
archive.directory("subdir/", false);

// append files from a glob pattern
archive.glob("file*.txt", { cwd: __dirname });

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
```

这个示例还是比较简洁的，做了以下几个动作：

1. 引入依赖以及文件处理系统 `fs` 模块。
2. 创建一个写入流并定义压缩等级（1-9）。
3. 发起各类监听，主要用于打印日志及在异常时结束进程。
4. 创建一个`pipe`(管道)，用以传输数据。
5. 通过`file`、`directory`、`buffer`等 `api`写入数据。实际使用中在，写入之前，可以通过`fs.readdirSync`或其它方法拿到数据。
6. 通过`finalize`关闭流。

### 个人完整代码实现

```js
// 项目根目录下 export-zip.js

const fs = require("fs"),
  archiver = require("archiver");

//这里是当前目录路径
const homedir = __dirname,
  // 日期充当hash值防止覆盖之前的压缩包
  timeString = new Date().toLocaleDateString().replace(/\//g, "-");

//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const directories = [],
  files = [];

fs.readdirSync(homedir).forEach((pathname) => {
  if (
    fs.statSync(pathname).isDirectory() &&
    ["public", "src"].includes(pathname)
  ) {
    directories.push(pathname);
  } else if (
    !fs.statSync(pathname).isDirectory() &&
    !pathname.includes(".zip")
  ) {
    files.push(pathname);
  }
});

// 默认在当前目录路径生成此文件 demo.当前日期.zip
const filedir = `demo.${timeString}.zip`;
const output = fs.createWriteStream(`${homedir}/${filedir}`);
const archive = archiver("zip", {
  zlib: { level: 9 }, // 设置压缩级别
});

archive.on("error", function (err) {
  throw err;
});

output.on("close", function () {
  console.log(`
      --------- ---------压缩完毕--------- ---------
      生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
      请在当前项目路径下寻找 ${filedir} 文件,系统路径为 ${homedir}\\${filedir}
      `);
});

archive.pipe(output);
for (let direcoty of directories) {
  archive.directory(direcoty, direcoty);
}
for (let file of files) {
  archive.file(file, { name: file });
}
archive.finalize();
```

### 添加指令

```json
// package.json
{
  "scripts": {
    "zip": "node export-zip.js"
  }
}
```

## 总结

整体而言，使用`node-archiver`压缩还是比较简单方便的。需要注意的是，我在开发时使用的是`windows`系统，并不清楚`fs`模块在其他系统上有无差异，具体在使用时请再做分析。

## 参考

1. [node-archiver 文档](https://github.com/archiverjs/node-archiver)
2. [前端 build 打包 dist 并压缩成 zip 最佳实践](https://mdnice.com/writing/09c4ede333bb48b2a3971f512456375f)
