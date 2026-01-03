---
date: 2026-01-03
abstract: 本文将先简单回顾传统 Vue 项目 Docker 打包部署的方式与 Turborepo 的项目结构。说明如何在 Turborepo 架构的项目中通过 Docker 打包部署 Vue 项目。
tags:
  - Turborepo
  - Docker
---

# Turborepo 的 Docker 化实战

## 引言

从 2025-07 开始，我开始在 Vue 项目中使用 Docker + Workflow 的方式进行打包部署，在此简单列举几个好处，例如：

- 开发、测试、生产环境完全一致，Docker 镜像封装了 OS、Node.js 版本、依赖、构建工具等，避免因环境差异导致的构建失败或运行时错误。
- 节省人力，无需手动登录服务器执行命令。
- 每次部署对应一个带 tag 的 Docker 镜像，出现问题时，一键回滚到上一个镜像版本，无需重新构建。

本文将先简单回顾传统 Vue 项目 Docker 打包部署的方式与 Turborepo 的项目结构。说明如何在 Turborepo 架构的项目中通过 Docker 打包部署 Vue 项目。

## Vue 项目 Docker 打包部署

分为 Node 镜像构建以及 Nginx 部署两个阶段，Dockerfile 内容如下：

```dockerfile
# 第一阶段：node镜像打包
FROM node:latest AS frontend-builder
WORKDIR /build-app
COPY . .
RUN npm install
RUN npm run build

# 第二阶段：nginx打包
FROM nginx:latest
EXPOSE 80
WORKDIR /app
# 替换nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 将第一阶段的静态文件复制到nginx中
RUN rm -rf /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html
COPY --from=frontend-builder /build-app/dist /usr/share/nginx/html

# 运行
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf` 是在项目根目录下的自定义 Nginx 配置文件，详情可见[`个人相关配置`](#personal-conf)。

## Turborepo 项目结构回顾

Turborepo 本身不是构建工具，而是一个高性能的 Monorepo 任务编排器。它依赖底层包管理器（如 pnpm、yarn）来管理依赖，通过智能缓存和并行执行加速构建、测试等任务。

一个典型的 Turborepo + pnpm 项目结构如下：

```tex
my-turborepo/
├── apps/
│   ├── app1/               # 前端应用（如 Vue/React）
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json   ← name: "app1"
│   │   └── vite.config.ts
│   └── app2/
│       ├── ...
│       └── package.json   ← name: "app2"
├── packages/              # ← 缺失则 workspace 依赖安装失败
│   ├── ui/                # 共享 UI 组件库
│   │   └── package.json   ← name: "@my/ui"
│   └── utils/             # 工具函数
│       └── package.json   ← name: "@my/utils"
├── package.json           # 根工作区配置 + turbo 脚本
├── pnpm-workspace.yaml    # ← 缺失则 turbo 找不到 app1
├── turbo.json             # Turborepo 任务流水线配置
└── .npmrc                 # pnpm 配置（含 hoist 等）
```

Turborepo 的核心特点与 Docker 相关性如下：

| 特性                    | 说明                                                                                | 对 Docker 的影响 ❗                                               |
| ----------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Workspace 结构**      | 所有子项目（apps/packages）通过 `pnpm-workspace.yaml` 被识别为 workspace 包         | Docker 构建时必须复制该文件，否则 pnpm 无法识别子包               |
| **依赖链接（Linking）** | 子项目间通过 `workspace:*` 协议引用（如 `"@my/ui": "workspace:*"`），实际是符号链接 | 不能只复制单个 app 目录，必须复制整个 `apps/` 和 `packages/`      |
| **根目录统一安装**      | 所有依赖在根目录通过 `pnpm install` 安装，`node_modules` 位于根目录                 | 构建命令必须在根目录执行，不能进入 `apps/web` 后再 `pnpm install` |
| **Turbo 任务驱动**      | 通过 `turbo run build` 并指定 `--filter=app1` 来构建特定应用                        | 需确保 `turbo.json` 和子项目的 `name` 正确，否则 filter 失败      |

## 编写 Turborepo 中的 Dockerfile

首先展示我最终的 `Dockerfile.dev`（prod、test 中会使用到公司的镜像源），代码如下：

```dockerfile
# 第一阶段：构建
FROM node:22-alpine AS frontend-builder

WORKDIR /build-app

# 启用 pnpm（通过 Corepack）
ENV COREPACK_NPM_REGISTRY=https://registry.npmmirror.com
RUN corepack enable
RUN echo "Corepack registry: $COREPACK_NPM_REGISTRY" && \
    corepack prepare pnpm@10.24.0 --activate

# 复制所有配置文件
COPY .npmrc ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY package.json pnpm-lock.yaml ./
COPY apps/ apps/
COPY packages/ packages/

# 安装所有依赖（含 devDependencies）
RUN pnpm install

# 构建 icic（在原始位置）
RUN pnpm turbo build --filter icic -- --mode production

# 第二阶段：Nginx
FROM nginx:alpine
EXPOSE 80
COPY apps/icic/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /build-app/apps/icic/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```

两者的核心差异对比如下：

| 维度                     | 普通 Vue 项目                                   | Turborepo（Monorepo）                                           |
| ------------------------ | ----------------------------------------------- | --------------------------------------------------------------- |
| **项目结构**             | 单一目录，`package.json` 在根目录               | 多包结构，Vue 项目在 `apps/xxx/`，根目录是 workspace            |
| **依赖安装位置**         | 直接在项目根目录 `npm install` / `pnpm install` | 必须在 **workspace 根目录** 安装所有依赖                        |
| **构建命令**             | `npm run build` 或 `vite build`                 | 必须用 `turbo run build --filter=xxx`（或进入子目录构建）       |
| **关键配置文件**         | 只需 `package.json`、`vite.config.js` 等        | 还需： • `pnpm-workspace.yaml` • `turbo.json` • 根目录 `.npmrc` |
| **Dockerfile COPY 范围** | 只需复制当前项目文件                            | 必须复制： • 整个 `apps/` • 整个 `packages/` • 所有根配置文件   |
| **node_modules 位置**    | 在项目根目录                                    | 在 workspace 根目录，子项目通过链接使用                         |

## 总结

**普通 Vue 项目只关注自身；Turborepo 项目需要关注整个 workspace。** Docker 构建时，必须还原完整的 workspace 上下文，否则依赖解析会断裂。

## 其他

### 常见错误排查

| 错误现象                   | 可能原因                   | 解决方案                                                       |
| -------------------------- | -------------------------- | -------------------------------------------------------------- |
| `pnpm: not found`          | 未运行 `corepack enable`   | 添加 `RUN corepack enable`                                     |
| `No package found 'app1'`  | 缺少 `pnpm-workspace.yaml` | 确保 `COPY pnpm-workspace.yaml ./`                             |
| `Cannot resolve @my/utils` | 未复制 `packages/`         | 添加 `COPY packages/ packages/`                                |
| 构建成功但页面空白         | Nginx 未配置 `try_files`   | 检查 `nginx.conf` 是否包含 `try_files $uri $uri/ /index.html;` |

### 个人相关配置 {#personal-conf}

`nginx.conf`

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        # 新增下面这句，其他是默认nginx配置
        # 解决部分前端框架的路由问题，在浏览器刷新报错404
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

```

`pnpm-workspace`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

`.npmrc`

```ini
# China mirror of npm
registry = https://registry.npmmirror.com

# 安装依赖时锁定版本号
save-exact = true

# 启用 hoist，让 bin 文件提升到根目录
shamefully-hoist = true
hoist=true
public-hoist-pattern=*
```

## 参考

- [前端项目容器化(Docker)打包部署 - 掘金](https://juejin.cn/post/7302268383316213787)
- [Best practices for dependency installation - Turborepo](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies#best-practices-for-dependency-installation)
