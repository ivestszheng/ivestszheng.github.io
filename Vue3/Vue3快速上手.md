## 传值

它提供了与 Vue 2 相同的事件触发器 API。

在绝大多数情况下，不鼓励使用全局的事件总线在组件之间进行通信。虽然在短期内往往是最简单的解决方案，但从长期来看，它维护起来总是令人头疼。根据具体情况来看，有多种事件总线的替代方案：

- [Prop](https://v3.cn.vuejs.org/guide/component-basics.html#passing-data-to-child-components-with-props) 和[事件](https://v3.cn.vuejs.org/guide/component-basics.html#listening-to-child-components-events)应该是父子组件之间沟通的首选。兄弟节点可以通过它们的父节点通信。
- [Provide 和 inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html) 允许一个组件与它的插槽内容进行通信。这对于总是一起使用的紧密耦合的组件非常有用。
- `provide`/`inject` 也能够用于组件之间的远距离通信。它可以帮助避免“prop 逐级透传”，即 prop 需要通过许多层级的组件传递下去，但这些组件本身可能并不需要那些 prop。
- Prop 逐级透传也可以通过重构以使用插槽来避免。如果一个中间组件不需要某些 prop，那么表明它可能存在关注点分离的问题。在该类组件中使用 slot 可以允许父节点直接为它创建内容，因此 prop 可以被直接传递而不需要中间组件的参与。
- [全局状态管理](https://v3.cn.vuejs.org/guide/state-management.html)，比如 [Vuex](https://next.vuex.vuejs.org/zh/index.html)。