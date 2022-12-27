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

由于这个项目一开始的定位是一个小项目，团队配置就是一个前端加一个后端，所以项目前端架构由我自己把控。团队的技术栈以Vue2为主，不过我个人会倾向使用Vue3，一来在Vue3中通过composabler的形式可以更好地进行代码复用，二来这对我个人的成长也更有帮助。不过最后能否使用Vue3还是要根据运行环境来决定，好在经过多方调查，最后确认可以上Vue3。

#### Vite还是Webpack

没有选用Vite的主要原因在于项目是通过VueCli构建的，我对这一套生态更加熟悉。加上当时了解到工期很紧，害怕使用Vite会遇到一些坑拖慢项目进度。不过现在VueCli已经进入了维护模式，加上VueConf2022上看到许多大公司已经将Vite用于生产环境，下一次构建项目时我会选择Vite。

#### Pinia还是Vuex

毫无疑问是Pinia，它非常轻量，使用起来相当简洁。而且尤大在一次掘金的直播中明确表示了Pinia就是下一代Vuex，出于对作者的尊重所以没有改名。

#### Aplus还是Zwlog

二者都是浙里办提供的埋点工具，浙里办官方更推荐使用新版的Zwlog。

#### Vant

老牌组件库，成熟的使用方案与优秀的文档，我个人开发移动端时最常用的组件库。

## 浙里办对接难点

### 单点登录

#### 整体思路

简单来说单点登录分为三个步骤：

1. 获取票据(`ticket`或`ticketId`)
2. 根据票据换`token`
3. 根据`token`换用户信息

根据实际拿到的票据，我们要调用不同的单点登录组件（不了解的请回头看章节**基础概念介绍**），根据我实际开发的情况来看，最后真实可用的是浙里办App、支付宝小程序使用**政府服务网个人用户单点登录组件**（我司项目面向的是个人用户）；微信小程序使用的是**“浙里办”统一单点登录**。

#### 判断容器环境

由于不同容器环境下，获取票据的方式不同。实际单点登录前需要先判断环境，每个容器的`window.navigator.userAgent`携带的参数不同，具体见方法getContainerEnv`。

#### 问题：获取票据时产生的二次回退

**政府服务网个人用户单点登录组件**通过重定向的方式将票据参数添加到url中，假设第一次打开应用访问的是首页A，往History栈中添加首页A。首页A执行获取票据逻辑，页面重定向至携带票据参数的首页B，此时History栈中现在有两个记录：首页B、首页A。当用户从首页按后退时本应回到上层应用，由于栈中有两条记录，实际回到了首页A，这个现象称其为**二次回退**。

解决这个问题我尝试了多种思路：

1. 不往History栈中push，使用replace

   *结果*：支付宝小程序不支持，仍出现两个窗口。

2. 执行打开新的页面窗口后，执行浙里办Api：`ZWJSBridge.close`将上一个窗口关闭。

   *结果*：App支持，但体验不好；支付宝小程序不支持，仍出现两个窗口。

3. 通过监听`popstate`事件，当首页进行后退操作时（还要判断条件为History或state判断再次后退是首页A），关闭窗口。

   *结果*：失败，没能触发`popstate`事件动作。猜测后退事件优先级较高，页面已经被销毁，不会再执行相关操作。

如果是单一容器解决二次回退相当简单，痛点在于容器环境复杂，表现结果不一致；运行机制处于黑箱。

最后的方案是在访问首页前增加一个过渡页，具体流程如下：

1. 打开应用，访问路径为`'/'`的过渡页，开始单点登录，页面重定向。
2. 重定向至新的过渡页。
3. 添加`popstate`监听器：当后退回到过渡页时，关闭页面。
4. 判断页面携带票据信息，访问首页。

现在从首页B后退并不会回到首页A，而是先回到过渡页，这样能保证`popstate`监听器可以正常执行。这个方案在好处在于不用再关注容器环境与History栈的情况，即便未来增加的新的容器环境，这套方案同样适用。缺点在于增加了一个额外的页面，代码看上去不那么直观。

#### 具体代码

```typescript
// @/composables/useSingleSignOn.ts
import { reactive, onUnmounted } from 'vue';
import { useUserStore } from "@/stores/user";
import {
  getAppToken,
  getMiniProgramToken,
  getAppUserInfo,
  getMiniProgramUserInfo
} from '@/apis/user';
import router from '@/router';

const APP_UTL =
  `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/${process.env.VUE_APP_ZLB_APP_ID}/lastTest/index.html`;
const APP_TEST_URL = `${APP_UTL}?debug=true`;
/** VUE_APP_ZLB_IS_ONLINE_ENV === 'false' 时是测试环境，否则都是生产环境 */ 
const ZLB_URL = `https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${process.env.VUE_APP_ZLB_ACCESS_KEY}&${process.env.VUE_APP_ZLB_IS_ONLINE_ENV === 'false' ? `redirectUrl=${APP_TEST_URL}` : `goto=${APP_UTL}`}`;
const ZFB_URL = `https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&scope=1&servicecode=${process.env.VUE_APP_ZLB_ACCESS_KEY}&${process.env.VUE_APP_ZLB_IS_ONLINE_ENV === 'false' ? `redirectUrl=${APP_TEST_URL}` : `goto=${APP_UTL}`}`;

type EnvironmentName = '浙里办' | '支付宝' | '微信' | '未定义' | string | undefined;
interface ISso {
  status: LogStatus,
  env: EnvironmentName,
  ticketId: string,
  zlbToken: string
}

enum LogStatus {
  Unlogged = '01',
  Logged = '02'
}
/**
 * @param status - 单点登录状态 0：未登录 1：登录成功
 * @param env - 环境名
 * @parma
 */
const sso: ISso = reactive({
  status: LogStatus.Unlogged,
  env: '',
  ticketId: '',
  zlbToken: '',
});

// 这里写的有点多余了，直接用枚举类会更好
const CONTAINER_ENV_MAP = new Map([
  [0, "未定义"],
  [1, "浙里办"],
  [2, "支付宝"],
  [3, "微信"],
]);

export default function useSingleSignOn() {
  /**
 * 获取当前环境
 * @returns 
 */
  function getContainerEnv(): EnvironmentName {
    const sUserAgent = window.navigator.userAgent.toLowerCase();
    let keyOfContainerEnv;

    if (sUserAgent.indexOf("dtdreamweb") > -1) {
      keyOfContainerEnv = 1;
    } else if (
      sUserAgent.indexOf("miniprogram") > -1 &&
      sUserAgent.indexOf("alipay") > -1
    ) {
      keyOfContainerEnv = 2;
    } else if (
      sUserAgent.indexOf("miniprogram") > -1 &&
      (sUserAgent.indexOf("wx") > -1 || sUserAgent.indexOf("wechat") > -1)
    ) {
      keyOfContainerEnv = 3;
    } else {
      keyOfContainerEnv = 0;
    }

    sso.env = CONTAINER_ENV_MAP.get(keyOfContainerEnv);
    console.log('当前环境',sso.env);
    
    return CONTAINER_ENV_MAP.get(keyOfContainerEnv) as EnvironmentName;
  }
  /**
   * 获取票据 ticketId
   * @param environmentName - 当前使用环境名
   * @returns ticketId || null
   */
  async function getZlbTicket(environmentName: EnvironmentName) {
    switch (environmentName) {
      case "浙里办": {
        const regex = /(ticket=)(.+-ticket)/;
        if (window.location.search.match(regex)) {
          console.log('浙里办获取ticket', window.location.search.match(regex)![2]);
          return window.location.search.match(regex)![2];
        } else {
          window.location.replace(ZLB_URL);
        }
        break;
      }
      case "支付宝": {
        const regex = /(ticket=)(.+-ticket)/;
        if (window.location.search.match(regex)) {
          console.log('支付宝获取ticket', window.location.search.match(regex)![2]);
          return window.location.search.match(regex)![2];
        } else {
          window.location.replace(ZFB_URL);
        }
        break;
      }
      case "微信": {
        if (ZWJSBridge.ssoTicket) {
          const ssoFlag = await ZWJSBridge.ssoTicket({});
          console.log('ssoFlag', ssoFlag);

          if (ssoFlag && ssoFlag.result === true) {
            if (ssoFlag.ticketId) {
              console.log("小程序获取ticketId:", ssoFlag.ticketId);
              return ssoFlag.ticketId;
            } else {
              // 当“浙里办”单点登录失败或登录态失效时调用 ZWJSBridge.openLink 方法重新获取 ticketId
              return ZWJSBridge.openLink({ type: "reload" }).then(res => res.ticketId);
            }
          } else {
            throw new Error("小程序获取 ticketId 失败,ssoTicket 方法没有返回 ticketId");
          }
        } else {
          throw new Error("ssoTicket 方法不存在，确保在浙里办小程序中访问应用");
        }
        break;
      }
      default:
        throw new Error('获取ticketId失败，预期外的输入条件');
    }
    return null;
  }

  /**
   * 通过票据获取 token
   * @param ticket - 票据
   * @param env - 环境名 
   * @returns 
   */
  async function getZlbToken(ticket: string, { env: environmentName }) {
    if (ticket) {
      try {
        switch (environmentName) {
          case "支付宝":
          case "浙里办": {
            const res: any = await getAppToken(ticket);
            return res.data.token;
            break;
          }
          case "微信":
            {
              const res: any = await getMiniProgramToken(ticket);
              console.log(`小程序拿到的浙里办token:${JSON.stringify(res)}`);
              return res.data;
              break;
            }
          default:
            throw new Error("当前环境未识别，无法获取token");
        }
        return null;
      } catch (e: any) {
        throw new Error(`${environmentName}票据换浙里办token失败：${e.message}`);
      }
    } else {
      throw new Error('票据不存在');
    }
  }

  /**
   * 通过 token 获取当前登录用户的用户信息
   */
  async function getUserInfo(zlbToken: string, { env: environmentName }) {
    try {
      switch (environmentName) {
        case "支付宝":
        case "浙里办": {
          const res: any = await getAppUserInfo(zlbToken);
          return {
            username: res?.data?.username,
            mobile: res?.data?.mobile,
            idnum: res?.data?.idnum,
            userid: res?.data?.userid,
          };
          break;
        }
        case "微信": {
          const res: any = await getMiniProgramUserInfo(zlbToken);
          return {
            username: res?.data?.userNameEnc,
            mobile: res?.data?.phoneEnc,
            idnum: res?.data?.idNoEnc,
            userid: res?.data?.userid,
          };
          break;
        }
        default:
          break;
      }
      return null;
    } catch (e: any) {
      throw new Error(`${environmentName}通过 token 获取当前登录用户的用户信息失败：${e.message}`);
    }
  }

  async function singleSignOn() {
    try {
      const userStore = useUserStore();
      userStore.env = getContainerEnv();
      // 监听后退事件，当后退回到过渡页时,直接关闭页面.
      const watchPopstate = () => {
        if (window.history.state?.current === '/') {
          if (sso.env === '支付宝') {
            /** 支付宝环境Api，不需要额外引入文件可以直接使用。实际上我觉得这里可以不判断环境，直接使用ZWJSBridge.close */
            my.navigateBack();
          } else {
            ZWJSBridge.close();
          }
        }
      };
      window.addEventListener("popstate", watchPopstate, false);
      onUnmounted(() => window.removeEventListener("popstate", watchPopstate));
      sso.ticketId = await getZlbTicket(sso.env);
      // 从过渡页跳转至首页
      router.push({ name: 'home' });
      // 获取用户信息
      if (sso.ticketId) {
        sso.zlbToken = await getZlbToken(sso.ticketId, { env: sso.env });
        const userInfo: any = await getUserInfo(sso.zlbToken, { env: sso.env });
        sso.status = LogStatus.Logged;
        
        if (userInfo !== null && userInfo !== undefined) {
          userStore.username = userInfo.username;
          userStore.mobile = userInfo.mobile;
          userStore.idnum = userInfo.idnum;
          userStore.userid = userInfo.userid;
        }
        return { ...sso, ...userInfo };
      }
      return { ...sso };
    } catch (e: any) {
      throw new Error(`单点登录失败：${e?.message ?? JSON.stringify(e)}`);
    }
  }

  return {
    sso,
    getContainerEnv,
    getZlbTicket,
    getZlbToken,
    getUserInfo,
    singleSignOn
  };
}

```



### 请求层封装

#### 请求层生产环境与开发环境不一致

在`基础概念介绍`章节中提到了，前端项目部署后需要通过 mgop 访问 RPC 再访问真实的服务端，而 mgop 在开发环境是无法使用的。

**解决方案**

封装一个request请求工具，当`NODE_ENV`这个环境变量是`production`时调用mgop，否则调用axios，具体代码参考`完整代码展示`中的`request.ts`。

#### 调用接口报“网络错误”的异常

直接请求服务器上的接口正常，但是mgop调用rpc上api显示“网络错误”异常，大概率是RPC和服务器没有走通。

**解决方案**

1. 使用`工作台 > RPC 接入 > API管理`调试先测试能否正常返回结果。
2. 确保接口入参出参都为JSON格式。

#### 访问联调地址的接口

使用`mgop`默认访问生产环境，如果需要访问联调地址的要在加上请求头，对应下面的代码：

```typescript
 /** 当请求头 isTestUrl 为 "1" 时，使用联调环境，实测传其他值例如""，"0" 仍然会使用联调环境"，传参为null时ios端无法访问接口 */ 
 if(process.env.VUE_APP_ZLB_IS_ONLINE_ENV === 'false') mgopReceiceObj.header['isTestUrl'] = '1';
```

说实话这种写法有些呆，但是缺乏相应的文档，也只能做到这种程度。

#### 具体代码展示

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
        param
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
    const mgopReceiceObj = {
      api,
      host: "https://mapi.zjzwfw.gov.cn/",
      dataType: "JSON",
      type,
      appKey: process.env.VUE_APP_ZLB_APP_KEY,
      /** 同事说的，请求头用引号，否则可能会遇上浙里办转换策略的问题 */
      header: {
        "Authorization": userStore.token ? `Bearer ${userStore.token}` : '',
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
    };

    /** 当请求头 isTestUrl 为 "1" 时，使用联调环境，传其他值例如""，"0" 仍然会使用联调环境" */ 
    if(process.env.VUE_APP_ZLB_IS_ONLINE_ENV === 'false') mgopReceiceObj.header['isTestUrl'] = '1';
    mgop(mgopReceiceObj);
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

### 埋点封装

#### 整体思路

我司项目以toG为主，我也没有埋点的相关经验。如果只是为了通过浙里办的审核要求，还是挺简单的，只要把埋点必填参数都加上就好了，详情可见后续具体代码，这里主要再聊下我对浙里办这套埋点方案的思考。

先谈谈埋点代码的管理，在我看来好的埋点方案应当提供两种方案——既提供手动埋点，也提供自动埋点。我最初的设想是通过将信息放在路由的meta中判断是否进行要上报埋点，很遗憾由于必填参数`t2`、`t0`的存在，导致我最后没使用这套方案。现在的方案是在每个页面手动进行上报，这样的问题是写出了侵入式的代码，造成了埋点与业务代码之间的耦合。

再谈谈PV埋点参数获取，目前我的方案中这`t2`这个参数是不准确的。单页应用中，什么时候才是有效数据渲染完毕，这个点是比较复杂的。目前的改进方向通过`window.performance.getEntries()`来实现：

> - 通过window.performance.timing所获的的页面渲染所相关的数据，在单页应用中改变了url但不刷新页面的情况下是不会更新的。因此如果仅仅通过该api是无法获得每一个子路由所对应的页面渲染的时间。如果需要上报切换路由情况下每一个子页面重新render的时间，需要自定义上报。
>
> - 通过window.performance.getEntries()所获取的资源加载和异步请求所相关的数据，在页面切换路由的时候会重新的计算，可以实现自动的上报。
>
>   ——内容出自[《在单页应用中，如何优雅的上报前端性能数据》](https://github.com/forthealllight/blog/issues/38)

不过话说回来，一个H5应用真的有必要做到这种程序吗，我觉得用户单位不会关心也不会使用这种数据。

#### PV埋点必填数据

| 参数名      | 说明                                  | 示例       | **备注**                                                     |
| ----------- | ------------------------------------- | ---------- | ------------------------------------------------------------ |
| t2          | 页面加载时间                          | 1.43（秒） | 页面启动到加载完成                                           |
| t0          | 页面响应时间                          | 0.25（秒） | 页面启动到页面响应                                           |
| log_status  | 用户登录状态（01:未登录/02:单点登录） | 02         |                                                              |
| miniAppId   | 应用开发管理                          |            | 通过 IRS 应用发布界面获取服务唯一标识                        |
| miniAppName | 应用开发管理平台应用名称              |            | 通过 IRS 应用发布界面获取服务名称                            |
| pageId      | 应用页面 ID                           |            | 服务提供方统一规范各页面编号生成方式，服务内页面编号唯一即可，与服务埋点方案内页面编号可一一对应即可 |
| pageName    | 应用页面名称                          |            | 默认取页面 title，服务提供方自己定义，与服务埋点方案内名称一致即可 |

#### zwlog初始化必填参数

文档上没有说明必传，但是应用上架审核时会要求。

| 参数名     | 说明               | **备注**             |
| ---------- | ------------------ | -------------------- |
| _user_id   | 实际用户唯一识别id | 通过单点登录功能获取 |
| _user_nick | 实际用户名称       | 通过单点登录功能获取 |

#### 具体代码

```typescript
// 在需要埋点的页面引入，必须在 setup 中使用
import useBuryingPoint from "@/composables/useBuryingPoint";

const { sendPageView } = useBuryingPoint();
sendPageView();
```

```typescript
// @/composables/useBuryingPoint.ts
import { computed, ComputedRef, ref, Ref, nextTick, watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useSingleSignOn from './useSingleSignOn';

interface ZwlogReceiveObj {
  _user_id?: string,
  _user_nick?: string
}

enum LogStatus {
  Unlogged = '01',
  Logged = '02'
}

interface PvReceiveObj {
  /** IRS 服务侧应用 appid */
  miniAppId: string,
  /** 页面启动到加载完成的时间 */
  t2: string | number,
  /** 页面启动到页面响应完成的时间 */
  t0: string | number,
  /** 各页面唯一标识 */
  pageId: string,
  /** 用户登录状态（01:未登录/ 02:单点登录） */
  log_status: LogStatus,
  /** 默认取页面 title，服务提供方自己定义，与服务埋点方案内名称一致即可 */
  pageName?: string,
  /** 用户从进入到离开当前页面的时长 */
  Page_duration?: string
}

interface IZwlog {
  onReady: any,
  sendPV: (PvReceiveObj) => never
}
const zwlog: Ref<null | IZwlog> = ref(null);
const currentRoutePath: Ref<null | string> = ref(null);
const isFirstComing = ref(true);

export default function useBuryingPoint() {
  /**
   * 初始化 zwlog 方法
   * @param ZwlogReceiveObj - 接受用户唯一标识与用户昵称 
   */
  function init(ZwlogReceiveObj: ZwlogReceiveObj = {}) {
    try {
      // 在 d.ts 中声明ZwLog属于window，否则ts报错
      zwlog.value = new window.ZwLog(ZwlogReceiveObj);
      console.log('zwlog 初始化成功');
    } catch {
      throw new Error('zwlog 初始化失败');
    }
  }

  /**
   * 发送 PV 日志
   * @param miniAppId - IRS 服务侧应用 appid
   * @param t2 - 页面启动到加载完成的时间
   * @param t0 - 页面启动到页面响应完成的时间
   * @param pageId - 各页面唯一标识
   * @param pageName - 默认取页面 title，服务提供方自己定义，与服务埋点方案内名称一致即可
   * @param log_status - 用户登录状态（01:未登录/ 02:单点登录）
 */
  function useSendPV(data: PvReceiveObj) {
    try {
      if (zwlog.value === null) throw new Error('zwlog 未初始化');
      zwlog.value.onReady(function () {
        zwlog.value?.sendPV(data);
      });
    } catch (e: any) {
      throw new Error(`useSendPV 方法错误:${e?.message || e}`);
    }
  }

  /**
   * 获取页面加载时间
   */
  function sendPageView() {
    const login = new Date().getTime();  //进入时间
    const upTime: any = ref(0);  //更新时间
    const beforeTime = ref(0);  //beforeUpdate
    //获取router-->meta中设置的页面Id、Name
    const route = useRoute();
    const pageId = computed(() => route?.meta?.pageId ?? '未定义的pageId') as ComputedRef<string>;
    const pageName = computed(() => route?.meta?.appTitle ?? process.env.VUE_APP_ZLB_TITLE) as ComputedRef<string>;
    const isAbleToSend = computed(() => currentRoutePath.value !== route?.fullPath);

    nextTick(() => {
      upTime.value = new Date().getTime();
    });
    onMounted(() => {
      beforeTime.value = new Date().getTime();
      currentRoutePath.value = route.fullPath;
    });
    //监听时间，时间拿到之后调用pv发送日志
    watchEffect(() => {
      if (zwlog.value && (isAbleToSend.value || isFirstComing.value) && (beforeTime.value - login) > 0 && (upTime.value - login) > 0) {
        try {
          currentRoutePath.value = route.fullPath;
          isFirstComing.value = false;
          const { sso } = useSingleSignOn();
          const t0 = (beforeTime.value - login) / 1000;
          const t2 = (upTime.value - login) / 1000;
          const log_status = sso.status;

          useSendPV({
            t2,
            t0,
            miniAppId: process.env.VUE_APP_ZLB_APP_ID,
            pageId: pageId.value,
            pageName: pageName.value,
            log_status
          });
          console.log(`发送PV,t2:${t2},t0:${t0},pageId:${pageId.value},pageName:${pageName.value},log_status:${log_status}`);
        } catch (e: any) {
          console.error(`发送PV失败：${e.message}`);
        }
      }
    });
  }

  return {
    zwlog,
    init,
    useSendPV,
    sendPageView
  };
}

```

### 部署

#### 如何部署

将`git`与`node_modules`之外的代码添加到压缩文件，通过IRS上传，平台会自动进行解压、编译、部署。

#### 部署报错“构建产物存放路径build不存在”

浙里办强制要求打包产物名称为“build”，修改打包名称后重新部署。

#### 同样的包之前部署成功，现在却编译失败。

就是浙里办的BUG，但反馈也没用。重新部署，还不行只能提工单。

### 环境变量管理

#### 整体思路

本项目使用`dotenv`实现环境变量，相较于一般项目，本项目复杂的点在于：不仅有本地开发环境与线上环境的差异，线上环境还有生产环境与测试环境之分。生产环境与测试环境的单点登录回调地址参数不同；测试、生产环境即可以访问生产地址的接口，也可以访问联调接口。

由于每次只能通过上传压缩包的方式部署，每次切换mgop的生产环境与联调环境必须手动修改。本项目中当`VUE_APP_ZLB_IS_ONLINE_ENV`为`'false'`时代表要发布测试环境，否则代表访问线上环境。

#### 具体代码

```
// .env
NODE_ENV = development

# axios 相关
VUE_APP_BASE_URL = 开发环境联调地址

# 浙里办相关
VUE_APP_ZLB_TITLE = 自定义应用名称
VUE_APP_ZLB_APP_ID = 应用唯一标识（单点登录、埋点相关）
VUE_APP_ZLB_APP_KEY = 标示请求应用（可以通过应用开放平台获取，mgop相关）
VUE_APP_ZLB_ACCESS_KEY = 单点登录组件AK（SK不要存在前端项目中，会造成泄露）

# 是否发布正式版，false 时为测试版，其他值时为正式版
# 请勿直接修改当前文件，修改 .env.production 文件
VUE_APP_ZLB_IS_ONLINE_ENV = false
```

```
// .env.production
NODE_ENV = production

VUE_APP_ZLB_IS_ONLINE_ENV = false
```

```
 // package.json
 
 "scripts": {
    "build": "vue-cli-service build --mode production",
  },
```

## 业务需求及解决方案

### 文件上传

#### JSON入参转文件流

平时的文件上传都是通过流来实现。由于浙里办的规范——接口入参出参只接受JSON，只能曲线救国，JSON入参，再由后端转换成需要的格式。此种方案优缺点如下：

**优点：**实现起来简单。

**缺点：**是接口响应速度会变慢。

#### 使用OSS

阿里云对象存储OSS（Object Storage Service），是由阿里提供的一种云存储服务。

此种方案优缺点如下：

**优点：**提交材料审核时，这部分无需额外的说明。

**缺点：**需要付费。

具体使用前后端需集成相应的SDK，我司项目中后端使用[Java](https://help.aliyun.com/document_detail/32007.html)，前端使用[Browser.js](https://help.aliyun.com/document_detail/64041.html)。

大致流程是需要后端提供一个接口用于[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html)，获取凭证后前端初始化OSS，然后就可以进行上传下载等权限内操作。

需要注意的是，OSS有有效时间，快到期前需要刷新凭证。一开始我是使用`refreshSTSToken`这个官方提供的参数进行刷新，但是后来我发现每次调用`signatureUrl`这个方法都会触发`refreshSTSToken`。在社区提了个ISSUE：[v6.17.1 browserjs 调用signatureUrl方法会触发refreshSTSToken](https://github.com/ali-sdk/ali-oss/issues/1178)，但是快一个月过去了也无人回应，后面索性就直接写个定时任务来刷新了。

此处不对OSS进行过多的展开，更多请见[《什么是对象存储OSS》](https://help.aliyun.com/document_detail/31817.html#:~:text=OSS%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5.%20%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%EF%BC%88Storage%20Class%EF%BC%89.%20OSS%E6%8F%90%E4%BE%9B%E6%A0%87%E5%87%86%E3%80%81%E4%BD%8E%E9%A2%91%E8%AE%BF%E9%97%AE%E3%80%81%E5%BD%92%E6%A1%A3%E3%80%81%E5%86%B7%E5%BD%92%E6%A1%A3%E5%9B%9B%E7%A7%8D%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%EF%BC%8C%E5%85%A8%E9%9D%A2%E8%A6%86%E7%9B%96%E4%BB%8E%E7%83%AD%E5%88%B0%E5%86%B7%E7%9A%84%E5%90%84%E7%A7%8D%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E5%9C%BA%E6%99%AF%E3%80%82.,%E5%85%B6%E4%B8%AD%E6%A0%87%E5%87%86%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%E6%8F%90%E4%BE%9B%E9%AB%98%E6%8C%81%E4%B9%85%E3%80%81%E9%AB%98%E5%8F%AF%E7%94%A8%E3%80%81%E9%AB%98%E6%80%A7%E8%83%BD%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8%E6%9C%8D%E5%8A%A1%EF%BC%8C%E8%83%BD%E5%A4%9F%E6%94%AF%E6%8C%81%E9%A2%91%E7%B9%81%E7%9A%84%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE%EF%BC%9B%E4%BD%8E%E9%A2%91%E8%AE%BF%E9%97%AE%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%E9%80%82%E5%90%88%E9%95%BF%E6%9C%9F%E4%BF%9D%E5%AD%98%E4%B8%8D%E7%BB%8F%E5%B8%B8%E8%AE%BF%E9%97%AE%E7%9A%84%E6%95%B0%E6%8D%AE%EF%BC%88%E5%B9%B3%E5%9D%87%E6%AF%8F%E6%9C%88%E8%AE%BF%E9%97%AE%E9%A2%91%E7%8E%871%E5%88%B02%E6%AC%A1%EF%BC%89%EF%BC%8C%E5%AD%98%E5%82%A8%E5%8D%95%E4%BB%B7%E4%BD%8E%E4%BA%8E%E6%A0%87%E5%87%86%E7%B1%BB%E5%9E%8B%EF%BC%9B%E5%BD%92%E6%A1%A3%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%E9%80%82%E5%90%88%E9%9C%80%E8%A6%81%E9%95%BF%E6%9C%9F%E4%BF%9D%E5%AD%98%EF%BC%88%E5%BB%BA%E8%AE%AE%E5%8D%8A%E5%B9%B4%E4%BB%A5%E4%B8%8A%EF%BC%89%E7%9A%84%E5%BD%92%E6%A1%A3%E6%95%B0%E6%8D%AE%EF%BC%9B%E5%86%B7%E5%BD%92%E6%A1%A3%E5%AD%98%E5%82%A8%E9%80%82%E5%90%88%E9%9C%80%E8%A6%81%E8%B6%85%E9%95%BF%E6%97%B6%E9%97%B4%E5%AD%98%E6%94%BE%E7%9A%84%E6%9E%81%E5%86%B7%E6%95%B0%E6%8D%AE%E3%80%82.%20%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF%EF%BC%8C%E8%AF%B7%E5%8F%82%E8%A7%81%20%E5%AD%98%E5%82%A8%E7%B1%BB%E5%9E%8B%E4%BB%8B%E7%BB%8D%20%E3%80%82.)。

具体代码如下：

```js
// 具体使用
import useOss from '@/composables/useOss';

// 初始化
const { init: initOss } = useOss();

// 文件上传
const { putObject } = useOss();
putObject(自定义文件对象, 文件名);

// 由加密后的数据，获 取文件地址
const { getPreviewUrl } = useOss();
const filePath = getPreviewUrl(加密后的数据)
```

```typescript
// @/composables/useOss.ts
import OSS from 'ali-oss';
import { getOssSts } from '@/apis/file';

/**
 * @param region 填写Bucket所在地域。以华东1（杭州）为例，填写为oss-cn-hangzhou
 * @param accessKeyId  从STS服务获取的临时访问密钥 AccessKey ID
 * @param accessKeySecret 从STS服务获取的临时访问密钥 AccessKey Secret
 * @param stsToken 从STS服务获取的安全令牌（SecurityToken）
 * @param bucket Bucket名称
 */
const headers = {
    // 指定该Object被下载时网页的缓存行为。
    // 'Cache-Control': 'no-cache',
    // 指定该Object被下载时的名称。
    // 'Content-Disposition': 'oss_download.txt',
    // 指定该Object被下载时的内容编码格式。
    // 'Content-Encoding': 'UTF-8',
    // 指定过期时间。
    // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT',
    // 指定Object的存储类型。
    // 'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    // 'x-oss-object-acl': 'private',
    // 设置Object的标签，可同时设置多个标签。
    // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'true',
};

let client: any = null;

export default function useOss() {
    /**
     * oss 初始化方法
     */
    async function init() {
        try {
            const { data: refreshToken }: any = await getOssSts();

            client = new OSS({
                region: process.env.VUE_APP_OSS_REGION,
                accessKeyId: refreshToken.AccessKeyId,
                accessKeySecret: refreshToken.AccessKeySecret,
                stsToken: refreshToken.SecurityToken,
                // refreshSTSToken 有BUG放弃使用
                // refreshSTSToken: async () => {
                //     // 向您搭建的STS服务获取临时访问凭证。
                //     const { data: refreshToken }: any = await getOssSts();

                //     return {
                //         accessKeyId: refreshToken.AccessKeyId,
                //         accessKeySecret: refreshToken.AccessKeySecret,
                //         stsToken: refreshToken.SecurityToken,
                //     };
                // },
                // // 刷新临时访问凭证的时间间隔，单位为毫秒。
                // refreshSTSTokenInterval: 60000 * 30,
                bucket: process.env.VUE_APP_OSS_BUCKET,
            });
            console.log('OSS 访问凭证初始化成功');
        } catch (e: any) {
            throw new Error(`OSS 访问凭证初始化失败：${e.message}`);
        }
    };

    /**
     * OSS 上传文件,填写Object完整路径。Object完整路径中不能包含Bucket名称。您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
     * @param data - data对象可以自定义为file对象、Blob数据或者OSS Buffer
     * @param filename - 文件名，需要带上文件后缀
     */
    async function putObject(data, filename) {
        if (client === null) return console.error('oss client 未初始化');
        try {
            const result = await client.put(
                filename, data, headers);
            return result;
        } catch (e) {
            throw new Error(`文件流上传 OSS 失败，${e}`);
        }
    };

    /**
     * @description 获取文件预览地址
     * @param filePath bucket上的文件名
     */
    function getPreviewUrl(filePath: string) {
        try {
            if (client === null) {
                console.error('oss client 未初始化');
            } else if (!filePath) {
                console.warn('oss 获取地址为空');
            } else {
                const url = client.signatureUrl(filePath);
                return url;
            }
            return '';
        } catch (e) {
            console.error(`获取文件预览地址失败，${e}`);
            return '';
        }
    };

    return {
        putObject,
        getPreviewUrl,
        init
    };
}
```



【后续待更...】
