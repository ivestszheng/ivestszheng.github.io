# MockJS

- 生成随机数据语法
- 拦截请求
- Vue结合mockjs实现新闻管理案例

## 01-什么是mockjs

[文档](https://www.kancloud.cn/sophie_u/mockjs/532225)

[示例](http://mockjs.com/examples.html)

## 02-为什么使用mockjs

在工作开发中，如果后端接口还没未开发完成，为了不影响工作效率，我们自己手动模拟接口返回随机数据。

1. 采用json数据模拟，生成数据繁琐，且有局限性，没办法达到增删改查。
2. 采用mockjs模拟数据，可以模拟各种场景生成接口，并且随机生成所需数据，还可以对数据进行增删改查。

## 03-使用mockjs

通过vue-cli创建基本项目

- 在项目中安装mockjs

  ```bash
  npm install mockjs
  ```

- 在项目中新建mock文件夹，新建index.js

  ```js
  // 引入mock模块
  import Mock from 'mockjs'
  ```

- 将mock文件在main.js中导入

## 04-mock语法

### 生成字符串

- 生成指定次数字符串

  ```js
  const data = Mock.mock({
      "string|4": "哎哟~"
  })
  ```

- 生成指定范围长度字符串

  ```js
  const data = Mock.mock({
      "string|1-8": "哎哟~"
  })
  ```

### 生成文本

- 生成一个随机字符串

  ```js
  const data = Mock.mock({
      string: '@cword'
  })
  ```

- 生成指定长度和范围

  ```js
  const data = Mock.mock({
      string: '@cword(1)',
      str: '@cword(10,15)'
  })
  ```

  ### 生成标题和句子

  - 生成标题和句子

    ```js
    const data = Mock.mock({
        title: '@ctitle',
        sentence: '@csentence'
    })
    ```

  - 生成指定长度的标题和句子

    ```js
    const data = Mock.mock({
        title: '@ctitle(8)',
        sentence: '@csentence(50)'
    })
    ```

  - 生成指定范围的标题和句子

    ```js
    const data = Mock.mock({
        title: '@ctitle(5,8)',
        sentence: '@csentence(50,100)'
    })
    ```

  ### 生成段落

  - 随机生成段落

    ```js
    const data = Mock.mock({
        content: '@cparagraph()'
    })
    ```

  ### 生成数字

  - 生成指定数字

    ```js
    const data = Mock.mock({
        'number|80': 1
    })
    ```

  - 生成范围数字

    ```js
    const data = Mock.mock({
        'number|1-999': 1
    })
    ```

  ### 生成增量id

  - 随机生成标识

    ```js
    const data = Mock.mock({
        id: '@increment()'
    })
    ```

  ### 生成姓名-地址-身份证号

  - 随机生成姓名-地址-身份证号

    ```js
    const data = Mock.mock({
        name: '@cname()',
        idCard: '@id()',
        address: '@city(true)'
    })
    ```

  ### 随机生成图片

  - 生成图片

    ```js
    const data = Mock.mock({
      img_url: "@image('300x250','#ff0000','#fff','gif','坤坤')"
    })
    ```

    参数1：图片大小

    ```json
    [
        '300x250', '250x250', '240x400' ...
    ]
    ```

    参数2：图片背景色

    参数3：图片前景色

    参数4：图片格式

    参数5：图片文字

  ### 生成时间

  - 生成随机时间

    ```js
    const data = Mock.mock({
      date: '@date()'
    })
    ```

  - 生成指定时间

    ```js
    const data = Mock.mock({
      date: '@date(yyyy-MM-dd hh:mm:ss)'
    })
    ```

  ### 指定数组返回的条数

  - 指定长度

    ```js
    const data = Mock.mock({
      'list|8': [
        {
          name: '@cname',
          address: '@city(true)',
          id: '@increment(1)'
        }
      ]
    })
    ```

  - 指定范围

    ```js
    const data = Mock.mock({
      'list|8-20': [
        {
          name: '@cname',
          address: '@city(true)',
          id: '@increment(1)'
        }
      ]
    })
    ```

## 05-mock拦截请求

### 定义get请求

```js
Mock.mock('/api/get/news', 'get', () => {
  return {
    status: 200,
    message: '获取新闻列表数据成功'
  }
})
```

### 定义post请求

```js
Mock.mock('/api/post/news', 'post', () => {
  return {
    status: 200,
    message: '添加新闻列表数据成功'
  }
})
```