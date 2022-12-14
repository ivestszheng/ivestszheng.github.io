# Vue3在浙里办的实践

## 观前提醒

本人并非浙里办工作人员，不保证内容完全准确，若开发中有疑问，请先阅读完钉钉群内所有开发文档，再咨询钉钉群相关“技术支持”人员。若还是无法解决，请在掘金文章下留言，勿直接私信本人。

## 前言

八月底曾在掘金发过一篇[《浙里办H5开发受苦记录》](https://juejin.cn/post/7136923056097722398)，简单阐述了一些浙里办对接相关的问题。由于当时没有发布应用，很多东西没有得到检验。因项目功能的扩展，项目整体后面进行了多次重构，我对一些工具库也进行了封装，遂决定重新总结一篇文章。本文将从以下几方面展开：

1. 浙里办H5开发前需知
2. 项目构建与技术选型
3. 浙里办对接过程中遇到的问题及解决方案
4. 项目一些需求的实现思路

### 浙里办H5开发前需知

### 章节概要

本章节主要阐述一些浙里办开发涉及到的基础概念。应用开发前的申请流程，本人并不清楚，不做介绍。、

### 基础概念介绍

#### 浙里办

浙里办是一款基于浙江政务服务网一体化平台能力的APP。我们开发的应用可以通过浙里办App、支护宝小程序及微信小程序访问。

#### IRS

[IRS](https://op-irs.zj.gov.cn/mobile/login?goto=/mobile)指浙江省一体化数字资源系统平台。应用申请流程走完后会拿到IRS账号，我们在IRS上进行应用（指前端包）的部署与发布以及RPC接口的管理与更新。

#### RPC

RPC服务器是指Remote Procedure Call Protocol，中文释义为远程过程调用协议：一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。

由于审核要求，浙里办客户端不直接请求服务器，通过Mgop(相关描述请见下文)将请求发送至RPC服务器，再转发给真实的服务器。

#### Mgop

Mgop指Npm上的包[@aligov/jssdk-mgop](https://www.npmjs.com/package/@aligov/jssdk-mgop)，提供请求RPC上API的能力，有外网[语雀文档](https://www.yuque.com/xiaoniaoge/run4dl/dge18k?)。

#### 单点登录组件

由于应用存在APP、微信、支付宝这三种环境，需要通过不同的单点登录组件获取登录态。目前提供三种组件：

1. 政务服务网个人用户单点登录：支持App、支付宝小程序、服务服务网PC，需配置回调地址，入参为ticket。

2. 政务服务网法人用户单点登录：支持App、政务服务网pc端，需配置回调地址。

3. ”浙里办“统一单点登录：支持微信浙里办小程序、支付宝小程序，不涉及配置回调地址，入参为ticketId，不能与上述ticket作为入参混用。

   **注：据群内”技术支持“描述，小程序拿到的票据始终为ticketId。但我实际开发过程中发现，九月时对接单点支付宝小程序获得的票据为ticketId，而自11月底起只能获取到ticket，且官方提供ssoTicket方法返回的ticketId始终为空。**

#### 票据

指ticket与ticketId，使用不同的单点登录时需要使用不同票据，不能混用。

## 项目构建与技术选型

### 章节概要

本章节主要介绍构建项目中对技术选型的一些思考。

### 项目整体结构

这里只展示我认为的重点部分，src 目录树如下图所示：

```
│  App.vue
│  main.ts
│  shims-vue.d.ts
│  
├─apis	// api 接口存放目录，按模块划分
│      
├─assets	// 图片等静态资源
│              
├─components	// 公共组件
│      
├─composables	//  组合式函数，利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。
│  │  useBuryingPoint.ts	// 对浙里办埋点的封装
│  │  useOss.ts	// 对阿里云OSS的封装
│  │  useSingleSignOn.ts	//  对浙里办单点登录的封装
│  │  useZwjsBridge.ts	//  对浙ZwjsBridge API的封装
│      
├─http	// 请求层
│      request.ts	// 对 axios 与 mgop 的集成
│      axiosInstance.ts	// axios 的实例
│      useMgop.ts	// 对 mgop 的二次封装
│      useCostomApis.ts	// 自定义的对 mgop 的拓展 api
│      
├─router	// 路由
│      
├─stores	// pinia 仓库，按模块划分
│  └─user	// 用户模块
│          
├─styles	// 样式存放目录
|
└─views		// 页面存放目录
```



### 技术栈

- [Vue@3.2](https://link.juejin.cn/?target=mailto%3AVue%403.2)
- [TypeScript@5.4](https://link.juejin.cn/?target=mailto%3ATypeScript%405.4)
- VueCli@5
- [VantUi@3.5](https://link.juejin.cn/?target=mailto%3AVantUi%403.5)
- Pinia@2
- [Axios@0.27](https://link.juejin.cn/?target=mailto%3AAxios%400.27)
- [zwjsbridge@1.1.0](https://link.juejin.cn/?target=mailto%3Azwjsbridge%401.1.0)
- [zwlog@1.0](https://link.juejin.cn/?target=mailto%3Azwlog%401.0)

### 技术选型

#### Vue2还是Vue3

由于这个项目一开始的定位是一个小项目，团队配置就是一个前端加一个前端，所以项目前端架构由我自己把控。团队的技术栈以Vue2为主，不过我个人会倾向使用Vue3，一来在Vue3中通过composabler的形式可以更好地进行代码复用，二来这对我个人的成长也更有帮助。不过最后能否使用Vue3还是要根据运行环境来决定，好在经过多方调查，最后确认可以上Vue3。

#### Vite还是Webpack

没有选用Vite的主要原因在于项目是通过VueCli构建的，我对这一套生态更加熟悉。加上当时了解到工期很紧，害怕使用Vite会遇到一些坑拖慢项目进度。不过现在VueCli已经进入了维护模式，加上VueConf2022上看到许多大公司已经将Vite用于生产环境，下一次构建项目时我会选择Vite。

#### Pinia还是Vuex

毫无疑问是Pinia，它非常轻量，使用起来相当简洁。而且尤大在一次掘金的直播中明确表示了Pinia就是下一代Vuex，出于对作者的尊重所以没有改名。

#### Aplus还是Zwlog

二者都是浙里办提供的埋点工具，浙里办官方更推荐使用新版的Zwlog。

#### Vant

老牌组件库，成熟的使用方案与优秀的文档，我个人开发移动端时最常用的组件库。

## 浙里办对接过程中遇到的问题及解决方案

### 请求层相关问题

#### 问题：请求层生产环境与开发环境不一致

在`基础概念介绍`章节中提到了，前端项目部署后需要通过 mgop 访问 RPC 再访问真实的服务端，而 mgop 在开发环境是无法使用的。

**解决方案**

封装一个request请求工具，当`NODE_ENV`这个环境变量是`production`时调用mgop，否则调用axios，具体代码参考`完整代码展示`中的`request.ts`。

#### 问题：调用接口报“网络错误”的异常

直接请求服务器上的接口正常，但是mgop调用rpc上api显示“网络错误”异常，大概率是RPC和服务器没有走通。

**解决方案**

1. 使用`工作台 > RPC 接入 > API管理`调试先测试能否正常返回结果。
2. 确保接口入参出参都为JSON格式。

#### 完整代码展示

```typescript
// api目录下，request 使用展示
import request from '@/http/request';

/**
* 请确保入参出参都是JSON格式，如果接口不需要传参，request对象则不需要传第三个参数
*/
const getRegion = (param) => {	// api的入参
  return request(
    {
      dev: "此处填写axios调用的api地址",
      prod: "此处填写mgop调用的api名称"
    },
    "get",
    {
      data: {
        param	//
      },
    }
  );
};

export {
  getRegion
};
```

```typescript
// request.ts
import useMgop from './useMgop';
import axiosInstance from './axiosInstance';

export function request(apis: { dev?: string, prod?: string }, type = "GET", config?: { data?: any }) {
  if (process.env.NODE_ENV === "production") {
    return useMgop(apis.prod, type, config);
  } else {
    if (!apis?.dev) {
      console.error('axios 请求路径不合法');
    } else if (type.toLowerCase() === 'get') {
      return axiosInstance.get(apis.dev, { params: config && (config.data !== undefined) ? config.data : null, ...config });
    } else if (type.toLowerCase() === 'post') {
      return axiosInstance.post(apis.dev, config && (config.data !== undefined) ? config.data : null, { ...config });
    }
  }
}

export default request;
```

```typescript
// axiosInstance.ts
import axios from 'axios';
import { Toast } from "vant";
import { useUserStore } from '@/stores/user';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config:any) => {
    const userStore = useUserStore();
    if(userStore.token) config.headers.Authorization = `Bearer ${userStore.token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;
    const code = parseInt(data?.code);
    const message = data?.message || '无详情';

    if(!isNaN(code) && (code < 200 || code > 200)){
      return Promise.reject(`服务器内部错误,状态码：${code},${message}`);
    }
    return data;
  },
  (error) => {
    Toast.fail(error.message);
    console.log(`err${error}`);

    return Promise.reject(error);
  },
);

export default service;
```

```typescript
// useMgop.ts
import { mgop } from "@aligov/jssdk-mgop";
import { Toast } from "vant";
import useHandleData from '@/composables/useHandleData';
import useCostomApis from './useCostomApis';
import { useUserStore } from '@/stores/user/index';

const { getUuid } = useHandleData();
const { add, remove, getIndex } = useCostomApis();

function useMgop(api, type = "GET", config) {
  const userStore = useUserStore();
  // api是在开发者平台中注册的rpc的api名称，一个接口一个
  return new Promise((resolve, reject) => {
    // 生成 uuid 并将其加入队列
    const uuid = getUuid();
    add(uuid);

    mgop({
      api,
      host: "https://mapi.zjzwfw.gov.cn/",
      dataType: "JSON",
      type,
      appKey: process.env.VUE_APP_ZLB_APP_KEY,
      header: {
        Authorization: userStore.token ? `Bearer ${userStore.token}` : null,
      },
      onSuccess: async (res) => {
        try {
          const result = await Promise.race([checkIsInQueue(uuid), handleOnSuccess(res, { api })]);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      onFail: async (error) => {
        console.log('mgop onFail', error);
        try {
          // 因为是错误函数的回调，所以不应存在对 resolve 的处理
          await Promise.race([checkIsInQueue(uuid), handleOnFailed(error, { api })]);
        } catch (error) {
          reject(error);
        }
      },
      ...config,
    });
  });
}

// 判断是否在需要执行的集合中
function checkIsInQueue(uuid) {
  return new Promise((resolve, reject) => {
    const index = getIndex(uuid);
    // 有副作用，并不理想
    if (index > -1) {
      remove(index);
    } else {
      return reject(new Error('请求已被取消'));
    }
  });
}

function handleOnSuccess(res, { api }) {
  return new Promise((resolve, reject) => {
    // 请求是否到达 RPC 判断
    let errMsg = '';
    const code = parseInt(res.data?.code);
    const message = res.data?.message || "无详情";

    if (res.ret[0] === "1000::调用成功") {  
      // 请求是否成功判断，字段和后端约定好
      if (!isNaN(code) && (code < 200 || code > 200)) {
        errMsg = JSON.stringify(`${api}服务器内部错误,状态码：${code},${message}`);
        Toast.fail(errMsg);
        return reject(new Error(errMsg));
      } else {
        resolve(res.data);
      }
    } else {
      errMsg = JSON.stringify(`${api}请求RPC失败，状态码：${res.ret[0]}`);
      Toast.fail(errMsg);
      reject(new Error(errMsg));
    }
  });
}

function handleOnFailed(error, { api }) {
  return new Promise((resolve, reject) => {
    if (error.errorMessage && error.errorCode) {
      const errMsg = JSON.stringify(`errorCode: ${error.errorCode},${error.errorMessage}`);
      Toast.fail(errMsg);
      return reject(new Error(`errorApi:${api},${errMsg}`));
    } else if (error.ret[0]) {
      const errMsg = JSON.stringify(error.ret[0]);
      Toast.fail(errMsg);
      return reject(new Error(errMsg));
    } else {
      reject(error);
      Toast.fail('系统异常，请稍后再试.');
      return reject(new Error(error));
    }
  });
}

export default useMgop;
```

```typescript
// useCostomApis.ts
const pendingRequests: Array<string> = [];

export default function useCostomApis() {
  function add(uuid: string) {
    if (uuid) pendingRequests.push(uuid);
  };

  function cancel() {
    if (pendingRequests.length) pendingRequests.length = 0;
  };

  function getIndex(val: string)  {
    return pendingRequests.findIndex((element) => element === val);
  };

  function remove(index: number) {
    pendingRequests.splice(index, 1);
  };

  return {
    add,
    remove,
    cancel,
    getIndex
  };
}
```

### 部署相关问题

#### 问题：部署报错“构建产物存放路径build不存在”

浙里办强制要求打包产物名称为“build”。

**解决方案**

修改打包名称后重新部署。

#### 问题：同样的包之前部署成功，现在却编译失败。

就是浙里办的BUG，但反馈也没用。

**解决方案**

重新部署，还不行只能提工单。
