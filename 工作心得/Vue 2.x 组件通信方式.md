## 大纲

1.子组件$emit抛出 父组件响应
2.父组件v-model响应 子组件抛出input事件 接收value参数 可以通过model参数配置响应事件与接收参数
3.父组件xx.sync="xx"也是双向绑定 子组件$emit('update:xx')抛出
4.可以通过扩展函数在原型上绑定广播/派发这个是在1.0中有的，但是2.0去除了，原理就是通过$children $parent循环emit事件
5.重新创建一个实例实现eventBus事件总线 原理为在新的实例上通过$on $emit传递与响应
6.传递参数时可以用v-bind/$attrs传递  传递函数可以用v-on/$listeners
7.通过provide inject传递函数与参数
8.通过ref来获取组件实例，ref不能再template上使用，compute也不能用

不建议用$parent/$children 以及组件派发/广播，dispatch1.0是有得，2.0就没有了，因为这样结构不清晰