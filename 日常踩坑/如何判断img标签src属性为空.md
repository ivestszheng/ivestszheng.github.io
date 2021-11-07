假设页面中有一个 `<img src="" id="target">`

在控制台输入 `document.querySelector('#target').src` 得到的结果不会为空

而是 `window.location.origin + window.location.pathname`

