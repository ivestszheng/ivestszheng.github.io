---
title: 跨域通信之postMessage
date: 2022-10-19
abstract: postMessage 是什么？通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号，以及主机 (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。
---

# 跨域通信之 postMessage

## postMessage 是什么？

window.postMessage() 方法可以安全地实现跨源通信。

通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号，以及主机 (两个页面的模数 Document.domain 设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

## 语法

> otherWindow.postMessage(message, targetOrigin, [transfer]);

`otherWindow`
其他窗口的一个引用，比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象、或者是命名过或数值索引的 window.frames (en-US)。

`message`
将要发送到其他 window 的数据。它将会被结构化克隆算法 (en-US)序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。

`targetOrigin`
通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串"\*"（表示无限制）或者一个 URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 targetOrigin 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。

`transfer` _可选_
是一串和 message 同时传递的 Transferable 对象。这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

## 注意事项

1. 始终使用 origin 和 source 属性验证发件人的身份，且在身份认证后始终验证接收到的消息的语法。使用 postMessage 将数据发送到其他窗口时，始终指定精确的目标 origin，而不是 \*。(如果你的页面安装了 Vue.js devtools，应当可以看到这个插件也会发送消息)
2. 只有在添加了 message 监听器后才会接收到发来的消息，所以应当确保通信双方都具备了收发消息的能力后再发送消息。在本文提供的案例中，流程如下图所示：

![流程图](https://raw.githubusercontent.com/ivestszheng/images-store/18e3d31d8fce44880ff46b7c46662c8e2c588185/img/image-20221019220007387.png)

## 使用案例

[codepen](https://codepen.io/ivestszheng/pen/GRdaXEd)

```html
<body>
  <p>这是发送消息页面</p>
  <button onclick="handleOnClick()">打开接受信息的页面</button>
  <input type="text" id="input" />
  <p>接收到的消息</p>
  <p id="content"></p>
  <p></p>
</body>
```

```js
const oInput = document.querySelector("#input");
let targetWindow = null;

function handleOnClick() {
  openNewWindow();
}

window.addEventListener("message", (e) => {
  if (e.data.msg === "加载完成") {
    const date = new Date();
    document.querySelector("#content").innerText = `${JSON.stringify(
      e.data.msg
    )} ${date.getTime()}`;
    targetWindow.postMessage({ msg: "我知道你加载完成了" }, "*");
  }
});

function openNewWindow() {
  targetWindow = window.open("", "_blank", "height=500,width=500,top=0,left=0");

  targetWindow.onload = () => {
    const div = document.createElement("div");
    div.id = "target";
    targetWindow.document.body.appendChild(div);
    const oTarget = targetWindow.document.querySelector("#target");

    targetWindow.addEventListener("message", (e) => {
      console.log("接收数据：", e.data.msg);
      oTarget.innerText = `接收到数据：${e.data.msg}`;
    });

    targetWindow.opener.postMessage({ msg: "加载完成" }, "*");
  };
}

window.onload = () => {
  oInput.addEventListener("input", () => {
    console.log("inputChange", oInput.value);
    // 假设跟 iframe 通信，要使用 iframe 对象的 contentWindow
    if (targetWindow) {
      targetWindow.postMessage({ msg: oInput.value }, "*");
    }
  });
};
```
