---
title: Vue 2.x 组件通信方式，初学者也能看懂
date: 2022-02-24
---
# Vue 2.x 组件通信方式，初学者也能看懂

> Vue 2.x 中组件通信方式那么多，究竟应该如何选择？

## 组件通信方式

### 组件的关系

组件关系可归类为：

- 父子关系组件
- 非父子组件之间通信(兄弟组件、隔代关系组件)

### 父子组件通信

#### 案例

为了方便初学者理解，我们定义这样一个场景：

1. 父亲（Father）在外赚钱，增加家庭资产；父亲资产即家庭资产。
2. 孩子（Child）消费，减少家庭资产。
3. 母亲（Mother）调度家庭资产，作为父组件。
4. 父亲与孩子作为子组件。

具体代码如下：

```vue
// App.vue
<template>
  <div id="app">
    <mother />
  </div>
</template>

<script>
import Mother from './components/Mother.vue'

export default {
  name: 'App',
  components: {
    Mother
  },
};
</script>
```

```vue
// Mother.vue 父组件
<template>
  <div>
    <h1>家庭资产：{{ fatherMoney }}</h1>
    <father :fatherMoney="fatherMoney" @earnMoney="earnMoney" />
    <child :childMoney="childMoney" @getMoney="getMoney" />
  </div>
</template>

<script>
import Father from './Father.vue'
import Child from './Child.vue'

export default {
  name: 'Mother',
  components: {
    Father,
    Child
  },
  data() {
    return {
      fatherMoney: 3000,
      childMoney: 0
    }
  },
  methods: {
    earnMoney(money) {
      this.fatherMoney += money
    },
    getMoney(money) {
      this.fatherMoney -= money
      this.childMoney += money
    }
  }
}
</script>

```

```vue
// Father.vue 子组件
<template>
  <div>
    <h2>父亲资产：{{ fatherMoney }}</h2>
    <button @click="earnMoney">赚钱</button>
  </div>
</template>

<script>
export default {
  name: 'Father',
  props: {
    fatherMoney: Number
  },
  methods: {
    earnMoney() {
      this.$emit("earnMoney", 100)
    }
  }
}
</script>

```

```vue
// Child.vue 子组件
<template>
  <div>
    <h2>子女资产：{{ childMoney }}</h2>
    <button @click="getMoney">拿零花钱</button>
    <button @click="consumeSecretly">自己偷偷消费</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    childMoney: Number
  },
  methods: {
    getMoney() {
      this.$emit('getMoney', 50)
    },
    consumeSecretly() {
      this.childMoney -= 50
    }
  }
}
</script>

```

![props/emit 传值](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220220211020.gif)

#### props

父组件通过`props`的方式向子组件传递数据。

prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。而且 **prop 只读，在子组件内部不可被修改**。如果修改，修改无效且 Vue 会在浏览器的控制台中发出警告，如案例中图所示。

#### $emit / v-on

子组件通过`$emit` 向父组件通信。

子组件可以通过调用内建的 [`$emit`](https://cn.vuejs.org/v2/api/#vm-emit) 方法并传入事件名称来触发父组件中事件，父组件由`v-on`绑定的事件监听器接收该事件并执行相应的操作。

#### .sync 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

通过`.sync`修饰符，可以不需要在子组件内建`$emit`方法，只通过父组件`v-on`绑定事件监听器来实现子组件向父组件通信。

为了更好理解，我们修改代码如下：

```vue
// Father.vue 子组件
<button @click="$emit('update:fatherMoney', 1000)">买彩票</button> // 不要理会逻辑上的漏洞，反正按了钱就变成 1000
<button @click="$emit('update:fatherMoney', fatherMoney + 100)">
      赚钱
</button>
```

```vue
// Mother.vue 父组件
// 此处，@update:fatherMoney 绑定的箭头函数无论是否抽离到 methods，都不影响效果。
<father
  :fatherMoney="fatherMoney"
  @update:fatherMoney="
    (money) => {
      this.fatherMoney = money;
    }
  "
/>
```

点击买彩票按钮，会发现`fatherMoney`变为了1000；点击赚钱按钮，发现`fatherMoney`累加100。

再次修改代码如下，使用`.sync`语法糖，效果仍旧。

```vue
// Mother.vue 父组件
<father :fatherMoney.sync="fatherMoney" />
```

![.sync 修饰符](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220220232038.gif)

#### v-model

在`.sync`中提到真正的双向绑定会带来维护上的问题，理所当然，双向绑定同样可以实现父子组件通信。一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，我们修改代码如下：

```vue
// Father.vue 子组件
<template>
  <div>
    <h2>父亲资产：{{ value }}</h2>
    <button @click="$emit('input', 1000)">买彩票</button>
    <button @click="$emit('input', value + 100)">
      赚钱
    </button>
  </div>
</template>

<script>
export default {
  name: 'Father',
  props: {
    value: Number
  }
}
</script>
```

```vue
// Mother.vue 父组件
<father v-model="fatherMoney" />
```

代码仍旧可以实现同样的效果。这里我们拓展一下，根据对`v-model`的定义，不使用`v-model`，修改代码如下：

```vue
// Father.vue 子组件
<template>
  <div>
    <h2>父亲资产：{{ value }}</h2>
    <button @click="$emit('input', 100)">赚钱</button>
  </div>
</template>

<script>
export default {
  name: 'Father',
  props: {
    value: Number
  }
}
</script>
```

```vue
// Mother.vue 父组件
<template>
  <div>
    <h1>家庭资产：{{ fatherMoney }}</h1>
    <father :value="fatherMoney" @input="earnMoney" />
    <child :childMoney="childMoney" @getMoney="getMoney" />
  </div>
</template>

<script>
import Father from './Father.vue'
import Child from './Child.vue'

export default {
  name: 'Mother',
  components: {
    Father,
    Child
  },
  data() {
    return {
      fatherMoney: 3000,
      childMoney: 0
    }
  },
  methods: {
    earnMoney(money) {
      this.fatherMoney += money
    }
  }
}
</script>
```

点击赚钱按钮，家庭资产同样每次增加100。我们发现显式地利用名为 `value` 的 prop 和名为 `input` 的事件，达到了与`v-model`同样的效果。

#### ref

`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例。

因此可以通过`ref`拿到实例对象，进而拿到子组件中的数据和方法。

```vue
// Mother.vue 父组件
<template>
  <div>
    <father ref="father" />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Mother',
  components: {
    Father
  },
  mounted(){
    console.log(`拿到了father的私房钱：${this.$refs.father.caseDough}`)
  }
}
</script>
```

```vue
// Father.vue 子组件
<template>
  <div>
    <h2>父亲资产：{{ caseDough }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Father',
  data(){
    return {
      caseDough: 500
    }
  }
}
</script>
```

### 隔代组件通信

#### 案例

这里我们同样定义一个场景：

1. 爷爷（Grandpa）拥有资产
2. 父亲（Father）继承爷爷的资产
3. 孩子（Child）继承父亲的资产
4. 爷爷作为组件组件，父亲作为父组件，孩子作为子组件

具体代码如下：

```vue
// App.vue
<template>
  <div id="app">
    <grandpa />
  </div>
</template>

<script>
import Grandpa from './components/Grandpa.vue'

export default {
  name: 'App',
  components: {
    Grandpa
  },
};
</script>
```

```vue
// Grandpa.vue 祖先组件
<template>
  <div>
    <h1>爷爷的资产：{{ grandpaMoney }}</h1>
    <father
      :money="grandpaMoney"
      @spendMoney="
        (bill) => {
          grandpaMoney -= bill
        }
      "
    />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Grandpa',
  data() {
    return {
      grandpaMoney: 10000,
    }
  },
  components: {
    Father
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <h2>爸爸继承爷爷的资产: {{ money }}</h2>
    <child
      :money="money"
      @spendMoney="
        (bill) => {
          $emit('spendMoney', bill);
        }
      "
    />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  props: {
    money: Number
  },
  components: {
    Child
  }
}
</script>
```

```vue
// Child.vue 孙组件
<template>
  <div>
    <h2>子女继承爸爸的资产：{{ money }}</h2>
    <button @click="consume">孩子消费</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    money: Number
  },
  methods: {
    consume() {
      this.$emit('spendMoney', 100)
    }
  }
}
</script>
```

具体效果如下图：

![祖先组件通信](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220221100348.gif)

#### props

与父子组件通信思路相同，`props`将数据一级一级向下传递。案例中使用的就是`props`，父组件作为中间桥梁沟通祖先组件与孙组件。

#### $parent

`$parent`会获取父实例，如果当前实例有的话。我们修改代码如下：

```vue
// Child.vue 孙组件
<template>
  <div>
    <h2>子女继承爸爸的资产：{{ money }}</h2>
    <button @click="consume">子女消费100</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    money: Number
  },
  methods: {
    consume() {
      console.log(this.$parent)
      this.$parent.$emit('spendMoney',100)
    }
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <h2>爸爸继承爷爷的资产: {{ money }}</h2>
    <child
      :money="money"
      @spendMoney="
        (bill) => {
          $emit('spendMoney', bill);
        }
      "
    />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  props: {
    money: Number
  },
  components: {
    Child
  },
  data() {
    return {
      test: 123
    }
  }
}
</script>
```

![$parent](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220221103130.gif)

这里我们通过`$parent`可以触发在`v-on`绑定的事件。除此之外，`$parent`还能获得许多其他的参数，具体看下图。

![$parent](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220221103748.png)

可以看到，在`parent`实例中同样有一个`parent`参数。很自然会想到，能否通过调用`$parent.$parent`里的方法来实现不触发父组件中的事件来直接修改数据。于是，再次修改代码如下：

```vue
// Grandpa.vue 祖先组件
<template>
  <div>
    <h1>爷爷的资产：{{ grandpaMoney }}</h1>
    <father :money="grandpaMoney" />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Grandpa',
  data() {
    return {
      grandpaMoney: 10000,
    }
  },
  components: {
    Father
  },
  methods: {
    spendMoney(bill) {
      this.grandpaMoney -= bill
    }
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <h2>爸爸继承爷爷的资产: {{ money }}</h2>
    <child :money="money" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  props: {
    money: Number
  },
  components: {
    Child
  }
}
</script>
```

```vue
// Child.vue 孙组件
<template>
  <div>
    <h2>子女继承爸爸的资产：{{ money }}</h2>
    <button @click="consume">子女消费100</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    money: Number
  },
  methods: {
    consume() {
      this.$parent.$parent.spendMoney(100)
    }
  }
}
</script>
```

同样可以，也就是说可以通过`this.$parent.$partent...`这样的方法来一直向上调用指定层级中的方法来修改数据，当然这种方法已经不再局限于传值了。

如果层级过多的话，`this.$parent.$partent...`这种方式传值显得有些愚蠢。在 Vue 1.0 中我们可以使用`$dispatch/$broadcast`。

#### $children

`$children`获得的是当前实例的直接子组件（数组）。**需要注意 `$children` 并不保证顺序，也不是响应式的。**实际用法与`$parent`类似。

#### $dispatch / $broadcast (Vue 1.0)

`$dispatch`用来派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 `true`。附加参数都会传给监听器回调。

`$broadcast`用来广播事件，通知给当前实例的全部后代。因为后代有多个枝杈，事件将沿着各“路径”通知。每条路径上的通知在触发一个监听器后停止，除非它返回 `true`。

需要声明的是，**这两个方法在 Vue2.0 被弃用**。官方的解释是：“因为基于组件树结构的事件流方式实在是让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。这种事件方式确实不太好，我们也不希望在以后让开发者们太痛苦。并且 `$dispatch` 和 `$broadcast` 也没有解决兄弟组件间的通信问题。”

但在一些地方我们仍可以看到通过在原型链上拓展实现`广播/派发`。我们自己来封装`eventDispatch`和`eventBroadcast`，新建文件夹`src/extends`，在里面新建`event.js`和`index.js`。

```js
// event.js
export default function (Vue) {
  Vue.prototype.$eventDispatch = function (eventName, value) {
    // 在 Vue 组件内调用，this 指向 Vue 组件实例，因此可以获取的实例的 $parent
    let parent = this.$parent;

    // 沿着父链向上冒泡
    while (parent) {
      // 附加参数都会传给监听器回调。
      parent.$emit(eventName, value);
      parent = parent.$parent;
    }
  };
}
```

```js
// extends/index.js
import eventExtend from "./event";

export { eventExtend };
```

在`main.js`中引入并拿到 Vue 的构造函数

```js
// main.js
import Vue from 'vue';
import App from './App';
import { eventExtend } from './extends'

// 拿到 Vue 的构造函数
eventExtend(Vue);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
```

接着修改`Child.vue`、`Father.vue`以及`Grandpa.vue`

```vue
// Child.vue 孙组件
<template>
  <div>
    <h2>子女继承爸爸的资产：{{ money }}</h2>
    <button @click="consume">子女消费100</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    money: Number
  },
  methods: {
    consume() {
      this.$eventDispatch('spendMoney',100)
    }
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <h2>爸爸继承爷爷的资产: {{ money }}</h2>
    <child
      :money="money"
      @spendMoney="
        (bill) => {
          $emit('spendMoney', bill);
        }
      "
    />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  props: {
    money: Number
  },
  components: {
    Child
  }
}
</script>
```

```vue
// Grandpa.vue 祖先组件
<template>
  <div>
    <h1>爷爷的资产：{{ grandpaMoney }}</h1>
    <father :money="grandpaMoney" @spendMoney="spendMoney" />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Grandpa',
  data() {
    return {
      grandpaMoney: 10000,
    }
  },
  components: {
    Father
  },
  methods: {
    spendMoney(bill) {
      this.grandpaMoney -= bill
    }
  }
}
</script>
```

至此，实现了通过拓展原型链模拟`$dispatch`效果。接下来模拟`$broadcast`效果，修改代码如下：

```js
// event.js
export default function (Vue) {
  Vue.prototype.$eventDispatch = function (eventName, value) {
    // 在 Vue 组件内调用，this 指向 Vue 组件实例，因此可以获取的实例的 $parent
    let parent = this.$parent;

    // 沿着父链向上冒泡
    while (parent) {
      // 附加参数都会传给监听器回调。
      parent.$emit(eventName, value);
      parent = parent.$parent;
    }
  };

  Vue.prototype.$eventBroadcast = function (eventName, value) {
    const bc = (children) => {
      children.map(c => {
        c.$emit(eventName, value)
        if (c.$children) {
          bc(c.$children)
        }
      })
    }

    bc(this.$children)
  }
}
```

```vue
// Grandpa.vue 祖先组件
<template>
  <div>
    <h1>爷爷的资产：{{ grandpaMoney }}</h1>
    <father :money="grandpaMoney" @spendMoney="spendMoney" @notice="notice" />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Grandpa',
  data() {
    return {
      grandpaMoney: 10000,
    }
  },
  components: {
    Father
  },
  methods: {
    spendMoney(bill) {
      this.grandpaMoney -= bill
      this.$eventBroadcast('notice')
    },
    notice() {
      console.log('父亲用钱了');
    }
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <h2>爸爸继承爷爷的资产: {{ money }}</h2>
    <child
      :money="money"
      @spendMoney="
        (bill) => {
          $emit('spendMoney', bill);
        }
      "
      @notice="notice"
    />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  props: {
    money: Number
  },
  components: {
    Child
  },
  methods: {
    notice() {
      console.log('孩子用钱了')
    }
  }
}
</script>
```

```vue
// Child.vue 孙组件
<template>
  <div>
    <h2>子女继承爸爸的资产：{{ money }}</h2>
    <button @click="consume">子女消费100</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    money: Number
  },
  methods: {
    consume() {
      this.$eventDispatch('spendMoney',100)
    }
  }
}
</script>
```

实现效果如下图所示：

![$broadcast](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220221214429.gif)

#### $attrs / $listeners

`$attrs`包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件。

`$listeners`包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件。

同样为了方便理解，代码修改如下：

```vue
// Grandpa.vue 祖先组件
<template>
  <div>
    <father
      :name="name"
      :age="age"
      :hobby="hobby"
      :homeTown="homeTown"
      @notice="notice"
    />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  name: 'Grandpa',
  components: {
    Father
  },
  data() {
    return {
      name: '无声',
      age: 18,
      hobby: '下棋',
      homeTown: '温州'
    }
  },
  methods: {
    notice() {
      console.log('回家吃饭')
    }
  }
}
</script>
```

```vue
// Father.vue 父组件
<template>
  <div>
    <child v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'Father',
  components: {
    Child
  }
}
</script>
```

```vue
// Child.vue 孙组件
<template>
  <div>
    <h1>姓名：{{ this.$attrs.name }}</h1>
    <h1>年龄：{{ this.$attrs.age }}</h1>
    <h1>爱好：{{ this.$attrs.hobby }}</h1>
    <h1>家乡：{{ this.$attrs.homeTown }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Child',
  mounted() {
    this.$listeners.notice()
  }
}
</script>
```

效果如下图所示：

![$attrs/$listeners](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220221221411.png)

#### provide / inject

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。

```vue
// Grandpa.vue 祖先组件
<template>
  <div class="grandpa">
    <father />
  </div>
</template>

<script>
import Father from './Father.vue'

export default {
  provide() {
    return {
      grandpa: this
    }
  },
  name: 'Grandpa',
  components: {
    Father
  },
  data() {
    return {
      name: '无声',
      age: 18,
      hobby: '下棋',
      homeTown: '温州'
    }
  },
  methods: {
    notice() {
      console.log('回家吃饭')
    }
  }
}
</script>
```

```vue
// Child.vue 孙组件，Fahter.vue 不做额外修改。
<template>
  <div class="child"></div>
</template>

<script>
export default {
  inject: ['grandpa'],
  name: 'Child',
  mounted() {
    console.log(this.grandpa)
    console.log(this.grandpa.name);
  }
}
</script>
```

```
// 控制台输出
VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
无声
```

可以看到，通过`provide`和`inject`在 Child.vue 中拿到了 Grandpa.vue 注入的实例对象。

> 注意：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

### 兄弟组件通信

#### 案例

新建 Child.vue 同级文件 Child.vue2

```vue
// Father.vue 父组件
<template>
  <div class="father" ref="father">
    <child />
    <child2 />
  </div>
</template>

<script>
import Child from './Child.vue'
import Child2 from './Child2.vue'

export default {
  name: 'Father',
  components: {
    Child,
    Child2
  }
}
</script>
```

#### 父组件中转

既然能实现子向父、父向子传值，那么理所当然地会想通过父组件将数据进中转。例如，本案例中可以让 Child 先将数据传递给 Father，再由 Father 传递给 Child2。具体实现的方法很多，这里不再赘述，看不懂的同学回到上面再复习一下。

#### eventBus

`eventBus` 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

与之前实现`广播/派发`类似，我们在原型链上拓展一个`eventBus`方法，修改代码如下：

```js
// event.js
export default function (Vue) {
  // 通过在原型链上注册一个 Vue 实例，得到使用 Vue 方法的能力
  Vue.prototype.$eventBus = new Vue()
}
```

```vue
// Child.vue 孙组件
<template>
  <div class="child"></div>
</template>

<script>
export default {
  inject: ['grandpa'],
  name: 'Child',
  mounted() {
    this.$eventBus.$on('childTouch', param => {
      console.log(param)
    })
  }
}
</script>
```

```vue
// Child2.vue
<template>
   <div></div>
</template>

<script>
export default {
   name: 'Child2',
   mounted(){
     this.$eventBus.$emit('childTouch','Child2 来找你了')
   }
}
</script>
```

可以看到控制台输出结果如下：

```
Child2 来找你了
```

除此之外，通过`eventBus`我们还能实现父子组件及祖先组件通信，但是要确保`$on`要在`$emit`之前执行。

#### Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。Vuex 解决了`多个视图依赖于同一状态`和`来自不同视图的行为需要变更同一状态`的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上。

 Vuex 和后面提到的`localStorage`/ `sessionStorage`的传值可以涵盖父子、祖先、兄弟。Vuex 的官方文档中定义其是采用集中式存储来管理组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。我认为`localStorage`/ `sessionStorage`也是如此。

简单来说，日常开发中，所有的传值都可以通过 Vuex 解决，但只是用 Vuex 来做传值显得有些大材小用。此处不对 Vuex 做展开，一方面内容太多，另一方面我自己对于 Vuex 的也只是一知半解。

#### localStorage / sessionStorage

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。 `window.localStorage.getItem(key)`获取数据，`window.localStorage.setItem(key,value)`存储数据。

> 注意用`JSON.parse()` / `JSON.stringify()` 做数据格式转换 。`localStorage` / `sessionStorage`可以结合 Vuex, 实现数据的持久化，同时使用 Vuex 解决数据和状态混乱问题。

## 如何选择通信方式？

了解了那么多通信方式，回到开头的问题，到底要选择哪一种？

对于中大型单页应用开发者来说，Vuex  是自然而然的选择，可以更好地在组件外部管理状态。而在不使用 Vuex 的情况下，则见仁见智（确实没找到特别权威的排序），下面仅代表个人观点：

|                                   | 使用时选择优先级（仅代表个人观点）                           |
| --------------------------------- | ------------------------------------------------------------ |
| 父子组件通信                      | `props`/`$emit` > `.sync` > `v-model` > `ref`                |
| 隔代组件通信                      | `props`/`$emit` > `$parent` / `$children` > `provide` / `inject` > `$attrs` / `$listeners` |
| 兄弟组件通信                      | 父组件中转 > `eventBus`                                      |
| `localStorage` / `sessionStorage` | 优先考虑 Vuex，我基本只在需要持久化时才会用。                |

可以看到，相比之下，我倾向使用麻烦一些的方法，但传值时数据来源更显式，代码的可维护性更好。

## 参考资料

1. [Vue.js](https://cn.vuejs.org/)
2. [b站 - 小野森森 - Vue2.0『数据传递』全解析](https://www.bilibili.com/video/BV1sT4y1A7pf?p=1)
3. [掘金 - ikoala - vue中8种组件通信方式, 值得收藏!](https://juejin.cn/post/6844903887162310669#heading-1)
