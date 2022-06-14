# 后台系统的权限控制与管理

## 前言

前端权限和后端权限的区别在哪儿？有了后端权限为什么还要前端权限？前端需要后端给出怎样的权限数据？本文将围绕这三个问题，浅析前端权限控制思路以及在 Vue 中的实现。

## 权限相关概念

### 权限的分类

#### 后端权限

从本质上来讲前端仅仅只是视图层的展示，权限的核心是在于服务器中的数据变化，所以后端才是权限的关键，后端权限可以控制某个用户是否能够查询数据，是否能够修改数据等操作。

> 目前被大家广泛采用的两种权限模型为：基于角色的访问控制（RBAC）和基于属性的访问控制（ABAC），二者各有优劣：
>
> - RBAC 模型（用户、角色、权限）构建起来更加简单，缺点在于无法做到对资源细粒度地授权（都是授权某一类资源而不是授权某一个具体的资源）。
> - ABAC 模型构建相对比较复杂，学习成本比较高，优点在于细粒度和根据上下文动态执行。
>
> 一般项目中使用的是 RBAC 模型。

#### 前端权限

前端权限的控制本质是控制前端**视图层的展示**和前端所发送的**请求**，但是前端的权限都是可以通过技术手段破解的，不能将系统安全寄希望于前端。

### 前端权限的意义

如果仅从能够修改服务器中数据库的数据层面上讲，确实只在后端做控制就足够了，进行前端权限控制的好处主要如下：

- 仅展示用户权限内的内容，避免界面误导用户，提高用户体验
- 排除不必要的请求，减轻服务器压力

## 前端权限控制思路

### 路由控制

在登录请求中会得到权限的数据。前端根据权限去动态生成路由，只允许用户访问权限内的路由，如果通过地址栏去访问权限外的路由会重定向至`404`页面(无论登录了还是没登录)。

### 按钮控制

同一页面还可能因为权限不同展示不同的按钮。

### 请求和响应的控制

如果用户通过非常规操作，比如通过浏览器调试工具将某些禁用的按钮变成启用状态。此时发的请求，也应该被前端所拦截。

## Vue权限控制的实现

### 获取权限信息

一般权限信息会在用户登录后由后端返回，具体如何控制权限要看前端是如何与后端约定的。在查找资料并结合个人项目经验后，我总结有以下有三种常见的方式。

#### 后端返回权限表或路由表

这种方式常见于管理员可以添加新角色，并且要给这个角色分配菜单。拿到的数据大概如下：

```javascript
{
 "data": {
     "id": 1,
     "username": "admin",
     "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MzM1NzIyNH0.1y-Ucq_MfFRloesg0eA9pfk-VA3pV_zAOSj3HFpnKak"
 },
 "rights": [
  {
      "id": 125,
      "authName": "用户管理",
      "icon": "icon-user",
      "children": [
          {
              "id": 110,
              "authName": "用户列表",
              "path": "users",
              "rights": ["view","edit","add","delete"]
          }
      ]
  },
  {
      "id": 103,
      "authName": "角色管理",
      "icon": "icon-juese",
      "rights": ["view","edit","add","delete"]
  }
 ]
}
```

`data`中是用户信息，其中重点关注`token`字段，需要在客户端对其进行持久化处理。

```js
sessionStorage.setItem('token', res.token);
```

在请求需要鉴权的接口时，需要将其放在请求头中传给后端。

权限表`rights`经过处理可以生成前端需要的路由表（这里展示的是`父子结构`，也可能拿到是`一维数组`，需要前端自己处理），如果返回的是路由表则无需额外的处理。

#### 后端返回角色

对于一些小项目来说，后端可能不想返回路由表，前端也觉得加一个页面要后端改一下太麻烦了。更常见的情况，后端会告诉前端用户的角色，数据大概如下：

```js
{
    "data": {
     "id": 1,
     "username": "admin",
     "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MzM1NzIyNH0.1y-Ucq_MfFRloesg0eA9pfk-VA3pV_zAOSj3HFpnKak",
     "roles": ['admin','editr']
 }
}
```

`roles`字段代表了用户的角色，用数组是因为一个用户可能有多个角色。路由表由前端来维护并根据角色动态生成。

#### 前端根据用户信息判断角色

查找的资料中这种情况比较少，但是我经常碰到这种情况，后端返回的用户信息如下所示：

```js
{
    "data": {
     "id": 1,
     "username": "admin",
     "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MzM1NzIyNH0.1y-Ucq_MfFRloesg0eA9pfk-VA3pV_zAOSj3HFpnKak",
     "level": 1，
     "units": {
             "id": 1,
             "name": "部门1"
         }
 }
}
```

一开始后端告诉你通过`level`字段判断权限，你很快写好了方法。随着业务的变动，产品提出了新的需求，增加了管理员，后端告诉你：

> 当`username`为`admin`时角色是管理员。

过了一段时间，又告诉你：

> 当`units`为`null`时是特殊角色，只有导入数据的权限。

那可能会写出这样一个方法来判断用户的权限等级：

```js
    function getUserAuthority() {
      const userInfo = JSON.parse(sessionStorage.getItem('userData')).currentUserInfo;
      const { username, units } = userInfo;

      if (units === null) return -1;
      if (username === 'admin') return 0;
      return units?.level;
    }
```

尽管数据库中表还是原来的表，但是从前端的角度来看，假设原先`level`只有`1`、`2`、`3`三个等级，相当于三个角色，现在则是变成了5个角色。

### 路由控制的实现

#### 全局前置守卫判断是否登录

先判断跳转的是不是登录页（或其他路由白名单中的页面）

- 是 --> 直接放行
- 否 --> 获取`sessionStorage`中的`token`，有则放行，空则跳转登录页

```js
// router/index.js
router.beforeEach((to, from, next) => {
  // 1.如果访问的是登录页面（无需权限），直接放行
  if (to.path === '/login') return next();
  // 2.如果访问的是有登录权限的页面，先要获取token
  const token = sessionStorage.getItem('token');
  // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
  if (!token) {
    Message.error('需要登录权限，请登录后再试');
    return next('/login');
  }
  return next();
});
```

#### 动态路由

一般来说`vue-element-admin`中路由分为两种：不需要权限判断的路由、需要动态判断权限的路由，下面就是不需要权限判断的路由。

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    redirect: '/menu/one',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})
```

动态路由处理的整体思路就是：**根据权限生成路由，添加到路由表；当用户切换，权限发生改变时，清空动态添加的路由。**

对于**后端直接返回路由表**，代码大概如下：

```js
// 路由拼接
function loadView(view) {
    return () => import(`@/views/${ view }`)
}

// 路由过滤和跳转
async function onFilterRoutes(to, next, e) {
    const routes = await filterASyncRoutes(e)    // 路由过滤
    routes.sort((a, b) => a['id'] - b['id'])
    routes.forEach(item => {
        router.options.routes.push(item)
        router.addRoute(item)
    })
    next({ ...to, replace: true })
}

// 路由过滤   遍历路由 转换为组件对象和路径
function filterASyncRoutes(data) {
    const routes = data.filter(item => {
        if(item["component"] === "Layout") item.component = Layout
        else item["component"] = loadView(item["component"])
        // 路由递归，转换组件对象和路径
        if(item["children"] && item["children"].length > 0) item["children"] = filterASyncRoutes(item.children)
        return true
    })
    return routes
}

```

上面的代码参考自[掘金 - 《vue实现用户登录验证 + 权限验证 + 动态路由（左侧菜单栏）》](https://juejin.cn/post/7081517906026037284#heading-15)

> 不使用 router.addRoutes 方法是因为其在 vue router v3.x 中被废弃

对于**后端返回权限表、后端返回角色信息、前端根据用户信息判断角色**这三种情况，则稍微麻烦一些，需要经过映射转换生成路由后，再使用`router.addRoute`方法加入路由表。

映射转换的规则需要由前端来维护。

**Tips:**

另外，尽管 Vue Router 3.x 的文档中提到：

> 当使用*通配符*路由时，请确保路由的顺序是正确的，也就是说含有*通配符*的路由应该放在最后。

但经我实测后发现，含有*通配符*的路由放在最前面并不会影响后面路由的匹配。

### 按钮控制的实现

最容易想到的就是`v-if`，但这样每有一个按钮就要写一段逻辑判断，不够简洁。考虑到复用性，可以定义自定义指令来封装逻辑，并给合路由元信息`meta`使用。

在根目录下新建`directives/index.js`，然后在`main.js`中引入，页面中使用`v-permission`即可，具体代码如下：

```js
// 页面中的使用，action 控制展示，effect 控制禁用
v-permission="{action: 'add'}"
v-permission="{action: 'delete', effect: 'disabled'}"
```

```js
// directives/index.js
import Vue from 'vue'

Vue.directive('permission', {
  inserted (el, binding) {
    const {action,effect} = binding.value
    
    // 根据路由中元信息 meta 来判断是否具备对应的权限
    if(router.currentRoute.meta.indexOf(action) === -1){
        if(effect === 'disabled'){
            // 如果是禁用添加'disable'样式
            el.disabled = true
            el.classList.add('is-disabled')
        } else {
            // 否则就移除节点
            el.parentNode.removeChild(el)
        }
    }
  }
})
```

```js
// 生成的路由大致长这样
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    redirect: '/menu/one',
    children: [
        path: 'menu/one',
        name: 'MenuOne',
        component: () => import('@/views/Page1.vue'),
        meta: {
          right: ["view","edit","add","delete"]
        }
    ]
  }
]
```

### 请求和响应的控制的实现

#### 请求携带token

可以通过请求拦截器`interceptors.request`来携带`token`，代码如下：

```js
import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false, // send cookies when cross-domain requests
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  timeout: 10000, // request timeout
});

// 添加请求拦截器
service.interceptors.request.use(
  // do something before request is sent
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // 判断token是否存在
      config.headers.Authorization = `Bearer ${token}`; // 将token设置成请求头
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.error(error); // for debug
    return Promise.reject(error);
  }
);
```

#### token的校验

导航守卫只能简单地对`token`的有无进行检查，并不能校验其合法性。

使用响应拦截器可以处理`token`不合法的情况（超时或篡改），具体代码如下：

```js
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  (error) => {
    console.error(error); // for debug
    if (error.response.status) {
      switch (error.response.status) {
        case 403: // token 不合法
          Message.error('身份认证失效，请重新登录');
          router.replace({
            path: '/login',
          });
          sessionStorage.clear();
          window.location.reload();
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);
```

#### 拦截不应该发送的请求

同样要使用请求拦截器,修改代码如下:

```js
const actionMapping = {
    'get': 'view',
    'post': 'add',
    'put': 'edit',
    'delete': 'delete'
}

// 添加请求拦截器
service.interceptors.request.use(
  // do something before request is sent
  (config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
      // 判断token是否存在
      config.headers.Authorization = `Bearer ${token}`; // 将token设置成请求头
    }
    // 判断非权限内的请求
    const action = actionMapping[config.method]
    const currentRight = router.currentRoute.meta
    
    if(currentRight && currentRight.indexOf(action) === -1){
      alert('没有权限')
      return Promise.reject(new Error('没有权限'));
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.error(error); // for debug
    return Promise.reject(error);
  }
);
```

上面的代码对请求的类型进行映射出的权限与路由`meta`中的权限进行比较，然而实际开发中增删改查可能只用到`get`或者`post`，那么可能要将`url`作为`key`值，维护好`actionMapping`这个对象。

## 总结

前端权限控制可以提高用户体验，减轻服务器压力，但是最后一道保障仍然是在后端。在做权限控制时总体思路是最重要的，好的思路能避免因业务的变动而修改大段代码。

## 参考

1. [bilibili - 后台系统的权限控制与管理](https://www.bilibili.com/video/BV15Q4y1K79c?spm_id_from=333.337.search-card.all.click)
2. [掘金 - vue实现用户登录验证 + 权限验证 + 动态路由（左侧菜单栏）](https://juejin.cn/post/7081517906026037284#heading-15)
3. [掘金 - 浅析 vue-router 源码和动态路由权限分配](https://juejin.cn/post/6882539694170013710#heading-23)
