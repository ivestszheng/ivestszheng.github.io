---
title: Vue3 hooks 实践后的个人偏见
date: 2023-04-16
abstract: 许多关于 hooks 的文章都着重介绍了 hooks 的理念，而举得案例过于简单，刚接触 hooks 的新手难以将其运用至业务代码中。本文将着重介绍 hooks 在一个难度适中的示例中是如何使用的。对于理念部分，我认为官方文档已经足够详细，本人仅穿插一点个人偏见。强烈建议阅读本文前，先学习官方文档组合式函数这一章节。
---

# Vue3 hooks 实践后的个人偏见

## 前言

许多关于 hooks 的文章都着重介绍了 hooks 的理念，而举得案例过于简单，刚接触 hooks 的新手难以将其运用至业务代码中。本文将着重介绍 hooks 在一个难度适中的示例中是如何使用的。对于理念部分，我认为官方文档已经足够详细，本人仅穿插一点个人偏见。强烈建议阅读本文前，先学习官方文档[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)这一章节。

## 什么是 hooks

Hooks 是 React 中的一种特殊函数，用于在函数组件中添加状态和生命周期方法等功能。它们可以被视为一种组合式函数，因为它们可以被组合在一起以实现更复杂的逻辑。在 Vue 应用的概念中，“组合式函数”( Hooks / Composables ) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如你可能已经用过的 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)。

相比之下，**有状态的逻辑**包含了随着时间变化的状态管理。

## 示例

在阅读本节前最好先阅读官方的两个示例，[鼠标跟踪器示例](https://cn.vuejs.org/guide/reusability/composables.html#mouse-tracker-example)、[异步状态示例](https://cn.vuejs.org/guide/reusability/composables.html#async-state-example)。学习完这两个示例后，你对于如何编写 hooks 应该有一定想法了，但可能还不知道如何在项目中运用，没关系，接下来我将展示用 hooks 实现一个下拉列表。为了方便，我将使用 vant-ui 作为组件库。具体效果如下图所示：

![下拉列表 Demo](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/VanListDelmo.gif)

在这个示例中，包含了搜索栏、下拉列表、下拉刷新这三个组件，直接使用组合式 API，写出的代码会是这样的：

### 直接使用组合式 API

```vue
<template>
  <div class="van-list-demo-view">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-sticky :offset-top="0">
        <van-search
          v-model="searchContent"
          placeholder="请输入数字"
          @search="onSearch"
        />
      </van-sticky>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          style="text-align: center"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { Ref, reactive, ref, unref } from "vue";

const searchContent = ref("");
function onSearch() {
  queryCondition.searchContent = unref(searchContent);
  onRefresh();
}

const list: Ref<number[]> = ref([]),
  loading = ref(false),
  finished = ref(false),
  queryCondition = reactive({
    page: 0,
    size: 8,
    searchContent: "",
  }),
  totalNum = 40;

function onLoad() {
  if (isRefreshing.value) {
    // 如果是真实场景此处还应取消未完成的请求
    list.value = [];
    isRefreshing.value = false;
  }
  /**
   * 异步更新数据,
   * setTimeout 仅做示例，真实场景中一般为 ajax 请求,
   * 此处模拟真实的分页查询处理。
   * 搜索的逻辑不具体展开，只简单处理。
   **/
  setTimeout(() => {
    if (queryCondition.searchContent) {
      // 这个条件只是模拟出查询的效果，没有什么现实意义
      if (
        Number(queryCondition.searchContent) > 0 &&
        Number(queryCondition.searchContent) <= totalNum
      ) {
        list.value.length = 0;
        list.value.push(Number(queryCondition.searchContent));
      }
    } else {
      for (let i = 0; i < queryCondition.size; i++) {
        list.value.push(list.value.length + 1);
      }
    }
    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= totalNum || queryCondition.searchContent) {
      finished.value = true;
    } else {
      queryCondition.page++;
    }
  }, 1000);
}

const isRefreshing = ref(false);
function onRefresh() {
  // 清空数据列表
  isRefreshing.value = true;
  queryCondition.page = 0;
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}
</script>
```

### Hooks 初步提取

但是，如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中：

```typescript
// vanList.ts
import { Ref, reactive, ref, unref } from "vue";

function useVanList() {
  const searchContent = ref("");
  function onSearch() {
    queryCondition.searchContent = unref(searchContent);
    onRefresh();
  }

  const list: Ref<number[]> = ref([]),
    loading = ref(false),
    finished = ref(false),
    queryCondition = reactive({
      page: 0,
      size: 8,
      searchContent: "",
    }),
    totalNum = 40;

  function onLoad() {
    if (isRefreshing.value) {
      // 如果是真实项目此处还应取消未完成的请求
      list.value = [];
      isRefreshing.value = false;
    }
    /**
     * 异步更新数据,
     * setTimeout 仅做示例，真实场景中一般为 ajax 请求,
     * 此处模拟真实的分页查询处理。
     * 搜索的逻辑不具体展开，只简单处理。
     **/
    setTimeout(() => {
      if (queryCondition.searchContent) {
        // 这个条件只是模拟出查询的效果，没有什么现实意义
        if (
          Number(queryCondition.searchContent) > 0 &&
          Number(queryCondition.searchContent) <= totalNum
        ) {
          list.value.length = 0;
          list.value.push(Number(queryCondition.searchContent));
        }
      } else {
        for (let i = 0; i < queryCondition.size; i++) {
          list.value.push(list.value.length + 1);
        }
      }
      // 加载状态结束
      loading.value = false;

      // 数据全部加载完成
      if (list.value.length >= totalNum || queryCondition.searchContent) {
        finished.value = true;
      } else {
        queryCondition.page++;
      }
    }, 1000);
  }

  const isRefreshing = ref(false);
  function onRefresh() {
    // 清空数据列表
    isRefreshing.value = true;
    queryCondition.page = 0;
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
  }

  return {
    searchContent,
    onSearch,
    list,
    loading,
    finished,
    onLoad,
    isRefreshing,
    onRefresh,
  };
}

export { useVanList };
```

下面是它在组件中的使用方式：

```vue
<template>
  <!-- 此处省略，与上面保持一致 -->
</template>
<script setup lang="ts">
import { useVanList } from "./composables/vanList";

const {
  searchContent,
  onSearch,
  list,
  loading,
  finished,
  onLoad,
  isRefreshing,
  onRefresh,
} = useVanList();
</script>
```

核心逻辑完全一致，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。和在组件中一样，你也可以在组合式函数中使用所有的[组合式 API](https://cn.vuejs.org/api/#composition-api)。现在，`useVanList()` 的功能已经存在一定的复用性了。目前在我日常维护的项目中，这样的 hook 使用的是比较多的。

### 进一步抽象

但该 hook 与分页的查询条件、分页查询的方法仍然存在耦合，如果查询接口不一致，还要增加新的 hook 。因此可以考虑进一步抽象，修改后的代码如下：

```typescript
// vanList.ts
import { Ref, isRef, ref, unref } from "vue";

function useVanList({
  page,
  total,
  searchContent,
  queryContent,
  beforeSearch,
}: {
  page: number | Ref<number>;
  total: number | Ref<number>;
  searchContent: string | Ref<string>;
  queryContent: Function;
  beforeSearch: Function;
}) {
  const list: Ref<number[]> = ref([]),
    loading = ref(false),
    finished = ref(false);

  async function onLoad() {
    if (isRefreshing.value) {
      // 如果是真实项目此处还应取消未完成的请求
      list.value = [];
      isRefreshing.value = false;
    }
    /**
     * 异步更新数据,
     * setTimeout 仅做示例，真实场景中一般为 ajax 请求,
     * 此处模拟真实的分页查询处理。
     * 搜索的逻辑不具体展开，只简单处理。
     **/
    const { clear, items } = await queryContent();
    if (clear) list.value.length = 0;
    list.value = [...list.value, ...items];
    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= unref(total)) {
      finished.value = true;
    } else {
      if (isRef(page)) {
        page.value = page.value + 1;
      } else {
        page++;
      }
    }
  }

  const isRefreshing = ref(false);
  function onRefresh() {
    // 清空数据列表
    isRefreshing.value = true;
    isRef(page) ? (page.value = 0) : (page = 0);
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
  }

  function onSearch() {
    beforeSearch();
    onRefresh();
  }

  return {
    searchContent,
    list,
    loading,
    finished,
    onLoad,
    isRefreshing,
    onRefresh,
    onSearch,
  };
}

export { useVanList };
```

```vue
<script setup lang="ts">
import { reactive, ref, toRefs, unref } from "vue";
import { useVanList } from "./composables/vanList";

const queryCondition = reactive({
    page: 0,
    size: 8,
    searchContent: "",
  }),
  searchContent = ref(""),
  total = ref(40),
  MAX_SIZE = 40,
  { page } = toRefs(queryCondition);

const { list, loading, finished, onLoad, isRefreshing, onRefresh, onSearch } =
  useVanList({
    page,
    total,
    searchContent,
    queryContent,
    beforeSearch,
  });

function queryContent() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        searchContent.value &&
        Number(searchContent.value) > 0 &&
        Number(searchContent.value) <= MAX_SIZE
      ) {
        const items = [Number(queryCondition.searchContent)];
        resolve({ clear: true, items });
      } else if (
        searchContent.value &&
        (Number(searchContent.value) <= 0 ||
          Number(searchContent.value) > MAX_SIZE)
      ) {
        resolve({ clear: true, items: [] });
      } else {
        const items = [];
        for (let i = 1; i < queryCondition.size + 1; i++) {
          items.push(list.value.length + i);
        }
        resolve({
          clear: false,
          items,
        });
      }
    }, 1000);
  });
}

function beforeSearch() {
  queryCondition.searchContent = unref(searchContent);
  // total 的赋值只是因为实现显示逻辑，真实业务不需要有此逻辑
  if (searchContent.value && Number(searchContent.value) <= MAX_SIZE) {
    total.value = 1;
  } else if (
    (searchContent.value && Number(searchContent.value) <= 0) ||
    Number(searchContent.value) > MAX_SIZE
  ) {
    total.value = 0;
  } else {
    total.value = MAX_SIZE;
  }
}
</script>
```

此版本更加通用，实际代码也会更少，因为这里我自己模拟了数据逻辑，实际的业务逻辑只要关心后端返回的总条数（total）即可。

## 与其它模式的比较

### 和 Mixin 的对比

不清晰的数据来源、命名空间冲突、隐式的跨 mixin 交流导致极大地增加了后期的维护成本，基于上述理由，不再推荐在 Vue 3 中继续使用 mixin。保留该功能只是为了项目迁移的需求和照顾熟悉它的用户。

### 和无渲染组件的对比

二者的关注重点不同，推荐在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件。

### 和工具函数的对比

重点在于有无涉及状态管理。使用 hooks 后，项目中仍可保留 uitls ，在开发中可以更好的聚焦重点。

## 约定与最佳实践

### 命名

组合式函数约定用驼峰命名法命名，并以“use”作为开头。

### 输入参数

在使用 hooks 时可能会允许一些输入参数，最好使用`isRef`、`unRef`这样的工具函数进行处理，降低调用者的心智负担。

### 返回值

约定组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性。

### 副作用

在组合式函数中的确可以执行副作用 (例如：添加 DOM 事件监听器或者请求数据)，确保及时(例如 `onMounted()`时)清理副作用。3

### 使用限制

组合式函数在 `<script setup>` 或 `setup()` 钩子中，应始终被**同步地**调用。在某些场景下，你也可以在像 `onMounted()` 这样的生命周期钩子中使用他们

## 写在最后

由于本人接触 hooks 这种编程范式为时尚短，对于 React Hooks 缺乏实际经验，因此存在一些思维缺陷难以避免。本文示例的几个版本，是在业务中实践后得出的思考，仁者见仁， 仅供参考。

## Demo 地址

1. [ivestszheng/van-list-demo: 通过 hooks 实现一个列表 demo (github.com)](https://github.com/ivestszheng/van-list-demo)

## 参考

1. [组合式函数 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/reusability/composables.html)
