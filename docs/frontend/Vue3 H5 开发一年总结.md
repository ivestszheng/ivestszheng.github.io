## 前言

本文将阐述我个人从零开始构建一个 H5 项目以及在后续一年的持续迭代的过程中，做了哪些工作，踩了哪些坑，收获了什么思考。项目可在浙里办搜索**《青科汇》**。

## 技术选型

### 主要技术栈

- [Vue@3.2](https://link.juejin.cn/?target=mailto%3AVue%403.2)
- [TypeScript@5.4](https://link.juejin.cn/?target=mailto%3ATypeScript%405.4)
- [VueCli@5](https://cli.vuejs.org/zh/)
- [VantUi@3.5](https://link.juejin.cn/?target=mailto%3AVantUi%403.5)
- Pinia@2
- [Axios@0.27](https://link.juejin.cn/?target=mailto%3AAxios%400.27)

### 技术选型

#### Vue2 还是 Vue3

选择 Vue3 的理由如下：

- 更高效的 diff 算法。
- 更好的开发体验。
- 更有生命力的社区支持。

#### Vite 还是 Webpack

没有选用 Vite 的主要原因在于项目是通过 VueCli 构建的，我对这一套生态更加熟悉。加上当时了解到工期很紧，害怕使用 Vite 踩坑拖慢项目进度。不过处在2023年这一节点， VueCli 已经进入了维护模式很久了，官方推荐使用 VueCreate 构建项目。再加上 VueConf2022 上看到许多大公司已经将 Vite 用于生产环境，下一次构建项目时我会选择 VueCreate 与 Vite。

#### Pinia 还是 Vuex

毫无疑问是 Pinia，它非常轻量，使用起来相当简洁。而且尤大在一次掘金的直播中明确表示了 Pinia 就是下一代 Vuex，出于对作者的尊重所以没有改名。

#### Vant

老牌组件库，成熟的使用方案与优秀的文档，我个人开发移动端时最常用的组件库。

## 功能开发

### 拉平 RPC 模式下的开发体验

> RPC 服务器是指 Remote Procedure Call Protocol，中文释义为远程过程调用协议：一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。

由于平台审核要求，客户端要先将请求发送至 RPC 服务器，再由 RPC 服务器转发给我们自己的服务器。这导致生产环境与开发环境使用的网络请求库并不一致，提高了开发成本。为了降低开发时的心智负担，我针对我们自己的项目封装了一个请求方法，在不影响原有能力的基础上，调用者不再需要关心背后的具体实现，开发环境与生产环境的表现一致。封装的请求方法`request`及使用如下：

```typescript
// 封装的请求方法 request.ts
import mgop from "./mgop";
import axiosInstance from "./axiosInstance";

type RequestResponse = {
  code: number;
  data: any;
  message: string;
};

/**
 * 自定义的请求函数，用来拉平开发环境与平台体验，开发环境使用 axios，线上与测试环境使用 mgop 。
 * 由于后端响应失败时，平台自己的异常信息，导致无法拿到后端抛出的异常信息。所以与后端约定返回的数据结构永远包含
 * data,code,messge 三个字段，http 状态码永远为 200，真实的响应状态与信息通过响应体中的 code 与 message 来判断。
 * @param apis api 请求地址 dev 代表通过 axios 请求的路径，prod 代表通过 Mgop 请求的路径。
 * @param type 请求类型 get 或 post 。
 * @param config 配置项，会解构为 mgop 与 axios 的参数，主要用来添加请求体 data 。
 */
function request(
  apis: { dev: string; prod?: string },
  type: "get" | "post",
  config?: { data?: Record<string, any> }
): Promise<RequestResponse> {
  if(开发环境) {
      // 使用 axios
  } else {
      // 使用 mgop 
  }
}

export default request;
```

可以看到，使用 `request`这个方法之后，返回的始终是结构为 `RequestResponse` 的 `Promise` 对象。

### Hooks 复用有状态逻辑

### Typescript 为代码质量提供支持

## 页面样式

### 终端适配方案

### 防御性 CSS

## 调试方式

## 代码规范与门禁

### 代码规范

项目集成了 `eslint`、`prettier`、`stylelint`，`eslint`约束`js`语法，`stylelint`约束`css`语法，`prettier`统一代码格式。

### git 提交信息规范

集成了 `commitlint` ，参照 `Angular` 团队规范。为了便于

### 门禁 

## 写在最后